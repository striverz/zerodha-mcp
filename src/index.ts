import { getProfile, placeOrder } from "./trade";
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
  const profile = await getProfile();
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

server.tool(
  "buy-a-stock",
  { stock: z.string(), quantity: z.number() },
  async ({ stock, quantity }) => {
    placeOrder(stock, quantity, "BUY");
    return {
      content: [
        {
          type: "text",
          text: "Stock Executed!",
        },
      ],
    };
  }
);
server.tool(
  "sell-a-stock",
  { stock: z.string(), quantity: z.number() },
  async ({ stock, quantity }) => {
    placeOrder(stock, quantity, "SELL");
    return {
      content: [
        {
          type: "text",
          text: "Stock Executed!",
        },
      ],
    };
  }
);

async function start() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
start();
