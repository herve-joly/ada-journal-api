const { sequelize, Text } = require("../../db/index");

describe("Text model", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await Text.destroy({ where: {} });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a new text", async () => {
    const text = await Text.create({
      title: "Test Title",
      text: "Test Text",
    });
    expect(text.id).toBe(1);
    expect(text.title).toBe("Test Title");
    expect(text.text).toBe("Test Text");
  });

  it("should get all texts", async () => {
    await Text.bulkCreate([
      {
        title: "Text 1",
        text: "Text 1 content",
      },
      {
        title: "Text 2",
        text: "Text 2 content",
      },
    ]);
    const texts = await Text.findAll();
    expect(texts.length).toBe(2);
    expect(texts[0].title).toBe("Text 1");
    expect(texts[1].text).toBe("Text 2 content");
  });

  it("should update an existing text", async () => {
    const text = await Text.create({
      title: "Test Title",
      text: "Test Text",
    });
    const updatedText = await text.update({
      text: "Updated Test Text",
    });
    expect(updatedText.text).toBe("Updated Test Text");
  });

  it("should delete an existing text", async () => {
    const text = await Text.create({
      title: "Test Title",
      text: "Test Text",
    });
    await text.destroy();
    const deletedText = await Text.findOne({ where: { id: text.id } });
    expect(deletedText).toBeNull();
  });
});
