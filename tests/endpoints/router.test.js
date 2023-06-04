const request = require("supertest");
const app = require("../../src/index");
const {
  Sequelize,
  sequelize,
  User,
  Journal,
  Text,
} = require("../../src/db/index");

describe("API routes", () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
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
        OwnerId: 1,
      },
      {
        title: "Test Journal 2",
        content:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        OwnerId: 2,
      },
    ]);

    await Text.bulkCreate([
      {
        title: "Test Text 1",
        content:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        OwnerId: 1,
        JournalId: 1,
      },
      {
        title: "Test Text 2",
        content:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        OwnerId: 2,
        JournalId: 2,
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
      expect(response.text).toContain("Welcome! \nPlease login");
    });
  });

  describe("User routes", () => {
    describe("POST /users/user", () => {
      it("should create a new user", async () => {
        const response = await request(app).post("/register").send({
          username: "newuser",
          password: "password789",
        });
        expect(response.status).toBe(200);
        expect(response.text).toBe("success");

        // verify that the user was actually added to the database
        const newUser = await User.findOne({ where: { username: "newuser" } });
        expect(newUser).not.toBeNull();
      });

      it("should respond with a 400 error if username already exists", async () => {
        const response = await request(app).post("/register").send({
          username: "newuser",
          password: "password79",
        });
        expect(response.status).toBe(500);
      });
    });
  });
});
