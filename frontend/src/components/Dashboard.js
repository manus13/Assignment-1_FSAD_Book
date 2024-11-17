import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Dashboard.css';
import BookSearchResults from './BookSearchResults'; 
import FilterOptions from './FilterOptions';
import countryList from 'react-select-country-list';



const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', condition: '', availability: '', location: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState({ title: '', author: '', genre: '', condition: '', availability: '', location: '' });
    const [searchCriteria, setSearchCriteria] = useState({
        author: '',
        title: '',
        availability: '',
        condition: '',
        location: ''
    });
    const [searchResults, setSearchResults] = useState([]); 
    const [isEditing, setIsEditing] = useState(false); 
    const [editBookId, setEditBookId] = useState(null); 
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filters, setFilters] = useState({
        condition: '',
        genre: '',
        location: '',
    });
    
    // Fetch books based on search criteria
    const fetchBooks = async (page = 1) => {
        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.get(`http://localhost:5000/api/books`, {
                headers: { Authorization: `Bearer ${token}` }, 
                params: { ...searchParams }

            });
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);
    const options = countryList().getData();

    const handleAddBook = async () => {
            if (!newBook.location) {
                alert('Please select a location.');
                return; 
            }
        try {
            const availabilityBoolean = newBook.availability.toLowerCase() === 'yes'; 
            const bookData = {...newBook, availability: availabilityBoolean};
            const response = await axios.post('http://localhost:5000/api/books', bookData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setBooks([...books, response.data]);
            setNewBook({ title: '', author: '', genre: '', condition: '', availability: '', location: '' });
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/books/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setBooks(books.filter(book => book._id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleEditBook = (id) => {
        const bookToEdit = books.find((book) => book._id === id);
        setNewBook(bookToEdit);
        setIsEditing(true);
        setEditBookId(id);
    };
    
    const handleSaveEdit = async () => {
        try {
            const availabilityBoolean = newBook.availability.toLowerCase() === 'yes'; 
            const updatedBookData = { ...newBook, availability: availabilityBoolean };
            const response = await axios.put(`http://localhost:5000/api/books/${editBookId}`, updatedBookData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setBooks(books.map((book) => (book._id === editBookId ? response.data : book)));
            setIsEditing(false);
            setNewBook({ title: '', author: '', genre: '', condition: '', availability: '',location: '' });
        } catch (error) {
            console.error('Error saving edited book:', error);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); 
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria({ ...searchCriteria, [name]: value });
    };
    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const queryParams = new URLSearchParams(searchCriteria);
            const response = await axios.get(`http://localhost:5000/api/books/search-books`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { keyword: searchKeyword }

            });
            setSearchResults(response.data); 

        } catch (error) {
            console.error('Error searching for books:', error);
        }
    };    

    const handleInputChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };
    const handleApplyFilters = (filters) => {
        const filteredResults = searchResults.filter((book) => {
            return (
                (filters.availability === '' || book.availability === (filters.availability === 'Yes')) &&
                (!filters.condition || book.condition === filters.condition) &&
                (!filters.genre || book.genre === filters.genre) &&
                (!filters.location || (book.location && book.location.includes(filters.location)))
            );
        });
        setSearchResults(filteredResults);
        setFilters({ availability: '', genre: '', condition: '', location: '' });

    };
    const handleProposeExchange = (bookId) => {
            alert(`Exchange proposal for book ID: ${bookId} - Feature coming soon!`);

    };

      const [showFilters, setShowFilters] = useState(false); 

  const toggleFilters = () => {
    setShowFilters((prevState) => !prevState); 
  };


    return (
        <div className="dashboard-container">
            <h1>Book Exchange Dashboard</h1>

            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <div className="dashboard-main-content">
            <div className="form-container">
            <h2>{isEditing ? "Edit Book" : "Add a Book"}</h2>
            <div className="input-group">
            <label htmlFor="bookTitle">Book Title:</label>
            <input
                    type="text"
                    id="bookTitle" 
                    name="bookTitle"
                    placeholder="Title"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                />
                
                <label htmlFor="bookAuthor">Author:</label>
                <input
                    type="text"
                    id="bookAuthor"
                    name="bookAuthor"
                    placeholder="Author"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                />
                <label htmlFor="bookGenre">Genre:</label>
                <input
                    type="text"
                    id="bookGenre"
                    name="bookGenre"
                    placeholder="Genre"
                    value={newBook.genre}
                    onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                />
                 <label htmlFor="bookCondition">Condition:</label>
                <input
                    type="text"
                    id="bookCondition"
                    name="bookCondition"
                    placeholder="Condition"
                    value={newBook.condition}
                    onChange={(e) => setNewBook({ ...newBook, condition: e.target.value })}
                />
                <label htmlFor="bookAvailability">Availability:</label>
                <input
                    type="text"
                    id="bookAvailability"
                    name="bookAvailability"
                    placeholder="Availability"
                    value={newBook.availability}
                    onChange={(e) => setNewBook({ ...newBook, availability: e.target.value })}
                />
                <label htmlFor="location">Location:</label>
                <select 
                id="location"
                className="form-input" 
                placeholder="Select a Country"
                value={options.find(option => option.label === newBook.location)?.value || ""}
                onChange={(e) => {const selectedCountry = options.find(option => option.value === e.target.value);
                setNewBook({ ...newBook, location: selectedCountry.label });
                }}            
                >
                    <option className="placeholder" value="">Select a country</option>
                    {options.map((country) => (
                        <option key={country.value} value={country.value}>
                            {country.label}
                        </option>
                    ))}
                    {newBook.location}
                </select>
            </div>

                <button onClick={isEditing ? handleSaveEdit : handleAddBook}>
                    {isEditing ? "Save Changes" : "Add Book"}
                </button>
                {isEditing && <button onClick={() => setIsEditing(false)}>Cancel</button>}
            </div>
            <div className="book-list">
                {books.map((book) => (
                    <div key={book._id} className="book-card">
                        <h3>{book.title}</h3>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p><strong>Condition:</strong> {book.condition}</p>
                        <p><strong>Availability:</strong> {book.availability ? 'Yes' : 'No'}</p>
                        <p><strong>Location:</strong> {book.location}</p>
                        <button onClick={() => handleEditBook(book._id)}>Edit</button>
                        <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
                    </div>
                ))}
            </div>
            </div>
            <div className="search-container">
                <h2>Search for Books</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="search-form">
                        <input type="text" className="search-input" placeholder="Search by title, author, or genre" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                        <button onSubmit={(e) => { e.preventDefault(); handleSearch(); }}className="search-button" type="submit">Search</button>
                    </form>
                <div>
                    <button onClick={toggleFilters}>
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>          
                        {showFilters && (
                    <FilterOptions 
                        filters={filters} 
                        setFilters={setFilters} 
                        onApplyFilters={handleApplyFilters} />
                        )}
                </div>
            </div>
            <div className="search-results">
                <div>
                <BookSearchResults searchResults={searchResults} onProposeExchange={handleProposeExchange}/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;