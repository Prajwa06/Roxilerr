import React from "react";
import {useSelector} from 'react-redux';
import Bar from "./Bar";
import { selectmonth } from "../features/monthSlice";

const BarChart = ({data}) => {
  let month=useSelector(selectmonth);
  if(!month){
    month='January';
  }

  return (
    <div className="bg-gray-100 rounded-lg shadow-md h-80">
    <h1 className="font-bold p-5 ">BAR CHART STATS:  {month}</h1>
 
     
   
    <div className="flex justify-between items-end pt-16 bg-gray-100 p-4 ">
      {data&& data.map((data) => (
        <div
          key={data.range}
          className="flex flex-col items-center gap-3 sm:gap-2 group cursor-pointer relative">
          <div className="bg-dark-brown text-card-white p-2 rounded-[5px] font-bold group-hover:opacity-100 opacity-0 absolute -top-12 transition-opacity">
            {data.amount}
          </div>
          <Bar
            height={parseInt(data.count * 30)}
          />
          <span className="text-xs">{data.range}</span>
        </div>
      ))}
    </div>
    <div className="flex justify-center -mt-4 pb-5">
    <p className="">Price Range in RS.</p>
    </div>
    
    </div>
  );
};

export default BarChart;