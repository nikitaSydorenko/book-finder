import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/books/';
const VERSION = 'v1/';

export const fetchBook = (book) => axios.get(`${BASE_URL}${VERSION}volumes?q=${book}`)
  .catch((error) => console.log('error:', error));
