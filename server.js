import express from 'express'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { server } from './mcp-server.js'

const app = express()
const port = 3000
app.get('/health', (req, res) => res.send('OK'))
app.post('/mcp', async (req, res) => {
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
        enableJsonResponse: true,
    });
    res.on('close', () => {
        transport.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
});
app.get('/status', (req, res) => {

    res.json({ status: 'running' });
});
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))