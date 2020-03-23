import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './book-list.css';

const BookList = ({ books, onAddedToCart }) => {
  return (
    <ul className="book-list" >
      {
        books.map((book) => {
          return (
            <li key={book.id}>
              <BookListItem
                book={book}
                onAddedToCart={() => onAddedToCart(book.id) }
              />
            </li>
          )
        })
      }
    </ul>
  );
};

class BookListContainer extends Component {

  componentDidMount() {
    this.props.fetchBooks();
    // 1. receive data
    //const {
    //  bookstoreService,
    //  booksLoaded,
    //  booksRequested,
    //  booksError
    //} = this.props;

    //booksRequested();
    //bookstoreService.getBooks()
    //  .then((data) => {
    //    // 2. dispacth action to store
    //    booksLoaded(data);
    //  })
    //  .catch((err) => booksError(err));
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <BookList books={books} onAddedToCart={onAddedToCart}/>
  }
}

const mapStateToProps = ({ books, loading, error }) => {
  return { books, loading, error };
  // ����� state �  �������� �� ��������� � �������� ������� props
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { bookstoreService } = ownProps;
  //ownProps - �������� ����������, 
  // ������� �� �������� ������ �� ������ �����������
  // ������ ��� withBookstoreService()
  return {
    fetchBooks: fetchBooks(bookstoreService, dispatch),
    onAddedToCart: (id) => dispatch(bookAddedToCart(id))
  };
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
