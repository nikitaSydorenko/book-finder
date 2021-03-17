import { request } from './request';

const BASE_URL = 'https://www.googleapis.com/books/';
const VERSION = 'v1/';

export const fetchBook = (book) => request(`${BASE_URL}${VERSION}volumes?q=${book}`);
