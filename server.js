// A simple Express.js server to handle login requests with a MySQL database.

// You will need to install these packages first:
// `npm install express cors mysql2`

const express = require('express');
// const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies and enable CORS.
// app.use(cors());
app.use(express.json());
const login = require("./routes/login");
app.use("/login",login);


app.set('view engine','ejs');


// Start the server and listen on the specified port.
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Use `Ctrl + C` to stop the server.');
});