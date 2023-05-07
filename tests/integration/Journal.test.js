const { sequelize, Journal } = require("../../db/index");

describe("Journal model", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // sync the database with the model
  });

  beforeEach(async () => {
    await Journal.destroy({ truncate: true }); // clear the Journal table before each test
  });

  afterAll(async () => {
    await sequelize.close(); // close the database connection after all tests are done
  });

  it("should create a new journal", async () => {
    const newJournal = await Journal.create({
      title: "My first journal",
    });

    expect(newJournal.title).toBe("My first journal");
  });

  it("should not create a journal without a title", async () => {
    expect.assertions(1);

    try {
      await Journal.create({});
    } catch (err) {
      expect(err).toBeTruthy();
    }
  });

  it("should get all journals", async () => {
    await Journal.create({
      title: "Journal 1",
    });

    await Journal.create({
      title: "Journal 2",
    });

    const journals = await Journal.findAll();

    expect(journals.length).toBe(2);
    expect(journals[0].title).toBe("Journal 1");
    expect(journals[1].title).toBe("Journal 2");
  });

  it("should update a journal", async () => {
    const newJournal = await Journal.create({
      title: "My first journal",
    });

    const updatedJournal = await newJournal.update({
      title: "My updated journal",
    });

    expect(updatedJournal.title).toBe("My updated journal");
  });

  it("should delete a journal", async () => {
    const newJournal = await Journal.create({
      title: "My first journal",
    });

    await newJournal.destroy();

    const journals = await Journal.findAll();

    expect(journals.length).toBe(0);
  });
});
