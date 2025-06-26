export interface PromotionFile {
    id: number;
    name: string;
    type: string;
    url: string;
    size: number;
    createdAt: string;
    updatedAt: string;
    targetType?: string; // 예: "PROMOTION_BANNER"
    targetId?: number;
}

export type GameFile = {
    id: number;
    url: string;
    type: string;
    name?: string;
};

export type HeroFile = {
    url: string;
    type: string;
};

export type FileType = {
    id: number;
    url: string;
    type: "image" | "video" | "audio" | "file"; // 실제 사용되는 타입만 포함될 수 있음
    name?: string;
    size?: number;
    mimetype?: string;
    createdAt?: string;
    updatedAt?: string;
};