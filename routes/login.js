const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

// Configure your MySQL database connection.
// IMPORTANT: Update these values with your actual database credentials.
const dbConfig = {
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: '', // Your MySQL password
    database: 'isp360_crm', // The name of your database
};

// POST route for handling login.
app.post('/', async (req, res) => {
    // Extract username and password from the request body.
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    try {
        // Create a connection to the database.
        const connection = await mysql.createConnection(dbConfig);

        // SQL query to find a user with the matching credentials.
        // In a real application, you would compare the hashed password.
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [username, password]
        );
            console.log(rows);
        console.log("Connection established");
        // Close the database connection.
        await connection.end();

        if (rows.length > 0) {
            // User found, login successful.
            res.json({ success: true, message: 'Login successful!' });
        } else {
            // No matching user found.
            res.status(401).json({ success: false, message: 'Invalid username or password.' });
        }
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ success: false, message: 'An error occurred during login.' });
    }
});


module.exports =app;