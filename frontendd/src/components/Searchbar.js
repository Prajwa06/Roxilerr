import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addinput } from '../features/inputSlice';
const SearchBar = ({ getBarData,getSalesData,getTransactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch=useDispatch();
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);

  };
// on each submit calls api and update the data  and dispatch input to redux store
  const handleFormSubmit = (event) => { 
    event.preventDefault();
    dispatch(addinput(searchTerm));
    getSalesData();
    getBarData();
    getTransactions();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex items-center border border-gray-300 rounded-md">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          className="py-2 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1"
        />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
