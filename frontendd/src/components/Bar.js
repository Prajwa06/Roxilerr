import React from "react";



const Bar = ({ height }) => {
  return (
    <div
      className="bg-indigo-500 w-10"
      style={{ height: `${height}px` }}> <span className="pl-4">{height/30 >0 &&height/30}</span></div>
  );
};

export default Bar;