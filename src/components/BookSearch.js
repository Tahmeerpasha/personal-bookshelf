import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import BookDetails from './BookDetails';
import { useDebounce } from '../hooks/useDebounce';

const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const debouncedQuery = useDebounce(query, 500);

    const fetchBooks = useCallback(async () => {
        if (debouncedQuery.length > 0) {
            setLoading(true);
            const response = await fetch(`https://openlibrary.org/search.json?q=${debouncedQuery}&limit=10&page=1`);
            const data = await response.json();
            setResults(data.docs);
            setLoading(false);
        } else {
            setResults([]);
        }
    }, [debouncedQuery]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const addToBookshelf = (book) => {
        const currentBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
        localStorage.setItem('bookshelf', JSON.stringify([...currentBooks, book]));

        setResults(results.filter(result => result.key !== book.key));
    };

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
                <Link to="/bookshelf">
                    <button>My Bookshelf</button>
                </Link>
            </div>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className='card'>
                    {results.map((book) => (
                        <div key={book.key} className='card-item'>
                            <BookDetails book={book} isRemove={false} buttonFunction={addToBookshelf} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BookSearch;
