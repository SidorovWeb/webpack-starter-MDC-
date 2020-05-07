const path = require('path');
const fs = require('fs');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

const PATHS = {
    src: path.resolve(__dirname, './app'),
    dist: path.resolve(__dirname, './dist'),
};

const PAGES_DIR = `${PATHS.src}/views/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter((fileName) => fileName.endsWith('.pug'));

module.exports = {
    entry: ['./app/scss/main.scss', './app/js/app.js'],

    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'dist/'),
    },

    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true,
                },
            },

            {
                test: /\.(woff|woff2|eot|ttf)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'fonts/[name].[ext]',
                            useRelativePath: true,
                        },
                    },
                ],
            },

            {
                test: /\.(jpg|gif|png|jpe?g|svg)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name: 'img/[name].[ext]',
                        useRelativePath: true,
                    },
                },
            },

            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env'],
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HardSourceWebpackPlugin(),

        ...PAGES.map(
            (page) =>
                new HtmlWebpackPlugin({
                    template: `${PAGES_DIR}/${page}`,
                    filename: `./${page.replace(/\.pug/, '.html')}`,
                    minify: false,
                })
        ),

        new CopyPlugin([
            { from: path.resolve(__dirname, './app/img'), to: 'img/' },
            { from: path.resolve(__dirname, './app/fonts'), to: 'fonts/' },
        ]),

        new ImageminWebpWebpackPlugin(),
    ],
};
