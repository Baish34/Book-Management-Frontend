import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import { fetchBooks } from "../features/books/booksSlice";
import BookList from "./BookList";

const BookView = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const status = useSelector((state) => state.staus);
  const error = useSelector((state) => state.error);
  console.log(books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  return (
    <div className="container p-4">
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <h1 className="mb-3">Book View</h1>
      <Link to="/addBook" className="rounded px-3 py-2 bg-warning ">
        Add Book
      </Link>

      <BookList books={books.books} />
    </div>
  );
};

export default BookView;
