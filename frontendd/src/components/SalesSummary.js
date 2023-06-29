import React from 'react';
import { selectmonth } from '../features/monthSlice';
import {useSelector} from 'react-redux';
const SalesSummary = ({ totalSaleAmount, totalSoldItems, totalNotSoldItems }) => {
  let month=useSelector(selectmonth);
  if(!month){
    month='January';
  }
  
  return (

    <div className="bg-gray-100 p-4 rounded-lg shadow-md my-2">
      <h2 className="text-lg font-bold mb-2">Sales Summary:  {month}</h2>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600">Total Sale Amount:</span>
        <span className="text-green-600 font-bold">${totalSaleAmount}</span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600">Total Sold Items:</span>
        <span className="text-blue-600 font-bold">{totalSoldItems}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-600">Total Not Sold Items:</span>
        <span className="text-red-600 font-bold">{totalNotSoldItems}</span>
      </div>
    </div>
  );
};

export default SalesSummary;
