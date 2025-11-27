import { useState } from "react";
import { Book } from "../../types/book";
import { EditBookForm } from "../EditBookForm/EditBookForm";

interface BookItemProps {
  book: Book;
  onDeleteBook?: (bookId: string) => void;
  onUpdateBook?: (book: Book) => void;
}

export const BookItem: React.FC<BookItemProps> = ({
  book,
  onDeleteBook,
  onUpdateBook,
}) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleToggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleDelete = () => {
    if (onDeleteBook) {
      onDeleteBook(book.id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedBook: Book) => {
    onUpdateBook?.(updatedBook);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const hasImage = book.imageUrl && !imageError;
  const hasDescription = book.description;
  const canEdit = onUpdateBook;

  if (isEditing) {
    return (
      <article className="book-item book-item--editing">
        <EditBookForm book={book} onSave={handleSave} onCancel={handleCancel} />
      </article>
    );
  }

  return (
    <article
      className="book-item"
      aria-labelledby={`book-title-${book.id}`}
      role="article"
    >
      <div className="book-item__content">
        {hasImage ? (
          <img
            src={book.imageUrl}
            alt={`Cover of ${book.title}`}
            className="book-item__image"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div
            className="book-item__image-placeholder"
            role="img"
            aria-label={`No cover available for ${book.title}`}
          >
            📚
          </div>
        )}

        <div className="book-item__details">
          <div className="book-item__header">
            <h3 id={`book-title-${book.id}`} className="book-item__title">
              {book.title}
            </h3>
            <div className="book-item__actions">
              {canEdit && (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="book-item__edit-button"
                  aria-label={`Edit ${book.title}`}
                  title="Edit book"
                >
                  ✏️
                </button>
              )}
              {onDeleteBook && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="book-item__delete-button"
                  aria-label={`Delete ${book.title}`}
                  title="Delete book"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>

          {hasDescription && (
            <div className="book-item__description-section">
              <button
                type="button"
                onClick={handleToggleDescription}
                className="book-item__toggle-button"
                aria-expanded={isDescriptionVisible}
                aria-controls={`book-description-${book.id}`}
              >
                {isDescriptionVisible ? "Hide Description" : "Show Description"}
              </button>

              {isDescriptionVisible && (
                <p
                  id={`book-description-${book.id}`}
                  className="book-item__description"
                >
                  {book.description}
                </p>
              )}
            </div>
          )}

          {!hasDescription && (
            <p className="book-item__no-description" aria-live="polite">
              No description available
            </p>
          )}
        </div>
      </div>
    </article>
  );
};
