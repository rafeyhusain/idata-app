# Express Node.js Application with PostgreSQL Connection Retry

This is a simple Express Node.js application that demonstrates how to retry the connection to a PostgreSQL database every 5 seconds in case of an exception while selecting records from the `contact` table.

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js (v10 or higher)
- PostgreSQL database

## Installation

1. Clone this repository:

```bash
git clone https://github.com/rafeyhusain/idata-app.git
cd idata-app
```

2. Install the dependencies:

```bash
npm install
```

3. Create database
   Create a database named `sample` in PostgresSQL and run `script.sql` using any SQL tool (e.g. `pgAdmin4`)

4. Update PostgreSQL connection string in `.env` file:

```bash
DATABASE_URL=postgres://username:password@localhost:5432/dbname
```

Replace `username`, `password`, `localhost`, `5432`, and `dbname` with your PostgreSQL database credentials.

## Usage

To run the application, execute the following command:

```bash
npm start
```

The application will start the Express server and attempt to connect to the PostgreSQL database using the provided connection string. If the database is unavailable, it will retry the connection every 5 seconds until it successfully connects. If any exceptions occur during the connection process or while selecting records from the `contact` table, they will be logged to the console, and the retry mechanism will be triggered.

### Simulate Failure

In `.env` file, update `DATABASE_URL` to `abc`

```
DATABASE_URL=abc
```

## Sample Output

### Success output

```bash
PS D:\idata-app> node app.js
Server listening on http://localhost:3000
Connected to PostgreSQL database!
Fetched records from contact table [
  { id: 1, first_name: 'John', last_name: 'Doe' },
  { id: 2, first_name: 'Jane', last_name: 'Smith' },
  { id: 3, first_name: 'Michael', last_name: 'Johnson' },
  { id: 4, first_name: 'Emily', last_name: 'Williams' },
  { id: 5, first_name: 'Robert', last_name: 'Brown' }
]
Database connection closed.
```

### Failure output

```bash
PS D:\idata-app> node app.js
Server listening on http://localhost:3000
Error connecting to the database, retry in 5000ms. Error=[getaddrinfo ENOTFOUND base]. ConnectionString=[postgres//postgres:Sila.1009@localhost:5432/sample]
Error connecting to the database, retry in 5000ms. Error=[getaddrinfo ENOTFOUND base]. ConnectionString=[postgres//postgres:Sila.1009@localhost:5432/sample]
Error connecting to the database, retry in 5000ms. Error=[getaddrinfo ENOTFOUND base]. ConnectionString=[postgres//postgres:Sila.1009@localhost:5432/sample]
```

## Credits

This application uses the following npm packages:

- [Express](https://expressjs.com/) - Fast,
  unopinionated, minimalist web framework for Node.js

- [pg](https://www.npmjs.com/package/pg) - Non-blocking
  PostgreSQL client for Node.js

- [dotenv](https://www.npmjs.com/package/dotenv) -
  Zero-dependency module for loading environment variables from a .env
  file

## Author

Written by [Rafey](https://github.com/rafeyhusain).

Feel free to contribute, report issues, or make suggestions! 😊
