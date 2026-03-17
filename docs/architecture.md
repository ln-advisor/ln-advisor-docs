# Architecture

LN Advisor has a clear internal pipeline. Raw node data enters through LNC, moves through normalization, can be privacy transformed for recommendation routes, is scored by a pinned model contract, and can be wrapped with provenance and verification material.

## Internal schemas

### Raw snapshot

The raw Lightning snapshot is the direct collected node state. It is the closest object to the original RPC results.

### `normalized-node-state-v1`

This is the stable internal schema. It contains:

1. node identity

2. collection timestamp

3. normalized channels

4. peer aggregates

5. potential peers

6. totals

Normalization is important because raw LND responses are route specific and screen specific. The normalized state creates one contract for later steps.

### `privacy-node-state-v1`

This is the privacy transformed schema. It supports `full_internal`, `feature_only`, and `banded`.

### `recommendation-set-v1`

This is the scoring output. It contains:

1. fee recommendations

2. forward opportunity ranking

3. channel opening recommendations

### `source-provenance-receipt-v1`

This records:

1. raw snapshot hash

2. normalized snapshot hash

3. privacy transformed snapshot hash when present

4. graph snapshot reference when present

5. execution context

### `pinned-model-manifest-v1`

This defines the expected model and runtime contract.

## Normalization details

The normalizer creates channel level, peer level, and potential peer level records.

### Channel records

Each normalized channel includes:

1. fee state

2. liquidity state

3. forwarding counts

4. revenue

5. failed forwards

6. last activity

7. peer centrality

8. mission control reliability

9. optional network fee context

### Peer aggregates

Each peer aggregate rolls up:

1. channel counts

2. active channel counts

3. capacity and balance totals

4. average balance ratios

5. average outbound fee

6. total forwards

7. total revenue

8. total failed forwards

9. average peer centrality

10. mission reliability

### Potential peers

Each potential peer records:

1. pubkey

2. alias

3. capacity

4. channel count

5. centrality

6. mission reliability

7. last activity

## Privacy transform details

The privacy layer maps the normalized state into a scoring state.

### Reference mapping

Peer pubkeys and channel ids are mapped to stable references such as `peer_0001` and `channel_0001`.

### Ratios and aggregates

Raw balance values can become ratios. Peer and node context is preserved through aggregates instead of raw event streams.

### Banding

The `banded` mode compresses values into broad categories such as liquidity band, channel performance band, fee competitiveness band, mission reliability band, and centrality band.

## Scoring details

The current pinned model id is `ln-advisor-fee-forward`.

The current model version is `fee-forward-v1`.

The model can emit:

1. `feeRecommendations`

2. `forwardOpportunityRanking`

3. `channelOpeningRecommendations`

The scoring logic uses:

1. fee percentiles

2. centrality percentiles

3. revenue percentiles

4. recent activity bands

5. liquidity balance bands

6. mission reliability bands

7. failed forward pressure

8. simple deterministic adjustment rules for suggested fees

## Pinned model details

The manifest records:

1. model id

2. model version

3. pinning mode

4. required source schema

5. preprocessing ids

6. postprocessing type

7. runtime class

8. environment id

There are two main pinning modes in the code.

1. `exact_manifest_pinned`

2. `service_pinned_private_model`

## Provenance details

`generateSourceProvenanceReceipt` hashes the major pipeline stages and binds them into one receipt.

The receipt includes an execution context with:

1. execution mode

2. enclave provider id

3. attestation hash

4. model manifest hash

5. model pinning mode

6. source verification source and hash when present

## Enclave boundary pipeline

The enclave boundary pipeline has four ordered modules.

1. `normalize_snapshot`

2. `privacy_transform`

3. `score_node_state`

4. `arb_signer`

The run summary records hashes and module ids for each stage.

## Verified runtime path

The verified runtime client can call:

1. `/health`

2. `/info`

3. `/attestation`

4. `/api/recommend`

5. `/api/verify`

This path is used to gather recommendation output and then verify the live runtime evidence attached to it.

## Practical design summary

The architecture separates five concerns cleanly.

1. data collection

2. data normalization

3. privacy reduction

4. scoring

5. provenance and verification

That separation is the main reason the product is understandable and extensible.
