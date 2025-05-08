import type { UserDto } from "@/model/UserDto";
import { apiFetch } from "../utils/ApiUtils";
import { RequestAttributes } from "../utils/RequestAttributes";
import { log } from "@/utils/Logger";
import type { StoryDto } from "@/model/StoryDto";
import { FRONT_URL } from "@/constant/constants";

export class UserService {
  @log
  static async getUser(): Promise<UserDto> {
    return apiFetch<UserDto>(
      "/user",
      await RequestAttributes.builder().addHeader("Access-Control-Allow-Origin", FRONT_URL).addAuthHeader().build()
    );
  }

  @log
  static async getReadStories(): Promise<StoryDto[]> {
    return apiFetch<StoryDto[]>(
      "/user/readStories",
      await RequestAttributes.builder().addAuthHeader().build()
    );
  }

  @log
  static async getLikedStories(): Promise<StoryDto[]> {
    return apiFetch<StoryDto[]>(
      "/user/likedStories",
      await RequestAttributes.builder().addAuthHeader().build()
    );
  }
  
  @log
  static async updateUser(name: string, isSubscribed: boolean, img?: string): Promise<UserDto> {
    console.log("Saving user settings:", { name, isSubscribed, img });
    return apiFetch<UserDto>(
      "/user/update",
      await RequestAttributes.builder()
      .setBody({ name: name, img: img, isSubscribed: isSubscribed })
      .setMethod("POST")
      .addHeader("Access-Control-Allow-Origin", FRONT_URL)
      .addHeader("Access-Control-Allow-Credentials", "true")
      .addHeader("Content-Type", "application/json")
      .addHeader("Accept", "application/json")
      .addHeader("Access-Control-Allow-Headers", "*")
      .addHeader("Access-Control-Allow-Methods", "*")
      .addAuthHeader().build()
    );
  }

  @log
  static async addLikedStory(storyId: number): Promise<void> {
    return apiFetch<void>(
      "/user/addLikedStory?storyId=" + storyId,
      await RequestAttributes.builder().setMethod("POST").addAuthHeader().build()
    );
  }

  @log
  static async addReadStory(storyId: number): Promise<void> {
    return apiFetch<void>(
      "/user/addReadStory?storyId=" + storyId,
      await RequestAttributes.builder().setMethod("POST").addAuthHeader().build()
    );
  }

  @log
  static async removeLikedStory(storyId: number): Promise<void> {
    return apiFetch<void>(
      "/user/removeLikedStory?storyId=" + storyId,
      await RequestAttributes.builder().setMethod("POST").addAuthHeader().build()
    );
  }

  @log
  static async removeReadStory(storyId: number): Promise<void> {
    return apiFetch<void>(
      "/user/removeReadStory?storyId=" + storyId,
      await RequestAttributes.builder().setMethod("POST").addAuthHeader().build()
    );
  }
}