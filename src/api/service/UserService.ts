import type { UserDto } from "@/model/UserDto";
import { apiFetch } from "../utils/ApiUtils";
import { RequestAttributes } from "../utils/RequestAttributes";
import { log } from "@/utils/Logger";
import type { StoryDto } from "@/model/StoryDto";

export class UserService {
  @log
  static async getUser(): Promise<UserDto> {
    return apiFetch<UserDto>(
      "/user",
      await RequestAttributes.builder().addAuthHeader().build()
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
  static async updateUser(): Promise<void> {
    return apiFetch<void>(
      "/user/update",
      await RequestAttributes.builder().setMethod("POST").addAuthHeader().build()
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

  @log
  static async subscribe(): Promise<void> {
    return apiFetch<void>(
      "/user/subscribe",
      await RequestAttributes.builder().setMethod("PUT").addAuthHeader().build()
    );
  }

  @log
  static async unsubscribe(): Promise<void> {
    return apiFetch<void>(
      "/user/unsubscribe",
      await RequestAttributes.builder().setMethod("PUT").addAuthHeader().build()
    );
  }
}