import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { addBook, updateBook } from "../features/books/booksSlice";

const BookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const bookToEdit = location.state?.book || null;

  const [title, setTitle] = useState(bookToEdit ? bookToEdit.title : "");
  const [author, setAuthor] = useState(bookToEdit ? bookToEdit.author : "");
  const [genre, setGenre] = useState(bookToEdit ? bookToEdit.genre : "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (bookToEdit && Object.keys(bookToEdit).length > 0) {
      setTitle(bookToEdit.title || "");
      setAuthor(bookToEdit.author || "");
      setGenre(bookToEdit.genre || "");
    }
  }, [bookToEdit]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !author || !genre) {
      setError("All fields are required.");
      return;
    }

    const newBook = {
      title: title,
      author: author,
      genre: genre,
    };

    if (bookToEdit) {
      console.log("Updating book:", newBook); // Add console log for debugging
      dispatch(updateBook({ ...bookToEdit, ...newBook }));
    } else {
      dispatch(addBook(newBook));
    }

    setTitle(" ");
    setAuthor(" ");
    setGenre(" ");
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="container py-4">
        <h2>{bookToEdit ? "Edit Book" : "Add Book"}</h2>
        <form onSubmit={submitHandler}>
          <div>
            <input
              placeholder="Book Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <br />
          <div>
            <input
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <br />
          <div>
            <input
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <br />

          <button type="submit">
            {bookToEdit ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </>
  );
};
export default BookForm;
