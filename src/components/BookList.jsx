import { useSelector } from "react-redux";

import React from "react";
import { Link } from "react-router-dom";

const BookList = ({ books }) => {
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);

  // if (!books1 || books1.length === 0) {
  //   return <p>No books available.</p>;
  // }

  return (
    <div className="container mt-3">
      <h2>Book List</h2>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul className="list-group">
        {books?.map((book) => (
          <li key={book._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Link
                  to={`/books/${book._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Title: {book.title} <br />
                  Author: {book.author}
                  <br />
                  Genre: {book.genre}
                </Link>
              </div>
              {/* <div>
                <button className="btn btn-danger">DELETE</button>
              </div> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
