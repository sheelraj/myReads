import React, {Component} from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import {Route, Link} from 'react-router-dom';
import Header from './Header';
import Search from './Search';
import BookShelf from './BookShelf';


class App extends Component {
  state = {
    booksOnShelf: [],
    shelves: [
      {id:'currentlyReading', name:'Currently Reading'},
      {id:'wantToRead', name:'Want to Read'},
      {id:'read', name:'Read'}
    ]
  }

  componentDidMount() {
    let booksObject = {};
    BooksAPI.getAll()
      .then((books) => {
        if (books && !books.error) {
          /**
          * Converting books array to Object using book ID as key
          * this helps merging updates from Book Component back into App's state
          */
          books.forEach(b => {booksObject[b.id] = b})
        }
        this.setState({
          booksOnShelf: booksObject
        })
      })
  }

  addBookToShelf = (book, status) => {
    let bookUpdate = {[book.id]: {...book, shelf: status}};
    this.setState(currentState => ({
      booksOnShelf: {...currentState.booksOnShelf, ...bookUpdate}
    }))
    BooksAPI.update(book, status);
  }

  render() {
    const {booksOnShelf, shelves} = this.state;
    const books = Object.values(booksOnShelf);
    return (
      <div>
        <Route exact path='/' render={() => (
          <div>
            <Header />
            <div className='list-books-content'>
              <div>
                {shelves.map(shelf => (
                  <BookShelf key={shelf.id}
                    books={books.filter((book) => book.shelf === shelf.id)}
                    addBookToShelf={this.addBookToShelf}
                    category={shelf.name}
                  />
                ))}
              </div>
            </div>
            <Link to='/search' className='open-search'><button/></Link>
          </div>
        )}/>
        <Route path='/search' render={() => (
          <Search addBookToShelf={this.addBookToShelf} booksOnShelf={booksOnShelf}/>
        )}/>
      </div>
    );
  }
}

export default App;
