import React from 'react'

const BookDetails = ({ book, isRemove, buttonFunction }) => {
    return (
        <>
            <div>
                {console.log(book)}
                <p><span>Book Title:</span> {book.title}</p>
                <p><span>Edition count:</span>{book.edition_count}</p>
            </div>
            {isRemove ?
                <button onClick={() => buttonFunction(book.key)}>Remove</button> :
                <button onClick={() => buttonFunction(book)}>Add to Bookshelf</button>
            }
        </>
    )
}

export default BookDetails