# Product

LN Advisor is an operator tool for Lightning nodes. The current product centers on node telemetry, channel economics, candidate peer selection, and controlled recommendation inputs.

## Why the product exists

1. Fee policy is easy to change and hard to evaluate. Operators need current fee posture, recent routing activity, peer context, and a recommendation path in one place.

2. New channel selection is expensive. Operators need a ranked view of likely useful peers before they commit liquidity.

3. Node telemetry includes sensitive routing history and internal balance state. Raw export is usually broader than the scoring task requires.

4. Recommendation output should be tied to a clear input path. Operators should be able to inspect what was prepared and what was sent.

## Current product surface

### Channel Fees

This screen focuses on existing channels. It shows the current outbound fee, peer inbound fee, liquidity split, routing activity, fee earnings, and supporting peer context. The operator can inspect a selected channel and run a recommendation flow.

### Opening Recommendations

This screen focuses on candidate peers for new channels. It combines full graph data, existing channels, mission control signals, and centrality to build a ranked opening set.

### Node Analysis

This screen is the live operator view. It reads graph, forwarding, mission control, and node metrics directly from the node and shows the current network position and routing performance.

## Operating model

1. LNC provides the live session to the node.

2. The app fetches raw node data through LND RPC methods exposed through that session.

3. Raw data is normalized into a stable internal schema.

4. Recommendation routes use a privacy transform before scoring.

5. The operator can review the outgoing request plan.

6. The result can carry provenance and verification material when that mode is enabled.

## Product boundaries

1. LN Advisor is not a custodial system.

2. LN Advisor does not mutate node state as part of analysis.

3. Node Analysis is a read focused operator view.

4. The private pipeline is used for recommendation routes, not for every screen.

## Current recommendation families

1. Fee recommendations for current channels.

2. Forward opportunity ranking from current channel state.

3. Channel opening recommendations from graph and reliability signals.

All three families are produced by the current `recommendation-set-v1` model output.
