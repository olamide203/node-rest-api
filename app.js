// import packages
const express = require("express");

const port = 8080;
const hostname= "192.168.33.10";
// create an instance of express
const app  = express();

app.get('/', (req, res)=>{
  res.send('We are on home');
});

// set up server to listen
app.listen(port, hostname, ()=>{
  console.log(`server running at http://${hostname}:${port}`);
});