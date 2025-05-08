
import { API_BASE_URL } from "@/constant/constants";
import { fetchErrorEvent } from "./ErrorHandler";
import { refreshToken } from "../service/TokenService";

export async function apiFetch<T>(
  url: string,
  attributes: RequestInit,
  retry: boolean = true
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, attributes);
  const json = await response.json();
  console.log("API response:", json);
  
  if (!response.ok) {
    if (retry && response.status === 403) {
      try {
        console.log("Retrying with token refresh...");
        await refreshToken();
        return apiFetch<T>(url, attributes, false); 
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
      }
    }

    fetchErrorEvent.dispatchEvent(
      new CustomEvent("api-fetch-error", {
        detail: { errorEntity: json },
      })
    );

    throw new Error(json.message || "API request failed");
  }

  return json as T;
}