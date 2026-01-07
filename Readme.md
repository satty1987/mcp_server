# Node MCP Server

Small example MCP (Model Context Protocol) server that exposes a weather tool using the `@modelcontextprotocol/sdk`.

## Overview

- Provides a minimal Express-based HTTP server that connects an `McpServer` to a Streamable HTTP transport.
- Exposes endpoints: `/mcp` (MCP transport), `/health`, `/status`, and `/`.

## Requirements

- Node.js 18+ recommended
- npm

## Install

```bash
npm install
```

## Run

```bash
npm start
```

Server listens on port `3000` by default.

## Endpoints

- `GET /health` — returns `OK`.
- `GET /status` — returns a JSON status object.
- `POST /mcp` — Streamable HTTP MCP transport endpoint. The server expects clients to POST JSON-RPC messages.

Important: the Streamable HTTP transport expects clients to include the following headers for POSTs:

- `Content-Type: application/json`
- `Accept: application/json, text/event-stream`

Example curl (initialize):

```bash
curl --location 'http://localhost:3000/mcp' \
--header 'Content-Type: application/json;' \
--header 'Accept: application/json, text/event-stream' \
--data '{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "getWeather_Tool",
    "arguments": {
      "location":"New York"
    }
  }
}'
```

## Notes

- The project uses `@modelcontextprotocol/sdk` (see `package.json`) and returns structured tool results. Tool callbacks must return objects matching the SDK's expected schema (not plain strings).
- If you see errors about Accept headers or tool result shapes, verify headers and that tool callbacks return an object with a `content` array.

## License

MIT
