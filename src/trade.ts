import { KiteConnect } from "kiteconnect";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.ZERODHA_API_KEY as string;
const accessToken = process.env.ZERODHA_ACCESS_TOKEN as string;
const kc = new KiteConnect({ api_key: apiKey });
kc.setAccessToken(accessToken);

console.log(kc.getLoginURL());
export async function main() {
  try {
    const profile = await getProfile();
    return profile;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getProfile() {
  try {
    const profile = await kc.getProfile();
    return profile;
  } catch (err) {
    console.error("Error getting profile:", err);
    return null;
  }
}
