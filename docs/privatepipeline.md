# Private Pipeline

The private pipeline is the recommendation path used by LN Advisor when a screen needs to send data for scoring. Its job is simple, prepare a useful scoring payload without exporting the full raw node view.

## Current scope

1. Channel Fees uses this path for recommendation review and verified runtime execution.

2. Opening Recommendations uses this path for standard and verified recommendation runs.

3. Node Analysis is documented separately because its primary role is direct node inspection.

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

## Privacy modes

The privacy module supports three modes.

### `full_internal`

This wraps the full normalized state. It is useful for internal work, testing, and controlled environments. It is not the preferred network payload for the current product.

### `feature_only`

This is the main working mode. It preserves the features needed for scoring and removes direct identifiers and raw balances where they are not necessary.

### `banded`

This maps values into coarse bands such as `LOW`, `MEDIUM`, and `HIGH`. It reduces detail further and is useful when only broad category level signals are required.

## What `feature_only` keeps

1. Channel references and peer references

2. Activity counts

3. Revenue

4. Liquidity ratios

5. Fee values and fee context

6. Mission reliability signals

7. Centrality signals

8. Potential peer aggregates

9. Node totals

## What `feature_only` removes

1. Raw pubkeys in the transformed state

2. Raw sat balances where ratios are enough

3. Full graph objects

4. Raw forwarding event detail

5. Unrelated local node objects that are not part of the scoring input

## Why this matters

A recommendation model usually needs structure, not every original field. The private pipeline formalizes that distinction. It keeps the minimum useful state close to the scoring boundary and leaves the rest in the local operator context.

## Operator review

LN Advisor exposes the request boundary to the operator.

1. The app prepares the reduced payload locally.

2. The app can show the outgoing request plan.

3. The operator can review the payload before a verified runtime request is sent.

This review step is important. It makes the privacy boundary visible.
