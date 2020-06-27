import React from 'react';
import Book from './Book';


const BookShelf = (props) => (
  <div className='bookshelf'>
    <div className='bookshelf-title'>
      <h2>{props.category}</h2>
    </div>
    <div className='bookshelf-books'>
      <ol className='books-grid'>
        {props.books.map ((book) => (
          <li key={book.id}><Book book={book} addBookToShelf={props.addBookToShelf}/></li>
        ))}
      </ol>
    </div>
  </div>
)

export default BookShelf;
