import express from 'express';
import dotenv from 'dotenv';
import DbHelper from './dbHelper.js'

dotenv.config();

const app = express();
const port = process.env.PORT;

const db = new DbHelper();
await db.getRecords();

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
