# Private Pipeline

The private pipeline is LN Advisor's protected pipeline for recommendation routes. It is the path from live node telemetry to recommendation output. The design follows the same structure described in the props paper, privacy over sensitive source data, integrity over the resulting inference, and a verifiable execution path between the two.

## Definition

The paper defines props as a protected pipeline from sensitive data sources to machine learning use. It enforces two properties.

1. Privacy

Only the data needed for the task should cross the boundary.

2. Integrity

The consumer of the result should be able to verify what source data entered the pipeline and what execution path produced the result.

LN Advisor applies this model to Lightning node telemetry.

## Source data in LN Advisor

The paper discusses deep web sources behind authenticated sessions. LN Advisor uses the same pattern with a different source. The source is the operator node reached through LNC.

The source includes:

1. channel state

2. fee policy

3. forwarding history

4. mission control

5. peer state

6. graph state

7. centrality metrics

This data is sensitive. It reveals routing quality, liquidity posture, peer relationships, and current fee policy.

## Current scope

1. Channel Fees uses this path for recommendation review and verified runtime execution.

2. Opening Recommendations uses this path for standard and verified recommendation runs.

3. Node Analysis is separate because it is the direct operator view.

## Why the pipeline exists

The paper makes three points that apply directly here.

1. Sensitive data should not move in raw form if a reduced representation is enough for inference.

2. Inference is stronger when the result is tied to authentic source data and a known execution path.

3. Constrained inputs reduce room for adversarial or malformed input.

This is the reason LN Advisor does not treat raw telemetry export as the default recommendation input.

## Current use in LN Advisor

The current product uses the protected pipeline for inference, not training.

The operator node is the source.

The recommendation engine is the consumer.

The result is used in:

1. fee recommendations

2. forward opportunity ranking

3. channel opening recommendations

## Stages

### Stage 1

Raw node data is collected through LNC.

### Stage 2

The app builds a normalized state through `normalizeSnapshot`.

### Stage 3

The app applies `applyPrivacyPolicy`.

### Stage 4

The operator can review the outgoing request plan.

### Stage 5

The product sends the reduced payload to a scoring route.

### Stage 6

The product receives the recommendation set and, when available, provenance and verification material.

## Security properties

### Privacy

Privacy here means the scoring route receives the reduced form of node state instead of the full collected objects.

The operator still gets the full local screen context. The request boundary uses a narrower scoring state.

### Integrity

Integrity here means the recommendation can be tied to:

1. a collected source state

2. a normalization step

3. a privacy transform

4. a model contract

5. optional attestation and verification evidence

This matches the paper's split between privacy of the input path and integrity of the inference path.

## Privacy modes

The privacy module supports three modes.

### `full_internal`

This wraps the full normalized state. It is useful for internal work and controlled environments. It is not the preferred network payload for the current product.

### `feature_only`

This is the main working mode. It preserves the features needed for scoring and removes direct identifiers and raw balances where they are not necessary.

### `banded`

This maps values into coarse bands such as `LOW`, `MEDIUM`, and `HIGH`. It reduces detail further when the task only needs category level signals.

## What `feature_only` keeps

1. channel references

2. peer references

3. activity counts

4. revenue

5. liquidity ratios

6. fee values and fee context

7. mission reliability signals

8. centrality signals

9. potential peer aggregates

10. node totals

## What `feature_only` removes

1. raw pubkeys in the transformed state

2. raw sat balances where ratios are enough

3. full graph objects

4. raw forwarding event detail

5. local objects that are not needed for scoring

## Secure data sourcing

The paper identifies secure data sourcing as the first building block. In LN Advisor this begins with the authenticated LNC session.

That gives the product:

1. a live authenticated source

2. direct collection of current node state

3. a collection timestamp

4. a stable path into normalization and provenance

In the broader props model, secure data sourcing may rely on privacy preserving oracles, TEEs, or cryptographic proofs over TLS sourced data. LN Advisor uses the same logic at the application level, authenticate the source, bind the collected state to the pipeline, and avoid arbitrary hand assembled scoring payloads.

## Pinned models

The paper identifies pinned models as the second building block. LN Advisor implements this through the pinned model manifest and the scoring contract.

The current manifest records:

1. model id

2. model version

3. pinning mode

4. preprocessing ids

5. postprocessing type

6. runtime class

7. environment id

This matters because the output alone is not enough. The consumer needs to know what execution path was expected to produce the result.

## Provenance and verification

The paper's inference case requires proof that a result came from a particular model applied to authentic source data. LN Advisor implements the same idea in product form.

The pipeline can bind output to:

1. raw snapshot hash

2. normalized snapshot hash

3. privacy transformed snapshot hash

4. model manifest hash

5. privacy policy id

6. attestation material

7. source provenance receipt

This is the basis for verification on recommendation routes.

## Local mode and verified runtime mode

The pipeline has two execution paths in the UI.

### Local

The reduced payload is sent to the local API route. This is the local inference path.

### Verified Runtime (TEE)

The reduced payload is sent to the verified service. The response may include runtime evidence and verification output.

In both cases the input preparation path is the same:

1. collect through LNC

2. normalize

3. privacy transform

4. review request

Only the execution environment changes.

## Constraining adversarial inputs

The paper treats authenticated pipelines as a way to constrain adversarial inputs. The same idea applies here.

If recommendation routes accept arbitrary hand built payloads, then:

1. fake channel state can be injected

2. fake mission control signals can be injected

3. fake graph derived features can be injected

4. scoring can be driven by malformed or synthetic input

The protected pipeline reduces this risk by making recommendation input a product controlled transformation of live collected state.

## Data minimization

The paper also describes filtering and partial disclosure. LN Advisor follows the same rule.

1. the UI reads full data locally when it needs to render operator views

2. the request path sends reduced state for recommendation

3. the transformed payload keeps utility focused features instead of raw exports

This is a data minimization rule at the system boundary.

## What this means in the current product

1. Channel Fees gets channel level recommendation input without exporting the entire node view.

2. Opening Recommendations gets graph and peer ranking input without exposing raw node identifiers in the transformed state.

3. Node Analysis remains the direct operator view and is not forced through the recommendation boundary.

4. The operator can inspect the outgoing request before it is sent.

5. Verified runtime mode can add attestation and verification on top of the same reduced input path.

## Relation to the paper

The paper is broader than LN Advisor. It covers deep web access for ML training and inference. LN Advisor is a narrower applied case.

The shared structure is:

1. authenticated source data

2. privacy preserving transformation before use

3. inference over reduced sensitive input

4. provenance over the result

5. optional TEE based execution and verification

LN Advisor uses that structure for Lightning node operations.

## Operator review

LN Advisor exposes the request boundary to the operator.

1. The app prepares the reduced payload locally.

2. The app can show the outgoing request plan.

3. The operator can review the payload before a verified runtime request is sent.

This review step makes the privacy boundary visible.
