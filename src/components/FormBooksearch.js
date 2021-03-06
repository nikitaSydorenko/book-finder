import React, { useState, useCallback } from 'react';
import { fetchBook } from '../utils/api/fetchBooksApi';
import defaultImage from '../assets/defaultImageForBook.jpg';
import '../styles/Form.css';

const FormBookSearch = () => {
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState([]);

  const fetchMyAPI = useCallback(async () => {
    try {
      const response = await fetchBook(title);
      const { data: { items = [] } = {} } = response;
      setBooks(items);
    } catch (e) {
      console.error('fetch books error:', e);
    }
  }, [title]);
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    fetchMyAPI();
  }, [fetchMyAPI]);

  const handleChange = useCallback((e) => {
    const book = e.target.value;
    setTitle(book);
  }, []);

  return (
    <div className="container">
      <h3>Find Books</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" onChange={handleChange} value={title} className="form-control mt-10" placeholder="Search for books" autoComplete="off" />
        </div>
        <button className="btn btn-danger" type="submit">Search</button>
      </form>
      <div className="books">
        { books.map((book) => {
          const { volumeInfo: { imageLinks = { } } = { } } = book || { };
          const { volumeInfo = { } } = book;
          const { smallThumbnail = '' } = imageLinks;
          const { thumbnail = '' } = imageLinks;
          return (
            <div className="wrapper" key={book.id}>
              <div className="book-container">
                <img src={`${thumbnail || smallThumbnail}` || `${defaultImage}`} key={book.id} alt={volumeInfo.title} />
              </div>
              <div className="description" />
              <span>{volumeInfo.publisher}</span>
              <h4>{volumeInfo.title || 'there is no title in the source'}</h4>
              <p>{volumeInfo.subtitle || 'No description :('}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormBookSearch;
