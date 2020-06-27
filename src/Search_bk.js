import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';


class Search extends Component {
  state = {
    query: '',
    booksSearched: {}
  }

  fetchBooksUsingQuery (searchString, props = this.props) {
    const {booksOnShelf} = props;
    BooksAPI.search(searchString)
      .then((books) => {
        let booksObject = {};
        if (books && !books.error) {
          books.forEach(b => {
            booksObject[b.id] = b; //Converting books array to Object using book ID as key
            if (booksOnShelf[b.id]) {  // check if book exists on shelf
              booksObject[b.id].shelf = booksOnShelf[b.id].shelf;
            }
          })
          this.setState({
            booksSearched: booksObject
          })
        } else {
          this.setState({
            booksSearched: {}
          })
        }
      })
  }

  /**
  * Whenever App's state is updated,
  * we want to make sure
  * bookshelf books (passed as props) are merged into Seach state.
  */
  componentWillReceiveProps(newProps) {
    this.fetchBooksUsingQuery (this.state.query, newProps)
  }

  handleQuery = (e) => {
    const searchString = e.target.value;
    this.setState({
      query: searchString
    })
    this.fetchBooksUsingQuery (searchString)
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
