export interface Progress {
    id?: string;
    user_id: string;
    book_id: string;
    status: string;
    current_page: number;
    started_at: number;
    last_read_at: number;
    completed_at: number;
}