import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(
    "https://book-management-umber-one.vercel.app/books"
  );
  return response.data;
});

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id) => {
    const response = await axios.get(
      `https://book-management-umber-one.vercel.app/books/${id}`
    );
    return response.data;
  }
);

export const addBook = createAsyncThunk("books/addBook", async (book) => {
  const response = await axios.post(
    "https://book-management-umber-one.vercel.app/books",
    book
  );
  return response.data;
});

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, ...book }) => {
    const response = await axios.put(
      `https://book-management-umber-one.vercel.app/books/${id}`,
      book
    );
    return response.data;
  }
);

export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  await axios.delete(
    `https://book-management-umber-one.vercel.app/books/${id}`
  );
  return id;
});

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(
          (book) => book._id === action.payload._id
        );
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book._id !== action.payload);
      });
  },
});

export default booksSlice.reducer;
