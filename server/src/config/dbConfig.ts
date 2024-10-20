import dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${env}` });

export default {
    username: process.env.PG_USER || 'postgres',
    host: process.env.PG_HOST || 'localhost',
    database: process.env.PG_DB_NAME || 'test',
    password: process.env.PG_PASSWORD || 'test',
    dbPort: 5432,
    dialect: process.env.DIALECT || 'postgres',
};
