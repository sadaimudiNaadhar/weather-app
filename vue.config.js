const dotenv = require('dotenv');

module.exports = {
  configureWebpack: {
    plugins: [
      new dotenv(),
    ],
  },
};
