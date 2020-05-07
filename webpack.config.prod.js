const autoprefixer = require('autoprefixer');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');

module.exports = merge(common, {
    mode: 'production',

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },

                    { loader: 'css-loader', options: { sourceMap: false } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()],
                            sourceMap: false,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            webpackImporter: false,

                            sassOptions: {
                                includePaths: ['node_modules'],
                                sourceMap: false,
                            },

                            implementation: require('sass'),
                        },
                    },
                ],
            },
        ],
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                parallel: true,
                sourceMap: true,
            }),
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),

        new CssUrlRelativePlugin(),

        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true,
        }),

        new ImageminPlugin({
            test: /\.(jpe?g|jpg|png|gif|svg)$/i,
            gifsicle: {
                optimizationLevel: 9,
            },
            pngquant: {
                quality: '75',
            },
            plugins: [
                imageminMozjpeg({
                    quality: '75',
                    progressive: true,
                }),
            ],
        }),
    ],
});
