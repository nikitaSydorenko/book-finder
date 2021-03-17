import axios from 'axios';

export const request = (url, options) => axios.get(url, options)
  .then((response) => response)
  .catch((error) => console.log('error:', error));
