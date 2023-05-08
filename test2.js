const axios = require("axios");
const contrib = require("blessed-contrib");
const blessed = require("blessed");

// Create a new blessed screen
const screen = blessed.screen({
  smartCSR: true,
});

// Create a box to contain the menu and data
const box = blessed.box({
  width: "100%",
  height: "100%",
  style: {
    fg: "white",
    bg: "blue",
  },
});

// Create a menu to display the options
const menu = blessed.listbar({
  parent: box,
  top: 0,
  left: 0,
  right: 0,
  height: 1,
  style: {
    bg: "green",
  },
  keys: true,
  autoCommandKeys: true,
  commands: {
    "Option 1": {
      keys: ["1"],
      callback: async () => {
        const response = await axios.get("http://localhost:4000/data/1");
        dataBox.setContent(response.data);
        screen.render();
      },
    },
    "Option 2": {
      keys: ["2"],
      callback: async () => {
        const response = await axios.get("http://localhost:4000/data/2");
        dataBox.setContent(response.data);
        screen.render();
      },
    },
    "Option 3": {
      keys: ["3"],
      callback: async () => {
        const response = await axios.get("http://localhost:4000/data/3");
        dataBox.setContent(response.data);
        screen.render();
      },
    },
  },
});

// Create a box to display the data
const dataBox = blessed.box({
  parent: box,
  top: 1,
  left: 0,
  right: 0,
  bottom: 0,
  scrollable: true,
  alwaysScroll: true,
  scrollbar: {
    style: {
      bg: "white",
    },
  },
  style: {
    fg: "white",
    bg: "blue",
  },
});

// Append the box to the screen and focus on the menu
screen.append(box);
menu.focus();

// Handle key presses to exit the program
screen.key(["escape", "q", "C-c"], () => {
  process.exit(0);
});

// Render the screen
screen.render();
