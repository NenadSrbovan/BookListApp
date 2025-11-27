import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookList } from "./BookList";
import { Book } from "../../types/book";

const mockBooks: Book[] = [
  {
    id: "1",
    title: "Test Book",
    description: "Test description",
    imageUrl: "https://via.placeholder.com/100x150",
  },
];

describe("BookList", () => {
  it("renders book list with correct number of items", () => {
    render(<BookList books={mockBooks} />);

    expect(screen.getByText("Book Collection (1)")).toBeInTheDocument();
    expect(screen.getByText("Test Book")).toBeInTheDocument();
  });

  it("adds a new book when add button is clicked", async () => {
    const user = userEvent.setup();
    render(<BookList books={mockBooks} />);

    const addButton = screen.getByRole("button", { name: /add new book/i });
    await user.click(addButton);

    expect(screen.getByText("Book Collection (2)")).toBeInTheDocument();
    expect(screen.getByText("New Book 2")).toBeInTheDocument();
  });

  it("calls onAddBook callback when new book is added", async () => {
    const user = userEvent.setup();
    const mockOnAddBook = jest.fn();
    render(<BookList books={mockBooks} onAddBook={mockOnAddBook} />);

    const addButton = screen.getByRole("button", { name: /add new book/i });
    await user.click(addButton);

    expect(mockOnAddBook).toHaveBeenCalledWith({
      title: "New Book 2",
      description: "This is a newly added book description.",
      imageUrl: "https://via.placeholder.com/100x150?text=New+Book",
    });
  });

  it("displays empty state when no books are provided", () => {
    render(<BookList books={[]} />);

    expect(screen.getByText(/no books available/i)).toBeInTheDocument();
  });

  it("removes a book when delete is called", async () => {
    const user = userEvent.setup();
    render(<BookList books={mockBooks} />);

    const deleteButton = screen.getByLabelText(/delete test book/i);
    await user.click(deleteButton);

    expect(screen.queryByText("Test Book")).not.toBeInTheDocument();
    expect(screen.getByText("Book Collection (0)")).toBeInTheDocument();
  });
});
