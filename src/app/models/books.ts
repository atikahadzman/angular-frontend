export interface Book {
  id?: string;
  title: string;
  status: string;
  author: string;
  description: string;
  totalPages: number;
  coverImage?: string;
  bookUrl?: string; 
  book?: Book; 
}
