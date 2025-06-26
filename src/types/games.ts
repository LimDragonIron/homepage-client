import type { GameFile } from "./file";

export type PlatformLink = {
    id: number;
    platform: string;
    link: string;
    contentId?: number;
};
  
export type Game = {
    id: number;
    title: string;
    content: string;
    files?: GameFile[];
    platformLinks?: PlatformLink[];
};