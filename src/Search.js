import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';


class Search extends Component {
  state = {
    query: '',
    booksSearched: []
  }

  fetchBooksUsingQuery (searchString) {
    BooksAPI.search(searchString)
      .then((books) => {
        if (books && !books.error) {
          const booksWithShelf = this.updateShelfStatus(books);
          this.setState({
            booksSearched: booksWithShelf
          })
        } else {
          this.setState({
            booksSearched: {}
          })
        }
      })
  }
  /**
  * Helper Method: Update shelf status on books in State, and return books array
  */
  updateShelfStatus = (books) => {
    let {booksOnShelf} = this.props;
    const booksWithShelfStatus = books.map(book => {
      book.shelf = (booksOnShelf[book.id] ? booksOnShelf[book.id].shelf : 'none')
      return book;
    });
    return booksWithShelfStatus;
  }

  handleQuery = (e) => {
    const searchString = e.target.value;
    this.setState({
      query: searchString
    })
    this.fetchBooksUsingQuery(searchString);
  }

  /**
  * IFF props changed, update the shelf status
  */
  componentDidUpdate(prevProps) {
    if (this.props.booksOnShelf !== prevProps.booksOnShelf) {
      this.setState(currState => ({
        booksSearched: this.updateShelfStatus(currState.booksSearched)
      }));
    }
  }

  render() {
    const {booksSearched, query} = this.state;
    return(
      <div>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'/>
          <div className='search-books-input-wrapper'>
            <input
              placeholder="Enter book name"
              name='query'
              value={query}
              onChange={this.handleQuery}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {Object.values(booksSearched).map ((book) => (
              <li key={book.id}><Book book={book} addBookToShelf={this.props.addBookToShelf}/></li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
