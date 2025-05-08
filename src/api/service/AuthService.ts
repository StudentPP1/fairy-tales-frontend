import { log } from "@/utils/Logger";
import { apiFetch } from "../utils/ApiUtils";
import { RequestAttributes } from "../utils/RequestAttributes";
import { API_BASE_URL } from "@/constant/constants";

export class AuthService {
  @log
  static async register(name: string, email: string, password: string) {
    return apiFetch(
      "/auth/register",
      await RequestAttributes.builder()
        .setMethod("POST")
        .setBody({
          name: name,
          email: email,
          password: password,
        })
        .build()
    );
  }

  @log
  static async login(email: string, password: string) {
    return apiFetch(
      "/auth/login",
      await RequestAttributes.builder()
        .setMethod("POST")
        .setBody({
          email: email,
          password: password,
        })
        .build()
    );
  }

  @log
  static async google() {
    const REDIRECT_URI =
      API_BASE_URL.replace("/api", "") + `/oauth2/callback/google`;
    const AUTH_URL =
      API_BASE_URL.replace("/api", "") +
      `/oauth2/authorize/google?redirect_uri=` +
      REDIRECT_URI;
    window.location.href = AUTH_URL;
  }

  @log
  static async logout() {
    return apiFetch(
      "/auth/logout",
      await RequestAttributes.builder().addAuthHeader().build()
    );
  }
}
