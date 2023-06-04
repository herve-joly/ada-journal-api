const app = require("./src/index");
const { sequelize } = require("./src/db");

const PORT = 4000;

app.listen(PORT, () => {
  sequelize.sync({ force: false });

  console.log(`Server ready at http://localhost:${PORT}`);
});
