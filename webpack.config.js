const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const { EnvironmentPlugin } = require('webpack');




module.exports = (env, argv) => {


  console.log('mode: ', JSON.stringify(env));
  
  let variablePath;
  

  if (env.production) {
    variablePath = '.production.env';
  
  }
  else if(env.testing) {
    variablePath = '.testing.env';
  
  } else {
    variablePath = '.development.env'
     
  }
   

  return {

    entry: './src/index.js',

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      //filename: '[name].bundle.js',
      //clean: true,

    },

    // optimization: {
    //   runtimeChunk: 'single',
    //   splitChunks: {
    //     cacheGroups: {
    //       vendor: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name: 'vendors',
    //         chunks: 'all'
    //       }
    //     }
        
    //   }
    // },
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
    devtool: 'source-map',

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
        favicon: './src/image/favicon.ico',
        //title: 'Caching'

      }),
      new DotenvWebpackPlugin({
        path: variablePath

      }),
      new EnvironmentPlugin({
        NODE_ENV: argv.mode
      })
    ],
  }
};

