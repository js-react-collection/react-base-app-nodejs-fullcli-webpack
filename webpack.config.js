
const HtmlPack = require('html-webpack-plugin')
const HtmlList = [
    "index",
    "test/secondpage"
]

module.exports = {

    //https://stackoverflow.com/questions/70916332/webpack-bundle-files-for-multiple-pages
    // entry: { main: [ "./src/index.js", ], test: [ "./src/test/secondpage.js", ], },

    entry: HtmlList.reduce( (config, page) => {
        config[page] = `./src/${page}.js`;
        return config;
    },{}),

    output: {
        path: __dirname+'/public/reactor',
        filename: '[name].bundle.js',
        clean: true
    },
    devServer: {
        static: __dirname+'/src',
        port: 8080,
        open: true,
        hot: true
    },
    module: {
        rules: [ {
            test: /\.js$/i,
            exclude: /node_modules/,
            use: [ 'babel-loader' ]
        }, {
            test: /\.css$/i,
            exclude: /node_modules/,
            use: [ 'style-loader', 'css-loader' ]
        }, {
            test: /\.(jpe?g|png|gif|webp|svg|ico|zip|json)$/i,
            exclude: /node_modules/,
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]'
            }
        } ]
    },
    plugins : [].concat(
        // https://dev.to/marcinwosinek/tutorial-for-building-multipage-website-with-webpack-4gdk
        // https://github.com/jantimon/html-webpack-plugin
        HtmlList.map( page => new HtmlPack({
            filename: `${page}.html`,
        })),
    )
}