const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const Manifest = require('./manifest.json');

const ServiceWorker = new WorkboxPlugin.GenerateSW({
     exclude: [/\.(?:png|jpg|jpeg|svg)$/],
     swDest: 'sw.js',
     runtimeCaching: [
          {
               // Match any request that ends with .png, .jpg, .jpeg or .svg.
               urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

               // Apply a cache-first strategy.
               handler: 'CacheFirst',

               options: {
                    // Use a custom cache name.
                    cacheName: 'images',

                    // Only cache 10 images.
                    expiration: {
                         maxEntries: 10,
                    },
               },
          },
     ],
});

/** @type {import('webpack').Configuration} */
const config = {
     devServer: {
          contentBase: '/dist',
          port: 5000,
     },
     entry: {
          main: path.resolve(__dirname, 'src', 'main.ts'),
     },
     output: {
          path: path.resolve(__dirname, 'dist'),
          publicPath: '/',
          filename: '[name].bundle-[hash].js',
          chunkFilename: '[name].[hash].js',
     },
     plugins: [
          ServiceWorker,
          new MiniCssExtractPlugin({
               filename: 'styles/[name].css',
               chunkFilename: '[id].css',
          }),
          new HtmlWebpackPlugin({
               template: path.join(__dirname, 'src/pages/index.html'),
               filename: 'index.html',
          }),
          new WebpackPwaManifest(Manifest),
     ],
     module: {
          rules: [
               {
                    test: /\.html/,
                    use: ['html-loader'],
               },
               {
                    test: /\.ts/,
                    use: ['ts-loader'],
                    exclude: /node_modules/,
               },
               {
                    test: /\.(svg|png|jpe?g|gif)$/,
                    use: {
                         loader: 'file-loader',
                         options: {
                              name: '[name].[ext]',
                              outputPath: 'assets',
                         },
                    },
               },
               {
                    test: /\.(eot|ttf|woff2?)$/,
                    use: {
                         loader: 'file-loader',
                         options: {
                              name: 'fonts/[name].[ext]',
                              outputPath: 'assets',
                         },
                    },
               },
          ],
     },
     resolve: {
          alias: {
               '@': path.resolve(__dirname, 'src'),
               '@C': path.resolve(__dirname, '..', 'server/src/config.ts'),
          },
     },
};

const diff = {
     sass: {
          production: {
               test: /\.s(c|a)ss$/,
               loaders: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
               ],
          },
          development: {
               test: /\.s(c|a)ss$/,
               loaders: ['style-loader', 'css-loader', 'sass-loader'],
          },
     },
     css: {
          production: {
               test: /\.css$/,
               loaders: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
          development: {
               test: /\.css$/,
               loaders: ['style-loader', 'css-loader'],
          },
     },
};
module.exports = function (env, argv) {
     config.module.rules.push(diff.sass[argv.mode]);
     config.module.rules.push(diff.css[argv.mode]);

     return config;
};
