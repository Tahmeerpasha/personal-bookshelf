// src/pages/BookShelf.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookDetails from './BookDetails';

const BookShelf = () => {
    const [bookshelf, setBookshelf] = useState([]);

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
        setBookshelf(storedBooks);
    }, []);

    const removeFromBookshelf = (key) => {
        const updatedBooks = bookshelf.filter((book) => book.key !== key);
        setBookshelf(updatedBooks);
        localStorage.setItem('bookshelf', JSON.stringify(updatedBooks));
    };

    return (
        <div className='shelf'>
            <h1>My Bookshelf</h1>
            <Link to="/">Back to Search</Link>
            <div>
                {bookshelf.map((book) => (
                    <div key={book.key}>
                        <BookDetails book={book} isRemove={true} buttonFunction={removeFromBookshelf} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookShelf;
