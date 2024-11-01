import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { load } from "https://deno.land/std@0.177.0/dotenv/mod.ts";

const env = await load();

const config = {
  user: env.DATABASE_USER,
  database: env.DATABASE_NAME,
  hostname: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  password: env.DATABASE_PASSWORD,
};

const client = new Client(config);

async function connectDB() {
  await client.connect();
  console.log("Success connect to Postgres Database");
}

async function disconnectDB() {
  await client.end();
  console.log("Disconnected from the database");
}

// Create table if blogs doesn't exist
async function createTable() {
  try {
    await client.queryObject(`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      `);
  } catch (e) {
    console.error(e);
  }

  console.log("Ensured 'blogs' table exists");
}

await connectDB();

export { client, connectDB, createTable, disconnectDB };
