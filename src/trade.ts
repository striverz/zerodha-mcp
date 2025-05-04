import { KiteConnect } from "kiteconnect";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.ZERODHA_API_KEY as string;
const accessToken = process.env.ZERODHA_ACCESS_TOKEN as string;
const kc = new KiteConnect({ api_key: apiKey });
kc.setAccessToken(accessToken);

export async function getProfile() {
  try {
    const profile = await kc.getProfile();
    return profile;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function placeOrder(
  tradingsymbol: string,
  quantity: number,
  type: "BUY" | "SELL"
) {
  try {
    await kc.placeOrder("regular", {
      exchange: "BSE",
      tradingsymbol,
      transaction_type: type,
      quantity,
      product: "CNC",
      order_type: "MARKET",
    });
  } catch (err) {
    console.log(err);
  }
}
