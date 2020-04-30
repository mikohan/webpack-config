const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')



const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'assets/'
}

module.exports = {


    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src
    },
    output: {
        path: PATHS.dist,
        filename: `${PATHS.assets}js/[name].[hash].js`,
        //sourceMapFilename: '[name].[hash:8].map',
        publicPath: '/',
    },

    resolve: {
        alias: {
            '@': PATHS.src,
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loader: {
                        scss: 'vue-style-loader!css-loader-!sass-loader'
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true, config: {
                                path: `./postcss.config.js`
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true, config: {
                                path: `./postcss.config.js`
                            }
                        }
                    }
                ]
            }

        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[hash].css`,
            //chunkFilename: '[id].css'
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img`
            },
            {
                from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts`
            },
            {
                from: `${PATHS.src}/static`, to: ''
            }
        ])
    ]
}