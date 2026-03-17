# Openings

Opening Recommendations ranks candidate peers for new channels. The screen answers a different question from the fee page. It is not about current policy on current channels. It is about where new connectivity is likely to help next.

## What the screen uses

The openings screen requires a wider network view than the fee screen.

1. Node info

2. Existing channels

3. Peers

4. Full graph nodes

5. Full graph edges

6. Mission control pairs

7. Betweenness centrality metrics

## Why these inputs matter

1. Existing channels define what the operator already has.

2. Graph structure defines what the operator could reach.

3. Mission control adds recent routing reliability that raw graph structure cannot provide.

4. Centrality helps find nodes that sit in useful network positions.

## Current local preparation flow

The openings page runs a direct and explicit path.

1. It collects graph, channel, peer, mission control, and metric data.

2. It calls `normalizeSnapshot` on the full set.

3. It calls `applyPrivacyPolicy(normalizedSnapshot, 'feature_only')`.

4. It stores the normalized state and privacy transformed payload for request review.

5. It sends the reduced payload to `/api/recommend/channel-openings` in standard mode.

6. It can send the same reduced payload to the verified runtime path when that mode is enabled.

## What normalization adds for openings

Normalization builds a `potentialPeers` list. Each potential peer carries:

1. Peer pubkey

2. Alias

3. Capacity

4. Channel count

5. Betweenness centrality

6. Mission success rate

7. Mission failure rate

8. Last activity timestamp

Potential peers exclude the current node and peers that already have a channel with the operator.

## What the private payload keeps

The `feature_only` transform keeps enough structure for ranking while removing raw identifiers.

1. Existing channels are represented by references and ratios.

2. Peer aggregates preserve activity, revenue, reliability, and centrality.

3. Potential peers preserve capacity, channel count, centrality, and mission signals through anonymized peer references.

4. Node totals preserve broad operating context.

## Recommendation output

Opening output is emitted as `channelOpeningRecommendations`.

Each item carries:

1. `peerRef`

2. `score`

3. `confidence`

4. signal bands for centrality, reliability, and capacity

5. a reason set

The UI maps the anonymized result back into the local normalized snapshot so the operator can see useful labels and context on screen.

## Verified runtime path

When verified runtime mode is enabled the openings screen can run the same reduced payload through the verified service. The page then displays:

1. verification status

2. signer identity summary

3. signer provider type

4. runtime quote verification status

5. measurement policy status

6. live verification policy status

## Why openings use the private pipeline

Opening analysis needs broad graph context and internal routing signals. That is useful for ranking, but it does not justify sending raw node identifiers and raw balances when references, ratios, and aggregates are enough. The opening screen is therefore the clearest example of the product goal, keep ranking power, reduce disclosure.
