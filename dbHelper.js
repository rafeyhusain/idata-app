import pkg from 'pg';
const { Client } = pkg;

export default class DbHelper {
    constructor() {
        this.dbConfig = {
            connectionString: process.env.DATABASE_URL,
        };
    }

    // Query database and retry if connection fails
    async queryDb(query, callback) {
        let result;

        try {
            const dbClient = new Client(this.dbConfig);
            await dbClient.connect();
            console.log('Connected to PostgreSQL database!');

            // run query
            result = await dbClient.query(query);

            callback(result)

            // Close the database connection
            await dbClient.end();
            console.log('Database connection closed.');
        } catch (err) {
            console.error(`Error connecting to the database, retry in ${process.env.RETRY_INTERVAL}ms. Error=[${err.message}]. ConnectionString=[${this.dbConfig.connectionString}]`);

            // Retry the connection after specified interval
            setTimeout(() => {
                this.queryDb(query, callback)
            }, process.env.RETRY_INTERVAL);
        }
    };

    async getRecords() {
        // Select records from the contact table
        await this.queryDb('SELECT * FROM "contact"', (result) => {
            console.log(`Fetched records from contact table`, result.rows);
        });
    }
}
