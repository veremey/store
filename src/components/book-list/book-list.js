import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequested, booksError } from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './book-list.css';

class BookList extends Component {

  componentDidMount() {
    // 1. receive data
    const {
      bookstoreService,
      booksLoaded,
      booksRequested,
      booksError
    } = this.props;

    booksRequested();
    bookstoreService.getBooks()
      .then((data) => {
        // 2. dispacth action to store
        booksLoaded(data);
      })
      .catch((err) => booksError(err));
  }

  render() {
    const { books, loading, error } = this.props;

    if (loading) {
      return <Spinner />;
    } 

    if (error) {
      return <ErrorIndicator />;
    }

    return (
      <ul className="book-list">
        {
          books.map((book) => {
            return (
              <li key={book.id}><BookListItem book={book}/></li>
            )
          })
        }
      </ul>
    );
  }
}

const mapStateToProps = ({ books, loading, error }) => {
  return { books, loading, error };
};

const mapDispatchToProps = {
  booksError,
  booksRequested,
  booksLoaded
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);
