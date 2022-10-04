const webpack = require('webpack');

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },
  pwa: {
    name: 'bswdigital App',
    themeColor: '#894ef9',
    msTileColor: '#894ef9',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#894ef9'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  },
};