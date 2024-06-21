import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL

export const db = new Pool({   
    allowExitOnIdle: true,
    connectionString
})

    try {
        await db.query('SELECT NOW()');
        console.log('DATABASE CONNECTED');
    } catch (error) {
        console.error(error);
    }