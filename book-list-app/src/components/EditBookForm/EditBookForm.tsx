import { useState } from "react";
import { Book } from "../../types/book";

interface EditBookFormProps {
  book: Book;
  onSave: (updatedBook: Book) => void;
  onCancel: () => void;
}

export const EditBookForm: React.FC<EditBookFormProps> = ({
  book,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description || "");
  const [imageUrl, setImageUrl] = useState(book.imageUrl || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedBook: Book = {
      ...book,
      title: title.trim(),
      description: description.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
    };

    onSave(updatedBook);
  };

  const handleCancel = () => {
    setTitle(book.title);
    setDescription(book.description || "");
    setImageUrl(book.imageUrl || "");
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="edit-book-form">
      <div className="edit-book-form__field">
        <label htmlFor={`title-${book.id}`} className="edit-book-form__label">
          Title *
        </label>
        <input
          id={`title-${book.id}`}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="edit-book-form__input"
          required
          aria-required="true"
        />
      </div>

      <div className="edit-book-form__field">
        <label
          htmlFor={`description-${book.id}`}
          className="edit-book-form__label"
        >
          Description
        </label>
        <textarea
          id={`description-${book.id}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="edit-book-form__textarea"
          rows={3}
          placeholder="Enter book description (optional)"
        />
      </div>

      <div className="edit-book-form__field">
        <label
          htmlFor={`imageUrl-${book.id}`}
          className="edit-book-form__label"
        >
          Cover Image URL
        </label>
        <input
          id={`imageUrl-${book.id}`}
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="edit-book-form__input"
          placeholder="https://example.com/image.jpg (optional)"
        />
      </div>

      <div className="edit-book-form__actions">
        <button
          type="button"
          onClick={handleCancel}
          className="edit-book-form__button edit-book-form__button--cancel"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="edit-book-form__button edit-book-form__button--save"
          disabled={!title.trim()}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};
