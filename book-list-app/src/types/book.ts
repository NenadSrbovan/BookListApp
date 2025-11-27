export interface Book {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

export interface BookListProps {
  books: Book[];
  onAddBook?: (book: Omit<Book, "id">) => void;
  onBooksChange?: (books: Book[]) => void;
  onDeleteBook?: (bookId: string) => void;
  onUpdateBook?: (book: Book) => void;
}
