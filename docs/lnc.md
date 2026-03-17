# LNC

LNC means Lightning Node Connect. In LN Advisor it is the session layer between the browser application and the operator node.

## What LNC does in this project

1. It gives the application a live authenticated session to the node.

2. It lets the frontend call LND RPC methods through the active session.

3. It avoids a separate node specific backend just to read the operator state.

4. It keeps the node as the primary data source for the product.

## Connection flow in the app

The connection screen supports two states.

1. First connection. The user enters an LNC pairing phrase and a password.

2. Returning session. The user enters only the password for the saved session.

The current connect screen labels this flow clearly and presents it as `Connect Your Node` on first use and `Login` for a saved pairing.

## Data read through LNC

LN Advisor reads several classes of data through the active LNC session.

1. `getInfo`

This provides node identity and basic node state.

2. `listChannels`

This provides the active channel inventory for the operator.

3. `listPeers`

This provides the current peer set.

4. `describeGraph`

This provides the public network graph snapshot used by graph views and opening analysis.

5. `forwardingHistory`

This provides forwarding events used for routing performance and fee context.

6. `queryMissionControl`

This provides routing reliability signals used for peer evaluation.

7. `getNodeMetrics`

This provides node metric sets, including betweenness centrality when available.

## Why LNC matters here

1. It keeps the source of truth close to the operator node.

2. It supports live reads instead of stale exports.

3. It reduces integration friction for a Lightning operator already running LND.

4. It makes it practical to separate local node reads from later private recommendation payloads.

## LNC and privacy

LNC gives LN Advisor access to raw node data. That is useful, but it creates a clear obligation.

1. Raw node data should be read locally when the screen needs it.

2. Recommendation routes should not send raw telemetry when a reduced structure is enough.

3. The application should make the request boundary visible to the operator.

This is why LNC sits at the start of the private pipeline. It is the trusted ingress point for the current product.
