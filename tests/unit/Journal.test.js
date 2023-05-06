const { sequelize, Sequelize, User, Journal } = require("../../db");

describe("Journal model", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await Journal.destroy({ where: {} });
    await User.destroy({ where: {} });
    await sequelize.close();
  });

  it("should create a journal", async () => {
    const user = await User.create({
      username: "Jane Doe",
      password: "test",
    });

    const journal = await Journal.create({
      title: "My Journal",
      UserId: user.id, // set the UserId field explicitly
    });

    expect(user.id).toBeDefined();
    expect(user.username).toEqual("Jane Doe");
    expect(journal.title).toBe("My Journal");

    // check if the journal belongs to the user

    expect(journal.UserId).toBe(user.id);
  });
});
