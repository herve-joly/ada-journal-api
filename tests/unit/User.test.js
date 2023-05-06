const { sequelize, Sequelize, User } = require("../../db");

describe("User model", () => {
  beforeAll(async () => {
    // Connect to the database before running tests
    await User.sync({ force: true });
  });

  afterAll(async () => {
    // Disconnect from the database after running tests
    await User.destroy({ where: {} });
    await sequelize.close();
  });
  it("should initialize Sequelize with the correct options", () => {
    expect(sequelize.options.dialect).toEqual("sqlite");
    expect(sequelize.options.storage).toContain("db.sqlite");
  });
  it("should create a new user", async () => {
    const user = await User.create({
      username: "John Doe",
      password: "test",
    });
    expect(user.id).toBeDefined();
    expect(user.username).toEqual("John Doe");
  });
  it("should export the Sequelize object", () => {
    expect(Sequelize).toBeDefined();
  });
});
