# Props

Props means protected pipelines. In LN Advisor the term describes an authenticated and privacy preserving path from node telemetry to recommendation output.

## The core idea

A useful recommendation needs real operator data. A responsible system should not move more of that data than the scoring task requires. Props is the discipline that holds those two facts together.

## Why the idea matters for Lightning

Lightning node telemetry is not just public graph data.

1. It includes forwarding history.

2. It includes mission control state.

3. It includes fee policy.

4. It includes local and remote balance structure.

5. It reflects an operator strategy and business posture.

That information is valuable, but it is also sensitive. Props gives the product a way to work with the data without treating raw export as the default.

## How LN Advisor applies props

LN Advisor applies the props idea in an operational form.

1. The source is the operator node reached through LNC.

2. Raw data is normalized into a stable schema.

3. The normalized state is privacy transformed before recommendation routes send data.

4. The scoring model runs on the transformed state.

5. The output can carry provenance and verification material.

## What props means in this codebase

In the current codebase props is implemented through several pieces.

1. `normalizeSnapshot`

This produces a stable `normalized-node-state-v1` object from raw Lightning data.

2. `applyPrivacyPolicy`

This produces `privacy-node-state-v1` payloads in `full_internal`, `feature_only`, or `banded` mode.

3. `scoreNodeState`

This scores the privacy transformed state and returns `recommendation-set-v1`.

4. provenance and ARB material

This binds the recommendation to a source record, a privacy policy id, and optional attestation evidence.

## Privacy in props

Privacy here does not mean the model sees nothing. It means the model sees the reduced form that matches the scoring job.

1. References replace direct identifiers.

2. Ratios replace some raw quantities.

3. Aggregates replace raw event streams.

4. Optional banding can reduce detail further.

## Integrity in props

A recommendation is better when the system can say what input was used and what environment was expected to produce the result.

LN Advisor supports this through:

1. source provenance receipts

2. pinned model manifests

3. ARB signing

4. optional verified runtime evidence

## Current product interpretation

Props is most important today on the recommendation routes.

1. Channel Fees uses it to reduce the selected channel payload.

2. Opening Recommendations uses it to reduce the graph based candidate payload.

3. Node Analysis remains the direct operator view and is not the main props path.

## Why keep this language in the docs

The homepage can describe the product in simpler terms. The docs should keep the full concept because it explains the actual system design, the privacy boundary, and the provenance model.
