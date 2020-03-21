
const booksRequested = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST'
  };
};

const booksLoaded = (newBooks) => {
  return {
    type: 'FETCH_BOOKS_SUCCES',
    payload: newBooks
  };
};

const booksError = (error) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: error
  };
};

const fetchBooks = (bookstoreService, dispatch) => () => {
  dispatch(booksRequested());
  bookstoreService.getBooks()
    .then((data) => {
      // 2. dispacth action to store
      dispatch(booksLoaded(data));
    })
    .catch((err) => dispatch(booksError(err)));
}

export {
  fetchBooks
};
