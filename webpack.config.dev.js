const autoprefixer = require('autoprefixer');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    devtool: 'cheap-module-eval-source-map',

    mode: 'development',

    devServer: {
        contentBase: './dist',
        inline: true,
        watchContentBase: true,
        host: '0.0.0.0',
        port: 8000,
        overlay: true,

        stats: {
            colors: true,
            modules: false,
            chunks: false,
            chunkGroups: false,
            chunkModules: false,
            env: true,
        },
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',

                    { loader: 'css-loader', options: { sourceMap: true } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()],
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            webpackImporter: false,

                            sassOptions: {
                                includePaths: ['node_modules'],
                                sourceMap: true,
                            },

                            implementation: require('sass'),
                        },
                    },
                ],
            },
        ],
    },

    plugins: [new OpenBrowserPlugin({ url: 'http://localhost:8000' })],
});
