import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getWeatherData } from "./api-caller.js";

// Create server instance
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
});
const config = {
    description: "Get current weather information for a specified location.",
    title: "Get Weather",
    inputSchema: z.object({
        location: z.string()
    }),
}

server.registerTool("getWeather_Tool", config, callback);

async function callback(params) {
  const { location } = params;
  try {
    const resp = await getWeatherData(location);
    return {
        content:[
            {
                type: "text",
                text: `The weather in ${location} is: ${resp.temperature}°c with wind speed ${resp.windspeed} km/h.`,
            }
        ]
    }
  } catch (error) {
    return {
        content: [
            {
                type: "text",
                text: `Error fetching weather data: ${error.message}`,
            }
        ]
    };
  }
}

export { server };