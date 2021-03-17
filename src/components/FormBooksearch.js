import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Form.css';
import { fetchBook } from '../utils/api/fetchBooksApi';

const FormBookSearch = () => {
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState([]);
  const [sendRequest, setSendRequest] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const book = e.target.value;
    setTitle(book);
  };

  const fetchMyAPI = async () => {
    const responseDB = await fetchBook(title);
    setBooks(responseDB.data.items);
  };

  useEffect(() => {
    if (sendRequest) {
      setSendRequest(false);
      fetchMyAPI();
    }
  },
  [sendRequest]);
  console.log(title);
  return (
    <div className="container">
      <h3>Find Books</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" onChange={handleChange} value={title} className="form-control mt-10" placeholder="Search for books" autoComplete="off" />
        </div>
        <button className="btn btn-danger" disabled={sendRequest} onClick={() => setSendRequest(true)} type="submit">Search</button>
      </form>
      {books.map((book) => {
        console.log(book);
        return (
          <img src={`${book.volumeInfo.imageLinks.thumbnail}`} key={book.id} alt={book.volumeInfo.title} />
        );
      })}
    </div>
  );
};

export default FormBookSearch;
