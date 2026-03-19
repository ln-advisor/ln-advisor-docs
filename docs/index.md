# Install and Run

LN Advisor is a Lightning node operations product. It connects to an LND node through LNC, reads live node data, prepares recommendation inputs through a private pipeline, and returns fee and opening guidance.

## Repository

Clone the application repository:

```bash
git clone https://github.com/ln-advisor/ln-advisor-ui
cd ln-advisor-ui
```

Repository:

<https://github.com/ln-advisor/ln-advisor-ui>

## Requirements

You need:

1. Git

2. Node.js

3. npm

4. pnpm

The repository uses `pnpm-lock.yaml`, so `pnpm` is the correct package manager for normal setup.

Install pnpm if needed:

```bash
npm install -g pnpm
```

## Install dependencies

From the repository root:

```bash
pnpm install
```

## Create the environment file

Create `.env` from the example:

```bash
cp .env.example .env
```

## Minimum `.env` values

For local use, start with:

```txt
VITE_API_BASE_URL=http://127.0.0.1:8787
VITE_ENABLE_PHALA_VERIFIED_UI=true
VITE_ENABLE_MOCK_LIGHTNING_UI=false
API_PORT=8787
```

## What each value does

### `VITE_API_BASE_URL`

This is the local API used by the standard local recommendation path.

### `VITE_ENABLE_PHALA_VERIFIED_UI`

This enables the verified runtime controls in `Channel Fees` and `Opening Recommendations`.

### `VITE_ENABLE_MOCK_LIGHTNING_UI`

Leave this as `false` for a real node session.

Set it to `true` only if you want to open the UI without connecting to a node.

### `API_PORT`

This is the port used by the local API server.

## Start the frontend

Run:

```bash
pnpm dev --host
```

Open:

```text
http://localhost:5173
```

## Start the local recommendation engine

If you want the local recommendation path, start the API server in a second terminal:

```bash
cd ln-advisor-ui
pnpm api
```

This is the local scoring path used by the `Local` toggle in the UI.

## Connect your node

When the app opens:

1. paste the LNC pairing phrase

2. enter the password

3. click `Connect & Save Session`

On later sessions:

1. enter the password

2. click `Login`

## How to use the app

### Channel Fees

1. connect the node

2. open `Channel Fees`

3. select a channel

4. inspect outbound fee, inbound fee, liquidity, and fee earnings

5. choose `Local` or `Verified Runtime (TEE)`

6. run the recommendation flow

### Opening Recommendations

1. open `Opening Recommendations`

2. click `Sync Graph Data`

3. choose `Local` or `Verified Runtime (TEE)`

4. run the recommendation flow

5. inspect the ranked candidate peers

### Node Analysis

1. open `Node Analysis`

2. click `Fetch Data`

3. inspect graph state, forwarding history, mission control, and centrality

## Local mode

Local mode uses the local API server you started with:

```bash
pnpm api
```

In the UI this appears as the `Local` toggle on:

1. `Channel Fees`

2. `Opening Recommendations`

The local path is useful for development, local testing, and direct recommendation runs.

## Verified runtime mode

Verified runtime mode is the Phala TEE backed path.

In the UI this appears as:

`Verified Runtime (TEE)`

It is available on:

1. `Channel Fees`

2. `Opening Recommendations`

## How to switch between local and verified

### On Channel Fees

1. open the selected channel detail

2. use the mode switch

3. choose `Local` or `Verified Runtime (TEE)`

4. if verified mode is selected for the first time, click `Review Request`

5. inspect the request body

6. send the request

### On Opening Recommendations

1. load graph data

2. use the mode switch

3. choose `Local` or `Verified Runtime (TEE)`

4. in verified mode, click `Review Request`

5. inspect the request

6. send the request

## Use your own verified service

The frontend supports a custom verified runtime endpoint.

Add this to `.env` if you want to point the UI at your own Phala service:

```txt
VITE_PHALA_MINIMAL_APP_URL=https://your-phala-service-url
```

In development, Vite proxies this through `/__phala`.

## Notes on local and verified paths

1. `Local` uses the local API server.

2. `Verified Runtime (TEE)` uses the verified service path.

3. `Node Analysis` is the direct operator view and does not use the same recommendation toggle flow.

## Next reading

1. [Product](/product)

2. [LNC](/lnc)

3. [Private Pipeline](/privatepipeline)

4. [Architecture](/architecture)
