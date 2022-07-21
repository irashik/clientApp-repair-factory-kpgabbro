const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const { EnvironmentPlugin } = require('webpack');




module.exports = {
  
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
      historyApiFallback: true,
      //host: 'http://localhost',
      //port: '6000',
      

  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      { test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      { test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]

      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      favicon: './src/image/favicon.ico'
    }),
    new DotenvWebpackPlugin({
      path: '.development.env',
        //path: '.production.env'

    }),
    new EnvironmentPlugin({
      NODE_ENV: 'development'
      //NODE_ENV: 'production'
    })
  ],
  
};

