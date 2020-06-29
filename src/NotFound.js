import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = (props) => (
  <div className='list-books-title'>
    <h1>MyReads</h1>
    <h2>Page you are looking for doesn't exist</h2>
    <Link to='/'>Go Back</Link>
  </div>
)

export default NotFound;
