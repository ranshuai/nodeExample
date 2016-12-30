var webpack = require('webpack');
var path = require('path')
var ROOT_PATH = path.resolve(__dirname);
var CSS_PATH = path.resolve(ROOT_PATH,'src','css');
var TEM_PATH = path.resolve(ROOT_PATH,'src','tem');
var JS_PATH = path.resolve(ROOT_PATH,'src','js');
var LIB_PATH = path.resolve(ROOT_PATH,'lib');
var PUBLIC_PATH = path.resolve(ROOT_PATH,'public/root');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var HtmlResWebpackPlugin = require('html-res-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

var isDebug = (process.env.NODE_ENV === 'development');
console.log('isDebug:', isDebug);

// publicPath,和页面引用保持一致
var publicPath = isDebug ? 'http://127.0.0.1:3000/site/static/' : '../'; //'/front/static/public/root/';

var cssFile = isDebug ?'css/[name].css':'css/[name].[contenthash:8].css';

var uglifyJS = new UglifyJsPlugin({
    compress: {
        warnings: false
    },
    except: ['$super', '$', 'exports', 'require']
});

var plugins = [
    new webpack.ProvidePlugin({
        $:  path.resolve(LIB_PATH,'jquery-1.12.4.min.js'),
        _: 'underscore',
        jQuery: path.resolve(LIB_PATH,'jquery-1.12.4.min.js'),
        'window.jQuery': path.resolve(LIB_PATH,'jquery-1.12.4.min.js'),
    }),
    new HtmlResWebpackPlugin({
        // template: './src/tem/nodeTem/index.html',
        template: path.resolve(TEM_PATH,'nodeTem','index.html'),
        filename: '/site/index.html',
        inject:"head",
        chunks:{
            'vendors':{
                attr: {
                    js: "charset=\"utf-8\""
                }
            },
            'index': {
                attr: {
                    js: "charset=\"utf-8\""
                }
            }
        }
    }),
    new ExtractTextPlugin(cssFile)
];

if (!isDebug) {
    plugins.push(uglifyJS);
}

module.exports = {
    // devtool: '#source-map',
    entry: {
        "index":  path.resolve(JS_PATH, 'index.js'),
        "vendors": [
            path.resolve(CSS_PATH, 'core.css'),
            path.resolve(CSS_PATH,'base_layout.css'),
        ]
    },
    output: {
        path: PUBLIC_PATH,
        publicPath: publicPath,
        filename:  isDebug ? 'js/[name].js' : 'js/[name].[chunkhash:8].js'
        // filename: 'js/[name].[chunkhash].js'
    },
    resolve: {
        root: [process.cwd() + '/dev', process.cwd() + '/node_modules'], // 绝对路径
        extensions: ['', '.coffee', '.js', '.jsx', '.json', '.vue'],
        alias: {
            'css': path.join(ROOT_PATH,'src','css'),
            'js': path.join(ROOT_PATH,'src','js'),
            'tem': path.join(ROOT_PATH,'src','tem'),
            'lib': path.join(ROOT_PATH,'lib'),
        }
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        color: true,
        port: 3000,
        host: '127.0.0.1',  // 10.6.131.79
        contentBase: './',
        // proxy: {
        //     '/mockapi/*': {
        //         // 将页面api用charles代理到mockapi
        //         // 然后自动匹配到：http://127.0.0.1:3001/mockapi/
        //         target: 'http://127.0.0.1:3001',
        //         secure: false
        //     }
        // }
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                query: {
                    helperDirs: [
                        __dirname + "/src/helper/handlebars",
                        __dirname + "/src/tem"
                    ]
                }
            },
            {
                test: /\.(html|xml)$/,
                loader: 'file?name=templates/[1]/[2]&regExp=([^/]+)[/\\\\]templates[/\\\\](.+)$'
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.(jpeg|jpg|png|gif)$/,
                loader: 'url?limit=8192&name=images/[name].[hash:8].[ext]'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff2'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins: plugins
}


