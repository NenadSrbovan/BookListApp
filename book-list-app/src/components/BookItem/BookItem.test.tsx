import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BookItem } from "./BookItem";
import { Book } from "../../types/book";

const mockBook: Book = {
  id: "1",
  title: "Test Book",
  description: "Test description for the book",
  imageUrl: "https://via.placeholder.com/100x150",
};

describe("BookItem", () => {
  it("renders book title and toggle button", () => {
    render(<BookItem book={mockBook} />);

    expect(screen.getByText("Test Book")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /show description/i })
    ).toBeInTheDocument();
  });

  it("toggles description visibility when button is clicked", async () => {
    const user = userEvent.setup();
    render(<BookItem book={mockBook} />);

    const toggleButton = screen.getByRole("button", {
      name: /show description/i,
    });
    await user.click(toggleButton);

    expect(
      screen.getByText("Test description for the book")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /hide description/i })
    ).toBeInTheDocument();

    await user.click(toggleButton);
    expect(
      screen.queryByText("Test description for the book")
    ).not.toBeInTheDocument();
  });

  it("shows placeholder when no image URL is provided", () => {
    const bookWithoutImage = { ...mockBook, imageUrl: undefined };
    render(<BookItem book={bookWithoutImage} />);

    expect(screen.getByLabelText(/no cover available/i)).toBeInTheDocument();
  });

  it("shows no description message when description is missing", () => {
    const bookWithoutDescription = { ...mockBook, description: undefined };
    render(<BookItem book={bookWithoutDescription} />);

    expect(screen.getByText(/no description available/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /show description/i })
    ).not.toBeInTheDocument();
  });

  it("calls onDeleteBook when delete button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnDeleteBook = jest.fn();
    render(<BookItem book={mockBook} onDeleteBook={mockOnDeleteBook} />);

    const deleteButton = screen.getByLabelText(/delete/i);
    await user.click(deleteButton);

    expect(mockOnDeleteBook).toHaveBeenCalledWith("1");
  });

  it("does not show delete button when onDeleteBook is not provided", () => {
    render(<BookItem book={mockBook} />);

    expect(screen.queryByLabelText(/delete/i)).not.toBeInTheDocument();
  });
});

describe("BookItem Edit Functionality", () => {
  it("enters edit mode when edit button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnUpdateBook = jest.fn();
    render(<BookItem book={mockBook} onUpdateBook={mockOnUpdateBook} />);

    const editButton = screen.getByLabelText(/edit/i);
    await user.click(editButton);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByText("Save Changes")).toBeInTheDocument();
  });

  it("saves changes when form is submitted", async () => {
    const user = userEvent.setup();
    const mockOnUpdateBook = jest.fn();
    render(<BookItem book={mockBook} onUpdateBook={mockOnUpdateBook} />);

    const editButton = screen.getByLabelText(/edit/i);
    await user.click(editButton);

    const titleInput = screen.getByLabelText(/title/i);
    await user.clear(titleInput);
    await user.type(titleInput, "Updated Book Title");

    const saveButton = screen.getByText("Save Changes");
    await user.click(saveButton);

    expect(mockOnUpdateBook).toHaveBeenCalledWith({
      ...mockBook,
      title: "Updated Book Title",
    });
  });

  it("cancels editing when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnUpdateBook = jest.fn();
    render(<BookItem book={mockBook} onUpdateBook={mockOnUpdateBook} />);

    const editButton = screen.getByLabelText(/edit/i);
    await user.click(editButton);

    const cancelButton = screen.getByText("Cancel");
    await user.click(cancelButton);

    expect(screen.getByText("Test Book")).toBeInTheDocument();
    expect(mockOnUpdateBook).not.toHaveBeenCalled();
  });
});
