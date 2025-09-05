import { Pool, QueryResult } from "pg";

export const pool = new Pool({
  host: process.env.POSTGRES_HOST || "db",
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "",
  database: process.env.POSTGRES_DB || "oceans-restaurant",
  port: Number(process.env.POSTGRES_PORT) || 5432,
});

type QueryParams = Array<string | number | boolean | null>;

const query = <T = any>(text: string, params?: QueryParams): Promise<QueryResult<T>> => {
  return pool.query<T>(text, params);
};

export default {
  query,
  pool,
};
