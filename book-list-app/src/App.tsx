import { BookList } from "./components/BookList/BookList";
import { Book } from "./types/book";
import "./components/BookList/BookList.css";

const mockBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    description:
      "A classic novel of the Jazz Age, exploring themes of idealism, resistance to change, social upheaval, and excess.",
    imageUrl: "https://via.placeholder.com/100x150/4A90E2/FFFFFF?text=Gatsby",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    description:
      "A gripping story of racial injustice and childhood innocence in the American South.",
    imageUrl:
      "https://via.placeholder.com/100x150/50E3C2/FFFFFF?text=Mockingbird",
  },
  {
    id: "3",
    title: "1984",
    description:
      "A dystopian social science fiction novel that examines totalitarianism and thought control.",
    // No image URL to test placeholder
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    // No description to test that case
    imageUrl: "https://via.placeholder.com/100x150/B8E986/FFFFFF?text=Pride",
  },
  {
    id: "5",
    title: "The Hobbit",
    description:
      "A fantasy novel about the adventures of hobbit Bilbo Baggins.",
    imageUrl: "https://invalid-url-that-will-fail.com/image.jpg",
    // Test error handling
  },
];

function App() {
  const handleAddBook = (book: Omit<Book, "id">) => {
    console.log("New book added:", book);
  };

  const handleBooksChange = (books: Book[]) => {
    console.log("Books updated:", books);
  };

  const handleDeleteBook = (bookId: string) => {
    console.log("Book deleted:", bookId);
  };

  const handleUpdateBook = (updatedBook: Book) => {
    console.log("Book updated:", updatedBook);
  };

  return (
    <div className="App">
      <BookList
        books={mockBooks}
        onAddBook={handleAddBook}
        onBooksChange={handleBooksChange}
        onDeleteBook={handleDeleteBook}
        onUpdateBook={handleUpdateBook}
      />
    </div>
  );
}

export default App;
