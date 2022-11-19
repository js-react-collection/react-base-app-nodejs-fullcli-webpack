const HtmlPack = require('html-webpack-plugin')
const HtmlList = [
    "index",
    "pageextra/page"
]

module.exports = {

    //https://stackoverflow.com/questions/70916332/webpack-bundle-files-for-multiple-pages
    // entry: { main: [ "./src/index.js", ], test: [ "./src/test/secondpage.js", ], },

    entry: HtmlList.reduce( (config, page) => {
        config[page] = `./src/${page}.js`
        return config;
    },{}),

    // exemple of manual injection
    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM'
    // },
    // exports: {
    //     "react": __dirname+"public/commons/react.js",
    //     "react-dom": __dirname+"public/commons/ReactDOM.js",
    // },

    output: {

        clean: true,
        path: __dirname+'/public/',

        filename: '[name].bundle.js',
        // filename: (asset) => {
            
        //     /* original version ==> filename: '[name].bundle.js'*/

        //     console.log('//// --- filename: ',asset.chunk);

        //     if ( asset.chunk.name==undefined )

        //         return  (
        //             console.log(':::: library export: ',asset.chunk.id.replace(/vendors\-|node_modules_|node_modules|_js|_jsx|_cls|\s/gi,'')),
        //             'commons/'+(asset.chunk.id.replace(/vendors\-|node_modules_|node_modules|_js|_jsx|_cls|\s/gi,''))+'.js'
        //         )

        //     else
    
        //         return asset.chunk.name+'.bundle.js'

        // }

        // what is this in webpack ??
        // assetModuleFilename: (asset) => {
        //     console.log('//// --- ModuleFilename: ',asset)
        // },

    },

    devServer: {
        static: __dirname+'/src',
        port: 8080,
        open: true,
        hot: true
    },

    cache: false,

    optimization: {

        // nodeEnv: 'production',
        // mangleExports: true,            
        
        // classic preset:
        // minimize: true,
        // innerGraph: false,              // do not print analysis for unused exports
        // portableRecords: false,         // generate records with relative paths to move the context folder.
        // providedExports: true,          // try to undestand exports type automatically (true generete optmized direct exporting)
        // usedExports: true,              // (this voice is better in "splitChunks" obj)
        // removeAvailableModules: true,   // detect and remove modules already included
        // realContentHash: true,          // adds an additional hash compilation pass for secure paths
        // sideEffects: false,             // detect and not load the sub libs of module  (https://github.com/webpack/webpack/blob/main/examples/side-effects/README.md)
        // concatenateModules: false,      // try to create one file for mixed modules
        // runtimeChunk: false,            // true = automatic nesting chunks progess, 'multiple', 'single' = one file for all chuncks
        // chunkIds: 'named',              // use explicit name in files analisys (chunks)


        minimize: false,
        innerGraph: false,              // do not print analysis for unused exports
        portableRecords: false,         // generate records with relative paths to move the context folder.
        providedExports: false,         // try to undestand exports type automatically (true generete optmized direct exporting)
        usedExports: false,             // (this voice is better in "splitChunks" obj)
        removeAvailableModules: true,   // detect and remove modules already included
        realContentHash: true,          // adds an additional hash compilation pass for secure paths
        sideEffects: false,             // detect and not load the sub libs of module  (https://github.com/webpack/webpack/blob/main/examples/side-effects/README.md)
        concatenateModules: false,      // try to create one file for mixed modules
        runtimeChunk: false,            // true = automatic nesting chunks progess, 'multiple', 'single' = one file for all chuncks
        chunkIds: 'named',              // use explicit name in files analisys (chunks)

        splitChunks: {
            chunks: 'all',
            // work equal to "output" on top
            cacheGroups: {
                commons: {
                    reuseExistingChunk: true,
                    test: /node_modules+(\/|\\)/gi,
                    name: (module, chunks, cacheGroupKey) => {
                        let fileModuleName = cacheGroupKey+'/'+module.identifier().replace(/\//gi,'\\').replace(/\.[^/.]+$/, "").split('\\').reduceRight((item) => item)
                        console.log(':::: module finded:',fileModuleName)
                        return fileModuleName
                    },
                    filename: (asset) => { 
                        console.log(':::: module export:',asset.chunk.name);
                        return asset.chunk.name+".js";
                    },
                },
            },
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