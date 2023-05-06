const { sequelize, Sequelize, User, Journal, Text } = require("../../db");

describe("Text model", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await Journal.destroy({ where: {} });
    await User.destroy({ where: {} });
    await Text.destroy({ where: {} });
    await sequelize.close();
  });

  it("should create a text", async () => {
    const user = await User.create({
      username: "Jeff Doe",
      password: "test",
    });

    const journal = await Journal.create({
      title: "My Journal 2",
      ownerId: user.id,
      journalId: journal.id, // set the journalId field explicitly
    });

    const text = await Text.create({
      title: "My Journal 2",
      journalId: journal.id, // set the journalId field explicitly
      ownerId: user.id,
    });

    expect(text.id).toBeDefined();
    expect(user.username).toEqual("Jeff Doe");
    expect(journal.title).toBe("My Journal 2");
    expect(text.title).toBe("My Journal 2");

    // check if the journal belongs to the user

    expect(text.ownerId).toBe(user.id);
    expect(text.journalId).toBe(journal.id);
  });
});
