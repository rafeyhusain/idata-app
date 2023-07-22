const express = require('express');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const dbConfig = {
    connectionString: process.env.DATABASE_URL,
};

// Function to query database and retry if connection fails
const queryDb = async (query) => {
    try {
        const dbClient = new Client(dbConfig);
        await dbClient.connect();
        console.log('Connected to PostgreSQL database!');

        // run query
        const result = await dbClient.query(query);
        console.log(`Fetched records from contact table`, result.rows);

        // Close the database connection
        await dbClient.end();
        console.log('Database connection closed.');
    } catch (err) {
        console.error(`Error connecting to the database, retry in ${process.env.RETRY_INTERVAL}ms. Error=[${err.message}]. ConnectionString=[${dbConfig.connectionString}]`);

        // Retry the connection after specified interval
        setTimeout(queryDb, process.env.RETRY_INTERVAL);
    }
};

// Select records from the User table
queryDb('SELECT * FROM "contact"');

// Define your routes and other middleware here
app.get('/', (req, res) => {
    res.send('Hello from iData!');
});

// Handle any unhandled routes
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
