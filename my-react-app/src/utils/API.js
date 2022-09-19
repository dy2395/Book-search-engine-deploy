export const searchGoogle = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
