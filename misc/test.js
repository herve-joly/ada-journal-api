const axios = require("axios");
const blessed = require("blessed");
const contrib = require("blessed-contrib");

const screen = blessed.screen({
  smartCSR: true,
  title: "ADA Journal API",
});

// Set up a grid for layout purposes
const grid = new contrib.grid({
  rows: 2,
  cols: 2,
  screen,
});

// Create a box to display the options menu
const menuBox = grid.set(0, 0, 1, 1, blessed.box, {
  label: " Options ",
  border: {
    type: "line",
  },
});

// Create a box to display the response data
const responseBox = grid.set(1, 0, 1, 2, blessed.box, {
  label: " Response Data ",
  border: {
    type: "line",
  },
});

// Create a line menu for the options
const menuItems = [
  { key: "1", value: "List all journal entries" },
  { key: "2", value: "List all authors" },
  { key: "3", value: 'List all entries with the word "lorem" in the title' },
];
const menu = blessed.list({
  parent: menuBox,
  items: menuItems.map((item) => item.value),
  keys: true,
  style: {
    selected: {
      bg: "green",
    },
  },
  mouse: true,
});

// Create a function to fetch the data from the API and update the responseBox
const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    responseBox.setContent(JSON.stringify(response.data, null, 2));
    screen.render();
  } catch (error) {
    responseBox.setContent(`Error fetching data: ${error.message}`);
    screen.render();
  }
};

// Set up an event listener for the menu
menu.on("select", async (item, index) => {
  const selectedOption = menuItems[index];
  let apiUrl;
  switch (selectedOption.key) {
    case "1":
      apiUrl = "http://localhost:4000/";
      break;
    case "2":
      apiUrl = "http://localhost:4000/api/user";
      break;
    case "3":
      apiUrl = "http://localhost:4000/entries?title_like=lorem";
      break;
    default:
      responseBox.setContent("Invalid option selected");
      screen.render();
      return;
  }
  fetchData(apiUrl);
});

// Set up a function to quit the program when the Escape key is pressed
screen.key(["escape", "q", "C-c"], function (ch, key) {
  return process.exit(0);
});

// Focus on the menu to start
menu.focus();

// Render the screen
screen.render();
