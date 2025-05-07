import type { StoryDto } from "@/model/StoryDto";
import { log } from "@/utils/Logger";
import { apiFetch } from "../utils/ApiUtils";
import { RequestAttributes } from "../utils/RequestAttributes";
import type { Page } from "@/model/Page";
import type { Story } from "@/model/Story";

export class StoryService {
  @log
  static async getStory(storyId: number): Promise<Story> {
    return apiFetch<Story>(
      "/story/" + storyId,
      await RequestAttributes.builder().addAuthHeader().build()
    );
  }

  @log
  static async getTopStories(page: number, size: number, sort?: string): Promise<Page<StoryDto>> {
    return apiFetch<Page<StoryDto>>(
      `/story/topStories?page=${page}&size=${size}${sort ? "&sort=" + sort : ""}`,
      await RequestAttributes.builder().addAuthHeader().build()
    );
  }

  @log
  static async getNotReadStories(page: number, size: number, sort?: string): Promise<Page<StoryDto>> {
    return apiFetch<Page<StoryDto>>(
      `/story/notReadStories?page=${page}&size=${size}${sort ? "&sort=" + sort : ""}`,
      await RequestAttributes.builder().addAuthHeader().build()
    );
  }

  @log
  static async getStories(page: number, size: number, sort?: string): Promise<Page<StoryDto>> {
    return apiFetch<Page<StoryDto>>(
      `/story/getStories?page=${page}&size=${size}${sort ? "&sort=" + sort : ""}`,
      await RequestAttributes.builder().addAuthHeader().build()
    );
  }

  @log
  static async searchStories(query: string, page: number, size: number, sort?: string): Promise<Page<StoryDto>> {
    return apiFetch<Page<StoryDto>>(
      `/story/search?query=${query}&page=${page}&size=${size}${sort ? "&sort=" + sort : ""}`,
      await RequestAttributes.builder().addAuthHeader().build()
    );
  }

  @log
  static async createStory(title: string, description: string, imgUrl: string, text: string): Promise<void> {
    return apiFetch<void>(
      `/story/create`,
      await RequestAttributes.builder().setBody({
        title: title,
        description: description,
        imgUrl: imgUrl,
        text: text
      }).setMethod("POST").addAuthHeader().build()
    );
  }

  @log
  static async updateStory(id: number, title: string, description: string, imgUrl: string, text: string): Promise<void> {
    return apiFetch<void>(
      `/story/update`,
      await RequestAttributes.builder().setBody({
        id: id,
        title: title,
        description: description,
        imgUrl: imgUrl,
        text: text
      }).setMethod("POST").addAuthHeader().build()
    );
  }

  @log
  static async deleteStory(storyId: number): Promise<void> {
    return apiFetch<void>(
      `/story/delete=${storyId}`,
      await RequestAttributes.builder().setMethod("DELETE").addAuthHeader().build()
    );
  }
}