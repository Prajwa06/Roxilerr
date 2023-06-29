require("dotenv").config();
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const username = "prajwaljadhav051";
const password = encodeURIComponent(process.env.password);
const app = express();
const Product = require("./model/ProductModel");
const date = new Date();
const cors = require("cors");
app.use(cors());
// database connection
mongoose.connect(
  `mongodb+srv://${username}:${password}@roxilier.9o5s51g.mongodb.net/`
);
const db = mongoose.connection;
// check connection status
db.once("open", () => {
  console.log("Db is connected");
});




// this function takes month as string and convert it into int from 0-11 jan=0 and dec=11
function convertMonthStringToNumber(monthString) {
    const date = new Date(`2023 ${monthString} 01`); // Assuming a specific year for conversion, you can change it as needed
    const monthNumber = date.getMonth(); // Returns the zero-based month number (0 - January, 11 - December)
    return monthNumber;
  }

// initialising the database and seeding the data from third party api
app.get("/initialise-db", async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const products = response.data;

    // Insert the fetched data into the database
    await Product.insertMany(products);

    res.send("Database initialized successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error initializing the database");
  }
});

app.get("/", (req,res)=>{
  res.send("Backend has Started");
});


//------------------------------------------------------------------------------------------------------
// API to list all transactions with search and pagination
app.get("/transactions/:month", async (req, res) => {
  try {
    const month = req.params.month;
    const perPage = 10;
    let { search, page } = req.query;
    if (!page) {
      page = 1;
    }

    const monthNumber = convertMonthStringToNumber(month);
    // getting all transactions from db
    let transactions = await Product.find();
    // filtering for given month
    let response = transactions.filter(
      (transaction) => transaction.dateOfSale.getMonth() === monthNumber
    );
    // filtering for search if given
    if (search) {
      response = response.filter((product) => {
        if (
          product.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          product.description
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) ||
          product.price
            .toString()
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        ) {
          return product;
        }
      });
    }

    //filtering for page no
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    if (response.length > startIndex) {
      if (endIndex > response.length) {
        response = response.slice(startIndex);
      } else {
        response = response.slice(startIndex, endIndex);
      }
      res.json(response);
    } else {
      res.send("Page does not exist");
    }
  } catch (error) {
    res.send(error);
  }
});



//--------------------------------------------------------------------------------------------------------------------

// Endpoint for statistics
app.get('/statistics/:month', async (req, res) => {
  const month = req.params.month; // Assuming the selected month is passed as a query parameter
    let data=await Product.find();
    const monthNumber = convertMonthStringToNumber(month);
  // Filter the data based on the selected month
  const filteredData =   data.filter(
    (transaction) => transaction.dateOfSale.getMonth() === monthNumber
  );

  // Calculate statistics
  const totalSaleAmount = filteredData.reduce((total, item) => {
     if(item.sold){
    return total + item.price;
     }
     else{
        return total;
     }
  }, 0);

  const totalSoldItems = filteredData.filter((item) => item.sold).length;
  const totalNotSoldItems = filteredData.filter((item) => !item.sold).length;

  // Prepare the response object
  const statistics = {
    totalSaleAmount,
    totalSoldItems,
    totalNotSoldItems,
  };

  // Send the statistics as the response
  res.json(statistics);
});











//----------------------------------------------------------------------------------------------------------------------
// Endpoint for bar chart data
app.get('/barchart/:month', async(req, res) => {
    const month = req.params.month; // Assuming the selected month is passed as a query parameter
    let data=await Product.find();
    const monthNumber = convertMonthStringToNumber(month);
  // Filter the data based on the selected month
  const filteredData =   data.filter(
    (transaction) => transaction.dateOfSale.getMonth() === monthNumber
  );

  
  // Define the price ranges
  const priceRanges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Infinity },
  ];

  // Initialize the count for each price range
  const rangeCounts = priceRanges.map(() => 0);

  // Count the number of items in each price range
  filteredData.forEach((item) => {
    const itemPrice = item.price;
    for (let i = 0; i < priceRanges.length; i++) {
      if (itemPrice >= priceRanges[i].min && itemPrice <= priceRanges[i].max) {
        rangeCounts[i]++;
        break;
      }
    }
  });

  // Prepare the response object
  const barChartData = priceRanges.map((range, index) => {
    return {
      range: `${range.min}-${range.max}`,
      count: rangeCounts[index],
    };
  });

  // Send the bar chart data as the response
  res.json(barChartData);
});


//------------------------------------------------------------------------------------------------------------------------


// Endpoint for pie chart data
app.get('/piechart/:month',async (req, res) => {
    const month = req.params.month; // Assuming the selected month is passed as a query parameter
    let data=await Product.find();
    const monthNumber = convertMonthStringToNumber(month);
  // Filter the data based on the selected month
  const filteredData =   data.filter(
    (transaction) => transaction.dateOfSale.getMonth() === monthNumber
  );

  // Create an object to store the category counts
  const categoryCounts = {};

  // Count the number of items in each category
  filteredData.forEach((item) => {
    const category = item.category;
    if (categoryCounts[category]) {
      categoryCounts[category]++;
    } else {
      categoryCounts[category] = 1;
    }
  });

  // Prepare the response object
  const pieChartData = Object.keys(categoryCounts).map((category) => {
    return {
      category: category,
      count: categoryCounts[category],
    };
  });

  // Send the pie chart data as the response
  res.json(pieChartData);
});


//-------------------------------------------------------------------------------------------------------------

// Endpoint to fetch combined data from multiple APIs
app.get('/combinedData/:month', async (req, res) => {
  try {
    const month = req.params.month; // Assuming the selected month is passed as a query parameter

    // Make requests to the three APIs
    const [piechartResponse, statisticsResponse, barChartDataResponse] = await Promise.all([
      axios.get(`http://localhost:5000/piechart/${month}`),
      axios.get(`http://localhost:5000/statistics/${month}`),
      axios.get(`http://localhost:5000/barchart/${month}`),
    ]);

    // Extract the data from the responses
    const piechartData = piechartResponse.data;
    const statisticsData = statisticsResponse.data;
    const barChartData = barChartDataResponse.data;

    // Combine the data into a single object
    const combinedData = {
      piechart: piechartData,
      statistics: statisticsData,
      barChart: barChartData,
    };

    // Send the combined data as the response
    res.json(combinedData);
  } catch (error) {
    // Handle any errors that occur during the requests
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






// initialising server 
app.listen(5000, () => {
  console.log("Server is running on port 5000 on " + date.toLocaleString());
});

module.exports=app;
