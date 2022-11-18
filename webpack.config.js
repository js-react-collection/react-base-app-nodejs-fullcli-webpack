const HtmlPack = require('html-webpack-plugin')
const HtmlList = [
    "index",
    "pageextra/page"
]

module.exports = {

    //https://stackoverflow.com/questions/70916332/webpack-bundle-files-for-multiple-pages
    // entry: { main: [ "./src/index.js", ], test: [ "./src/test/secondpage.js", ], },

    // entry: HtmlList.reduce( (config, page) => {
    //     config[page] = `./src/${page}.js`
    //     return config;
    // },{}),

    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM'
    // },
    // exports: {
    //     "react": __dirname+"public/js/react.js",
    //     "react-dom": __dirname+"public/js/ReactDOM.js",
    // },

    output: {
        clean: true,
        path: __dirname+'/public/',
        filename: '[name].bundle.js',
        
        // experimental output way:
        // chunkFormat: 'array-push',
        // filename: pathData => {
        //     console.log('=======>',pathData)
        //     let name = pathData.chunk.name;
        //     if (!name) {
        //         name = pathData.chunk.id;
        //         if (name.includes('vendors-')) {
        //             name = 'vendors';
        //         }
        //     }
        //     return `${name}.js`;
        // }

    },
    devServer: {
        static: __dirname+'/src',
        port: 8080,
        open: true,
        hot: true
    },
    // cache: false,
    optimization: {

        // nodeEnv: 'production',
        // concatenateModules: true,
        // portableRecords: true,

        minimize: false,
        // innerGraph: false,              // do not print analysis for unused exports
        // providedExports: true,          // try to undestand exports type automatically (true generete optmized direct exporting)
        usedExports: true,              //
        // removeAvailableModules: true,   // detect and remove modules already included
        // realContentHash: true,          // adds an additional hash compilation pass for secure paths
        // sideEffects: false,             // detect and not load the sub libs of module  (https://github.com/webpack/webpack/blob/main/examples/side-effects/README.md)
        
        // mangleExports: true,
        // runtimeChunk: false,             // true = automatic nesting chunks progess, 'multiple', 'single' = one file for all chuncks
            
        // chunkIds: 'named',
        // moduleIds: false,

        splitChunks: {
            // minChunks: 1,
            chunks: 'all',
            cacheGroups: {
                commons: {
                    test: /node_modules+(\/|\\)/gi,
                    name: (module, chunks, cacheGroupKey) => {
                        let moduleFilePath = cacheGroupKey+'/'+module.identifier().replace(/\//gi,'\\').replace(/\.[^/.]+$/, "").split('\\').reduceRight((item) => item)
                        console.log('///////////////// module: ',moduleFilePath )
                        return moduleFilePath
                    },
                    filename: `[name].js`,
                },
            }
        },

    },
    module: {
        rules: [ {
            test: /\.js$/i,
            exclude: /(\/node_modules|\/\.bkp)/i,
            use: [ 'babel-loader' ]
        }, {
            test: /\.css$/i,
            exclude: /(\/node_modules|\/\.bkp)/i,
            use: [ 'style-loader', 'css-loader' ]
        }, {
            test: /\.(jpg|jpeg|png|gif|webp|svg|ico|zip|json)$/i,
            exclude: /(\/node_modules|\/\.bkp)/i,
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
            title: 'Custom template',
            template: 'src/template.html'
        }))
    )
}