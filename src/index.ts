import { main } from "./trade";
import dotenv from "dotenv";
import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
dotenv.config();

const server = new McpServer({
  name: "Demo",
  version: "1.0.0",
});

server.tool("get-my-data", {}, async () => {
  const profile = await main();
  console.log(profile);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(profile, null, 2),
      },
    ],
  };
});

async function start() {
  const data = await main();
  console.log(data);
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
start();
