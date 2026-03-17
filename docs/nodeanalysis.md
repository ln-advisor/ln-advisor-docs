# Node Analysis

Node Analysis is the live operator view. It is the screen for graph inspection, forwarding review, mission control inspection, and node metric analysis.

## Primary role

This screen exists to show the current state of the operator node in context.

1. network position

2. graph shape

3. forwarding activity

4. mission control depth and reliability

5. centrality and related node metrics

## Data sources

The page reads directly from the node through LNC.

1. `describeGraph`

2. `forwardingHistory`

3. `queryMissionControl`

4. `getNodeMetrics`

5. `getInfo`

6. `listChannels`

7. `listPeers`

## Product position for this page

The page header describes Node Analysis as a live read only analysis surface. It presents graph and routing state from the node itself. This is the correct way to think about the screen.

## What the operator can inspect

1. Graph size, nodes, edges, and capacity

2. Forwarding totals, fee earned, and volume

3. Top forwarding rows

4. Mission control pair history

5. Node metric values such as betweenness centrality

6. Graph tables and focused node inspection

## Why this page is different

The recommendation pages exist to prepare and send a reduced scoring payload. Node Analysis exists to let the operator read the node and network directly. It is closer to observability than to scoring.

## Private and public inputs on this page

The page explicitly distinguishes between public and private data classes.

1. Public sources include `describeGraph` and `getNodeMetrics`.

2. Private sources include `forwardingHistory` and `queryMissionControl`.

This distinction matters because it shows which parts of the operator view are public network facts and which parts come from local routing history.

## Why this page matters

A recommendation is stronger when the operator can compare it with direct evidence. Node Analysis is that evidence layer.

1. It gives context before the operator changes a fee.

2. It gives graph evidence before the operator opens a new channel.

3. It exposes the health and depth of mission control before a reliability score is trusted.

4. It gives the operator a direct view of forwarding performance without passing through a model first.
