// src/pages/BookSearch.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookDetails from './BookDetails';

const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query.length > 0) {
            fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`)
                .then((response) => response.json())
                .then((data) => setResults(data.docs));
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <div>
            <div className='nav'>
                <div></div>
                <div className='search'>
                    <h2>Search by book name:</h2>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <Link to="/bookshelf" >
                    <button>My Bookshelf</button>
                </Link>
            </div>
            <div className='card'>
                {results.map((book) => (
                    <div key={book.key} className='card-item'>
                        <BookDetails book={book} isRemove={false} buttonFunction={addToBookshelf} />
                    </div>
                ))}
            </div>
        </div>
    );
}

const addToBookshelf = (book) => {
    const currentBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
    localStorage.setItem('bookshelf', JSON.stringify([...currentBooks, book]));
};

export default BookSearch;
