import React, { useState } from 'react';
import './styles/Dashboard.css';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const FilterOptions = ({ onApplyFilters }) => {
    const [filters, setFilters] = useState({
        availability: '',
        condition: '',
        genre: '',
        location: ''
    });
    const [filtersApplied, setFiltersApplied] = useState(false); 
    const [appliedFilters, setAppliedFilters] = useState({});
    const options = countryList().getData();
    const handleLocationChange = (selectedOption) => {
        setFilters({
            ...filters,
            location: selectedOption ? selectedOption.label : ''
        });
    };

    const handleApplyFilters = () => {
        const updatedFilters = {
            ...filters,
            availability: filters.availability === "Yes" ? true : filters.availability === "No" ? false : ''
        };
        onApplyFilters(updatedFilters);
        setAppliedFilters(filters);
        setFiltersApplied(true);
        setFilters({ availability: '', condition: '', genre: '', location: '' });
    };

    return (
        <div className="filter-options">
            <div className="filter-group">
            <label className="filter-label">Availability:</label>
            <select className="filter-select"
                    value={filters.availability}
                    onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                >
                    <option value="">Select Availability</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            <div className="filter-group">
            <label className="filter-label">Condition:</label>
            <select className="filter-select" value={filters.condition} onChange={(e) => setFilters({ ...filters, condition: e.target.value })}>
                    <option value="">Select Condition</option>
                    <option value="Good">Good</option>
                    <option value="Bad">Bad</option>
                    <option value="Poor">Poor</option>
                    <option value="Fine">Fine</option>
                    <option value="New">New</option>
                    <option value="Old">Old</option>
                </select>
            </div>
            <div className="filter-group">
            <label className="filter-label">Genre:</label>
            <select className="filter-select"
                    value={filters.genre}
                    onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
                >
                    <option value="">Select Genre</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Horror">Horror</option>
                    <option value="Science">Science</option>
                    <option value="Autobiography">Autobiography</option>
                </select>
            </div>
            <div className="filter-group">
            <label className="filter-label">Location:</label>
                <Select
                    options={options}
                    value={options.find((option) => option.label === filters.location)}
                    onChange={handleLocationChange}
                    placeholder="Select Country"
                />
            </div>
            <button className="button apply-filter-button" onClick={handleApplyFilters}>Apply Filters</button>

            {filtersApplied && (
                <div className="applied-filters">
                    <h3>Applied Filters:</h3>
                    
                        <strong>Availability:</strong> {appliedFilters.availability || "None"}
                        <strong>Condition:</strong> {appliedFilters.condition || "None"}
                        <strong>Genre:</strong> {appliedFilters.genre || "None"}
                        <strong>Location:</strong> {appliedFilters.location || "None"}
                </div>
            )}
        </div>
        
    );
};

export default FilterOptions;
