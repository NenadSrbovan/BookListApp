import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EditBookForm } from "./EditBookForm";
import { Book } from "../../types/book";

const mockBook: Book = {
  id: "1",
  title: "Test Book",
  description: "Test description",
  imageUrl: "https://example.com/image.jpg",
};

describe("EditBookForm", () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form with book data", () => {
    render(
      <EditBookForm
        book={mockBook}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/title/i)).toHaveValue("Test Book");
    expect(screen.getByLabelText(/description/i)).toHaveValue(
      "Test description"
    );
    expect(screen.getByLabelText(/image url/i)).toHaveValue(
      "https://example.com/image.jpg"
    );
  });

  it("calls onSave with updated data when form is submitted", async () => {
    const user = userEvent.setup();
    render(
      <EditBookForm
        book={mockBook}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const titleInput = screen.getByLabelText(/title/i);
    await user.clear(titleInput);
    await user.type(titleInput, "Updated Title");

    const saveButton = screen.getByText("Save Changes");
    await user.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith({
      ...mockBook,
      title: "Updated Title",
    });
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <EditBookForm
        book={mockBook}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const cancelButton = screen.getByText("Cancel");
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("disables save button when title is empty", async () => {
    const user = userEvent.setup();
    render(
      <EditBookForm
        book={mockBook}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    );

    const titleInput = screen.getByLabelText(/title/i);
    await user.clear(titleInput);

    const saveButton = screen.getByText("Save Changes");
    expect(saveButton).toBeDisabled();
  });
});
