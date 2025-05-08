export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const ACCESS_TOKEN_NAME = "accessToken";
export const REFRESH_TOKEN_NAME = "refreshToken";
export const FRONT_URL = `${import.meta.env.VITE_FRONT_URL}`;
console.log("FRONT_URL: " + FRONT_URL);
console.log("API_BASE_URL: " + API_BASE_URL);
export const DEFAULT_CREDENTIALS: RequestCredentials = "include";
export const DEFAULT_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": `${FRONT_URL}`,
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Credentials": "true"
};