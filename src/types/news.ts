import type { FileType } from "./file";

export type News = {
    id: number;
    title: string;
    content: string;
    publishedAt: string;
    files?: FileType[];
};