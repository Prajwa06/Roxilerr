import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setmonth } from '../features/monthSlice';

export default function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('')
  const dispatch=useDispatch();
  const{getSalesData,getBarData,getTransactions}=props;
  const options = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' },
  ];


  // on each selection fetch api for respective month and update the data and dispatch selected month in redux
  const handleOptionSelect = (option) => {
    setSelectedOption(option.value);
    dispatch(setmonth(option.value));
    getSalesData();
    getBarData();
    getTransactions();
    setIsOpen(false);
  };
  
  return (
    <div className="relative inline-block text-left w-2xl">
    <div className=''>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption : 'Select Month'}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z"
          />
        </svg>
      </button>
    </div>
    {isOpen && (
      <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {options.map((option) => (
            <button
              key={option.value}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
  )
}
