import React, { useState, useEffect   } from 'react';
import './styles/Dashboard.css';

function BookSearchResults({ searchResults,onProposeExchange  }) {
    const [page, setPage] = useState(1);
    const booksPerPage = 2; 
    const totalPages = Math.ceil(searchResults.length / booksPerPage);
    const indexOfLastBook = page * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = searchResults.slice(indexOfFirstBook, indexOfLastBook);
    return (
        <div className="book-search-results">
            <h2>Search Results</h2>
            {searchResults.length === 0 ? (
                <p>No books found.</p>
            ) : (
                <div>
                <table className="book-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Availability</th>
                            <th>Condition</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBooks.map((book, index) => (
                            <tr key={index} className="book-item">
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>{book.availability ? 'Yes' : 'No'}</td>
                                <td>{book.condition}</td>
                                <td>{book.location}</td>
                                <td>
                                    <button
                                        className="button propose-exchange-button"
                                        onClick={() => onProposeExchange(book.id)}
                                    >
                                        Propose Exchange
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="page-number">                        
                    <span className="page-info">
                            Page {page} of {totalPages}
                    </span>
                </div>
                <div className="pagination-buttons">
                        <button 
                            className="button pagination-button" 
                            onClick={() => setPage(page - 1)} 
                            disabled={page <= 1}
                        >
                            Previous
                        </button>
                        <button 
                            className="button pagination-button" 
                            onClick={() => setPage(page + 1)} 
                            disabled={page >= totalPages}
                        >
                            Next
                        </button>
                    </div>
            </div>
            )}
        </div>
    );
}

export default BookSearchResults;
