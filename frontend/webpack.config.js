const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  // Other configuration options...
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
};
