import { useState } from "react";
import { Book, BookListProps } from "../../types/book";
import { BookItem } from "../BookItem/BookItem";

export const BookList: React.FC<BookListProps> = ({
  books: initialBooks,
  onAddBook,
  onBooksChange,
  onDeleteBook,
}) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);

  const handleAddBook = () => {
    const newBook: Book = {
      id: `book-${Date.now()}`,
      title: `New Book ${books.length + 1}`,
      description: "This is a newly added book description.",
      imageUrl: "https://via.placeholder.com/100x150?text=New+Book",
    };

    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);

    onAddBook?.(newBook);
    onBooksChange?.(updatedBooks);
  };

  const handleDeleteBook = (bookId: string) => {
    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
    onBooksChange?.(updatedBooks);
    onDeleteBook?.(bookId);
  };

  const handleUpdateBook = (updatedBook: Book) => {
    const updatedBooks = books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedBooks);
    onBooksChange?.(updatedBooks);
  };

  return (
    <section className="book-list" aria-label="Book collection" role="region">
      <header className="book-list__header">
        <h2>Book Collection ({books.length})</h2>
        <button
          type="button"
          onClick={handleAddBook}
          className="book-list__add-button"
          aria-label="Add new book"
        >
          + Add New Book
        </button>
      </header>

      <div className="book-list__items" role="list" aria-label="Books">
        {books.map((book) => (
          <div key={book.id} role="listitem">
            <BookItem
              book={book}
              onDeleteBook={handleDeleteBook}
              onUpdateBook={handleUpdateBook}
            />
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <p className="book-list__empty" aria-live="polite">
          No books available. Add a new book to get started.
        </p>
      )}
    </section>
  );
};
