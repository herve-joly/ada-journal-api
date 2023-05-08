const request = require("supertest");
const app = require("../../index");
const { Sequelize, sequelize, User, Journal, Text } = require("../../db/index");

describe("API routes", () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await User.sync({ force: true });
    // create some test data before running the tests
    await User.bulkCreate([
      {
        username: "testuser1",
        password: "password123",
      },
      {
        username: "testuser2",
        password: "password456",
      },
    ]);

    await Journal.bulkCreate([
      {
        title: "Test Journal 1",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userId: 1,
      },
      {
        title: "Test Journal 2",
        content:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        userId: 2,
      },
    ]);

    await Text.bulkCreate([
      {
        title: "Test Text 1",
        content:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        userId: 1,
      },
      {
        title: "Test Text 2",
        content:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        userId: 2,
      },
    ]);
  });

  afterAll(async () => {
    // clean up test data after running the tests
    await User.destroy({ where: {} });
    await Journal.destroy({ where: {} });
    await Text.destroy({ where: {} });
    await sequelize.close();
  });

  describe("GET /", () => {
    it("should respond with HTML", async () => {
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/html/);
      expect(response.text).toContain("<h1>Welcome to the API</h1>");
    });
  });

  describe("User routes", () => {
    describe("GET /api/users", () => {
      it("should respond with JSON", async () => {
        await User.create({
          username: "testuser1",
          password: "test",
        });
        const response = await request(app).get("api/users");
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].username).toBe("testuser1");
      });
    });

    it("should respond with a 404 error for non-existent user", async () => {
      const response = await request(app).get("/api/users/user/999");
      expect(response.status).toBe(404);
    });

    describe("POST /api/users/user", () => {
      it("should create a new user", async () => {
        const response = await request(app)
          .router.post("/api/users/user")
          .send({
            username: "newuser",
            password: "password789",
          });
        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body.username).toBe("newuser");

        // verify that the user was actually added to the database
        const newUser = await User.findOne({ where: { username: "newuser" } });
        expect(newUser).not.toBeNull();
      });

      it("should respond with a 400 error if username or email already exists", async () => {
        const response = await request(app).post("/api/users/user").send({
          username: "testuser1",
          password: "password789",
        });
        expect(response.status).toBe(400);
      });
    });
  });
});
