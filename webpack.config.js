/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { HashedModuleIdsPlugin } = require('webpack');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const styledComponentsTransformer = createStyledComponentsTransformer();

function createEntryPoint(env, nodeEnv) {
  if (nodeEnv === 'development') {
    switch (env) {
      case 'login':
        return ['core-js/stable', 'regenerator-runtime/runtime', './src/LOGIN/index.tsx'];
      case 'elk':
        return ['core-js/stable', 'regenerator-runtime/runtime', './src/ELK/index.tsx'];
      default:
        return {
          vendor: ['styled-components'],
          login: ['core-js/stable', 'regenerator-runtime/runtime', './src/LOGIN/index.tsx'],
          tariffs: ['core-js/stable', 'regenerator-runtime/runtime', './src/TARIFFS/index.tsx'],
          cabinet: ['core-js/stable', 'regenerator-runtime/runtime', './src/ELK/index.tsx'],
        };
    }
  } else {
    return {
      vendor: ['styled-components'],
      tariffs: ['core-js/stable', './src/TARIFFS/index.tsx'],
      login: ['core-js/stable', './src/LOGIN/index.tsx'],
      cabinet: ['core-js/stable', './src/ELK/index.tsx'],
    };
  }
}
const ENTRY_POINT = createEntryPoint(process.env.PROJECT_ENV, process.env.NODE_ENV);

module.exports = (_env, argv) => {
  const { mode } = argv;

  return {
    devtool: mode !== 'development' ? false : 'source-map',
    entry: ENTRY_POINT,
    output: {
      filename: '[name].js',
      path:
        process.env.PROJECT_ENV === 'prod'
          ? path.resolve(__dirname, 'dist', 'production')
          : path.resolve(__dirname, 'dist', 'development'),
      libraryTarget: 'var',
      library: ['elk', '[name]'],
      publicPath: '/',
    },
    optimization: {
      runtimeChunk: {
        name: 'vendor',
      },
      splitChunks: {
        name: 'vendor',
        minChunks: Infinity,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            name: 'vendor',
            enforce: true,
          },
        },
      },
      minimize: mode !== 'development',
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            parse: {
              ecma: 8,
            },
            mangle: { safari10: true },
            output: {
              ecma: 5,
              safari10: true,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          sourceMap: true,
          cache: true,
        }),
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      compress: true,
      quiet: true,
      hot: true,
      publicPath: '/',
      proxy: {
        '/account': {
          target: 'http://localhost:8000',
          bypass: function (req) {
            if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
              console.log('Skipping proxy for browser request.');
              return '/account.html';
            }
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx$/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader: 'eslint-loader',
          options: {
            configFile: '.eslintrc',
            cache: false,
            fix: true,
          },
        },
        {
          test: /\.tsx$/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader: 'stylelint-custom-processor-loader',
        },
        {
          test: /\.tsx$/,
          exclude: /node_modules/,
          enforce: 'post',
          use: ['babel-loader?cacheDirectory=true'],
        },
        {
          test: /\.tsx$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          enforce: 'post',
          options: {
            getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
          },
        },
        {
          test: /\.(jpe?g|png|webp|gif|svg|ico)$/i,
          enforce: 'post',
          use: [
            'cache-loader',
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                fallback: 'file-loader?name="[path][name].[ext]"',
              },
            },
            {
              loader: 'img-loader',
              options: {
                plugins: [
                  require('imagemin-pngquant')({
                    floyd: 0.5,
                    speed: 2,
                  }),
                  require('imagemin-svgo')({
                    plugins: [{ removeTitle: true }, { convertPathData: false }],
                  }),
                ],
              },
            },
          ],
        },
        {
          test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          enforce: 'post',
          loader: 'url-loader',
        },
        {
          test: /\.(ttf|eot)(\?[\s\S]+)?$/,
          enforce: 'post',
          loader: 'file-loader',
        },
        {
          test: /\.html$/,
          enforce: 'post',
          loader: 'html-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
        'styled-components': path.resolve(__dirname, 'node_modules', 'styled-components'),
      },
    },
    performance: {
      maxAssetSize: 900000,
      maxEntrypointSize: 800000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new ScriptExtHtmlWebpackPlugin({
        prefetch: /\.js$/,
        defaultAttribute: 'async',
      }),
      new HashedModuleIdsPlugin({
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20,
      }),
      new HardSourceWebpackPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          PROJECT_ENV: JSON.stringify(process.env.PROJECT_ENV),
        },
      }),
    ],
  };
};
