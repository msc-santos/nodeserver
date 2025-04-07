import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { AppDataSource } from "../ormconfig";
import { UserController } from "./controller/UserController";

useContainer(Container);

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Database connection initialized successfully!");
    const app = createExpressServer({
      controllers: [UserController],
    });

    app.listen(3000, () => {
      console.log("🚀 Server running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("❌ Error during Data Source initialization:", error);
  });
