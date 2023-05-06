const { sequelize, Sequelize } = require("../../db/db");
const { User } = require("../../models/User");

describe("User model", () => {
  beforeAll(async () => {
    // Connect to the database before running tests
    await sequelize.authenticate();
  });

  afterAll(async () => {
    // Disconnect from the database after running tests
    await sequelize.close();
  });

  it("should initialize Sequelize with the correct options", () => {
    expect(sequelize.options.dialect).toEqual("sqlite");
    expect(sequelize.options.storage).toContain("db.sqlite");
    expect(sequelize.options.logging).toBeFalsy();
  });

  it("should export the Sequelize object", () => {
    expect(Sequelize).toBeDefined();
  });

  describe("User model CRUD operations", () => {
    beforeEach(async () => {
      // Reset the database before each test
      await User.sync({ force: true });
    });

    it("should create a new user", async () => {
      const user = await User.create({
        username: "John Doe",
      });
      expect(user.id).toBeDefined();
      expect(user.username).toEqual("John Doe");
    });

    it("should read an existing user", async () => {
      const user = await User.create({
        username: "Jane Doe",
      });
      const result = await User.findOne({ where: { id: user.id } });
      expect(result).toBeDefined();
      expect(result.username).toEqual("Jane Doe");
    });

    it("should update an existing user", async () => {
      const user = await User.create({
        username: "Jack Doe",
      });
      await user.update({ username: "Jackson Doe" });
      const result = await User.findOne({ where: { id: user.id } });
      expect(result).toBeDefined();
      expect(result.username).toEqual("Jackson Doe");
    });

    it("should delete an existing user", async () => {
      const user = await User.create({
        username: "Jim Doe",
      });
      await user.destroy();
      const result = await User.findOne({ where: { id: user.id } });
      expect(result).toBeNull();
    });
  });
});
