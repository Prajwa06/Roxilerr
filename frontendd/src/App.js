import { useState } from 'react';
import './App.css';
import Dropdown from './components/Dropdown';
import axios from "axios";
import Header from './components/Header';
import ProductTable from './components/ProductTable';
import SearchBar from './components/Searchbar';
import SalesSummary from './components/SalesSummary';
import BarChart from './components/BarChart';
import { selectmonth } from './features/monthSlice';
import {useSelector} from 'react-redux';
import { selectinput } from './features/inputSlice';

function App() {

  const[salesData,setSalesDate]=useState('');
  const[barData,setBarData]=useState('');
  const [transactions,setTransactions]=useState('');


  // importing search and month from redux store
  let month=useSelector(selectmonth);
  if(!month){
    month='January';
  }
  let search=useSelector(selectinput);
  if(!search){
    search='';
  };
  

  
  

 // api calls to fetch respective data
   const getSalesData=async()=>{ 
    const res=await axios.get(`http://localhost:5000/statistics/${month}`);
    setSalesDate(res.data);
   }
   const getBarData=async()=>{
    const res=await axios.get(`http://localhost:5000/barchart/${month}`);
    setBarData(res.data);
   }

   const getTransactions=async()=>{
    const res=await axios.get(`http://localhost:5000/transactions/${month}?search=${search}`);
    if(res.data==='Page does not exist'){
      setTransactions([]);
    }else{
    setTransactions(res.data);
    }
 
   }
  

  return (
    <div className="App bg-gray-200 h-full">
     <Header/>
     <div className='flex max-w-xl justify-between my-6 mx-auto'>
        <SearchBar  getSalesData={getSalesData} getBarData={getBarData} getTransactions={getTransactions}/>
        <Dropdown   getSalesData={getSalesData} getBarData={getBarData} getTransactions={getTransactions}/>
     </div>
     <div className="flex mx-24 space-x-10 pb-16" >
     <div className="w-1/2 bg-gray-200 ">
         <SalesSummary {...salesData} />
        `<BarChart data={barData}/>
      </div>
      <div className="w-1/2 overflow-y-auto h-[515px] ">
      
        {transactions?  transactions.length===0?<div>
            <h1 className='mt-5 font-bold text-4xl'>No Result Found</h1>
        </div> :transactions.map((product)=>{
          return(
            <div>
              <ProductTable product={product} />
            </div>
          )
        }):
        <div>
            <h1 className='mt-5 font-bold text-4xl'>Please Select Month for Transactions</h1>
        </div>}
      </div>
      
    </div>
   

   
    
     
    </div>
  );
}

export default App;
