const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Your entry point for your app
  entry: './src/index.js',
  // The output for your bundles
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // This section is for your loaders
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Add other rules for different file types as needed
    ],
  },
  // Plugins you are using
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  // DevServer configuration
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Where to serve static files from
    },
    compress: true, // Enable gzip compression for everything served
    port: 3000, // Port to run the server on
    open: true, // Open the browser after server had been started
    historyApiFallback: true, // Fallback to /index.html for Single Page Applications
    proxy: {
      '/': {
        target: 'http://localhost:3000', // Proxy to your API server
        changeOrigin: true,
      },
    },
    hot: true, // Enable webpack's Hot Module Replacement feature
  },
};
