import request from "supertest";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { UserController } from "../src/controller/UserController";
import { AppDataSource } from "../ormconfig";

useContainer(Container);

const app = createExpressServer({
  controllers: [UserController],
});

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("User API", () => {
  let userId: string;

  it("should create a user", async () => {
    const res = await request(app).post("/users").send({
      name: "John Doe",
      email: "john@example.com",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    userId = res.body.id;
  });

  it("should get all users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a user by ID", async () => {
    const res = await request(app).get(`/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", userId);
  });
});
