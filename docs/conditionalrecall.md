# Conditional Recall

> **Note**: This page outlines a proposed implementation plan for the HTLC Traffic Analyzer (Conditional Recall). This is an upcoming feature that still needs to be fully implemented and tested.

## Implementation Plan - HTLC Traffic Analyzer (Conditional Recall)

This plan details the implementation of the `htlcTrafficAnalyzer.ts` service. As requested, the service will process real-time HTLC events alongside a 2-week lookback of forwardings into an ephemeral execution context, distilling this raw data into aggregated fee suggestions. Critically, it adheres to the Conditional Recall (CR) principles by dropping all raw identifiers and sensitive routing paths after the output is generated.

### User Review Required

**IMPORTANT**

*   Is `htlcTrafficAnalyzer` is intended to run constantly on the Node server daemon until the time of run defined by the user expires.
*   This service will not use LNC, we will use a WebSocket connection to the `/v2/router/htlcevents` endpoint to stream real-time HTLC events.
*   The `routerrpc` macaroon is required for this service.
*   Information at https://lightning.engineering/api-docs/api/lnd/router/subscribe-htlc-events/

## Proposed Changes

### CR Service

**[NEW]** `htlcTrafficAnalyzer.ts`

This file will contain the `HtlcTrafficAnalyzer` class with the following core responsibilities:

#### State Management (The Ephemeral Context)

*   Maintains a `Map<string, ChannelTrafficStats>` where the key is the `chanId`.
*   `ChannelTrafficStats` tracks: `attempts`, `succeeds`, `totalAmtSat`, `failedAmtSat`, `windowStart`, and `windowEnd`.
*   No HTLC hashes, no specific timestamps, and no raw node pubkeys are stored beyond immediate increment operations.

#### Data Ingestion

*   **Past 2 Weeks History**: On initialization, requests `forwardingHistory({ start_time: now - 14 days })`. It iterates these events, incrementing `succeeds` and volume for the respective `chanIdIn` and `chanIdOut`.
*   **Live HTLC Stream**: Fetches data using the `SubscribeHtlcEvents` WebSocket streaming endpoint, creating a uni-directional stream from the LND server. We will establish a WebSocket connection to `/v2/router/htlcevents`, passing the `routerrpc` macaroon in the headers to receive `HtlcEvent` notifications.
    *   On `FORWARD` event: Increments `attempts`.
    *   On `SETTLE` event: Increments `succeeds`.
    *   On `FORWARD_FAIL` or `LINK_FAIL`: Increments failures and records friction context. For each failed HTLC, the system will calculate the appropriate PPM (parts per million) fee rate to help define the fee adjustment suggestion.

    **Example WebSocket Connection:**
    ```javascript
    const WebSocket = require('ws');

    let ws = new WebSocket(`wss://${REST_HOST}/v2/router/htlcevents?method=GET`, {
      rejectUnauthorized: false, // For self-signed certificates
      headers: {
        'Grpc-Metadata-Macaroon': macaroonHex,
      },
    });

    ws.on('message', function(body) {
        // Handle incoming HtlcEvent
        console.log(body);
    });
    ```

#### Conditional Recall (The "Forget" mechanism)

*   Exposes a `flushAndAnalyze()` method.
*   When called, it halts the HTLC subscription and calculates aggregated outputs (e.g., identifying "high friction" channels where `attempts >> succeeds`).
*   Generates an array of `FeeAdjustmentSuggestion`: `{ channelRef, action: 'raise' | 'lower', frictionScore, reasons }`.
*   **Purges all state**: Immediately clears the in-memory map references before returning the suggestions, guaranteeing that the context of "what" was analyzed is permanently forgotten after yielding the result.

### Backend API Integration

**[MODIFY]** `server.ts`

*   Add a new endpoint `POST /api/cr/analyze-traffic` to instantiate the `HtlcTrafficAnalyzer`.
*   The endpoint will let the analyzer ingest the 14-day history, listen to the event stream for a defined collection window (or just instantly process the history + whatever is in the mempool if requested synchronously).
*   Upon completion, calls `flushAndAnalyze()`, returns the purely aggregated fee suggestions to the frontend, and destroys the analyzer instance.


