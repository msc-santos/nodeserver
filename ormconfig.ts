import "dotenv/config";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  name: "default",
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    __dirname + "/src/model/**/*.ts",
    __dirname + "/dist/model/**/*.js",
  ],
  synchronize: true,
  logging: false,
});
