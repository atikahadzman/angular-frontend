export interface Progress {
    id?: string;
    userId: string;
    bookId: string;
    status: string;
    currentPage: number;
    startedAt: number;
    lastReadAt: number;
    completedAt: number;
}