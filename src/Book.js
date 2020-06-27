import React, {Component} from 'react';

class Book extends Component {
  change = (e) => {
    this.props.addBookToShelf(this.props.book, e.target.value)
  }

  render() {
    const {book} = this.props;
    const thumbnail = (book.imageLinks? book.imageLinks.smallThumbnail : "https://image.flaticon.com/icons/svg/259/259987.svg");
    return(
      <div className='book'>
        <div className='book-top'>
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
          <div className='book-shelf-changer'>
            <select onChange={this.change} value={book.shelf || 'none'}>
              <optgroup label="Move to">
                <option value="currentlyReading">Currently reading</option>
                <option value="wantToRead">Want to read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </optgroup>
            </select>
          </div>
        </div>
        <div className='book-title'>{book.title}</div>
        <div className='book-authors'>{book.authors && book.authors.join(', ')}</div>
      </div>
    );
  }
}

export default Book;
