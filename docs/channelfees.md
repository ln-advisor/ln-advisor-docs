# Channel Fees

The Channel Fees screen is the current channel operations view. It exists to answer one question, what is the operator charging now, what is the channel doing now, and what should change next.

## What the screen shows

1. Active channels and peer identity.

2. Outbound fee policy on the operator side.

3. Inbound fee context from the remote side when available.

4. Local and remote liquidity split.

5. Recent forwarding and fee earnings.

6. Supporting peer fee context and network averages where available.

## Why this screen matters

Fee changes are simple to apply and hard to evaluate. A channel can be idle for structural reasons, not because the current fee is too high. A channel can also look healthy on volume but still lose opportunity because liquidity is parked on the wrong side. The fee view pulls these signals together before the operator changes policy.

## Data used by the screen

For a selected channel the current page builds a narrow working set.

1. Node info

2. The selected channel

3. Matching peer records

4. Forwarding history

5. Mission control pairs

6. Current fee policy

7. Peer fee averages when available

## Current local preparation flow

The page builds four layers before recommendation.

1. Raw telemetry

This is the direct node data needed for the selected channel.

2. Raw snapshot metadata

This is a local record of collection time, node alias, channel id, peer key, and the raw objects used for the run.

3. Normalized snapshot

The page passes the selected channel data through `normalizeSnapshot`. Even a one channel run uses the same normalization contract as wider product flows.

4. Privacy transformed payload

The page applies `applyPrivacyPolicy(normalizedSnapshot, 'feature_only')`. This creates the reduced payload used for review and verified runtime execution.

## What enters the normalized channel state

The normalized channel object carries the fields the scoring layer needs.

1. Channel id

2. Remote pubkey

3. Active flag

4. Capacity

5. Local balance and remote balance

6. Local balance ratio and remote balance ratio

7. Outbound fee ppm and inbound fee ppm

8. Forward counts

9. Revenue

10. Forwarding earning ppm

11. Failed forward count

12. Last activity timestamp

13. Peer centrality

14. Mission success and failure rates

15. Network average fee context when available

## What leaves the page on the private path

The preferred recommendation payload is the `feature_only` privacy transform.

That payload keeps the useful channel level signals and removes direct identifiers and raw balance amounts.

1. Channels become stable references such as `channel_0001`.

2. Peers become stable references such as `peer_0001`.

3. Liquidity is sent as ratios, not raw sat amounts.

4. Activity, revenue, and reliability signals are preserved.

5. Raw pubkeys are not sent in the transformed state.

## Current execution modes

### Standard mode

The current Channel Fees page still supports the generic `/api/recommend` path in standard mode. The page also prepares the reduced payload locally so the operator can inspect the intended private request structure.

### Verified runtime mode

In verified runtime mode the page sends the reduced payload to the verified service path and then receives recommendation, attestation, and verification material.

## Recommendation output

The current scoring output can produce three recommendation families. For the fee screen the relevant one is `feeRecommendations`.

Each fee recommendation includes:

1. `action`

2. `currentFeePpm`

3. `suggestedFeePpm`

4. `confidence`

5. signal bands for activity, liquidity, reliability, centrality, and revenue

6. human readable reasons

## Why the design matters

The fee screen needs local detail, but the external scoring path does not need the full local record. The product therefore separates screen level observability from recommendation payload design. That separation is the practical core of the private pipeline in LN Advisor.
