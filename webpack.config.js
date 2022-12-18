const htmlPack = require('html-webpack-plugin')

const htmlPagesList = [
    "index",
    "pages/test01",
    "pages/test02"
]

// console.log(process.argv);

module.exports = {

    //https://stackoverflow.com/questions/70916332/webpack-bundle-files-for-multiple-pages
    // entry: { main: [ "./src/index.js", ], test: [ "./src/test/secondpage.js", ], },

    entry: htmlPagesList.reduce( (config, page) => {
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
        filename: asset => {
            return asset.chunk.name+'.bundle.js'
        },

        // filename: '[name].bundle.js',
        // filename: asset => {
            
        //     // console.log('//// --- CHUNK: ',asset.chunk);

        //     if ( !asset.chunk.name || /vendors\-|node_modules_|node_modules/g.test(String(asset.chunk.id)) )

        //         return  (
        //             console.log(':::: library export: ',asset.chunk.id.replace(/vendors\-|node_modules_|node_modules|_js|\s/gi,'')),
        //             'vendors/'+(asset.chunk.id.replace(/vendors\-|node_modules_|node_modules|_js|\s/gi,''))+'.js'
        //         )

        //     else
    
        //         return asset.chunk.name+'.bundle.js'

        // }

        assetModuleFilename: (asset) =>{
            console.log('================>',asset);
        }
        

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

        // classic preset:
        // minimize: true,
        // innerGraph: false,              // do not print analysis for unused exports
        // portableRecords: false,         // generate records with relative paths to move the context folder.
        // mangleExports: true,            // false: not change name of export modules (true: small name or id)
        // mangleWasmImports: true,        // true: shorter strings. It merge module and export names
        // flagIncludedChunks: true,       // mark blocks that are subsets of other blocks. so they don't have to be loaded when already included
        // providedExports: true,          // try to undestand exports type automatically (true generete optmized direct exporting)
        // usedExports: true,              // false: this voice is better in "splitChunks" obj), 'global' / true is in realtime
        // removeAvailableModules: true,   // detect and remove modules already included
        // realContentHash: true,          // adds an additional hash compilation pass for secure paths
        // sideEffects: false,             // detect and not load the sub libs of module  (https://github.com/webpack/webpack/blob/main/examples/side-effects/README.md)
        // concatenateModules: false,      // try to create one file for mixed modules
        // runtimeChunk: false,            // true = automatic nesting chunks progess, 'multiple', 'single' = one file for all chuncks
        // chunkIds: 'named',              // use explicit name in files analisys (chunks)

        minimize: false,
        innerGraph: false,              // do not print analysis for unused exports
        mangleExports:true,            // false: not change name of export modules (true: small name or id)
        mangleWasmImports: true,       // true: shorter strings. It merge module and export names
        flagIncludedChunks: true,       // mark blocks that are subsets of other blocks. so they don't have to be loaded when already included
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
            cacheGroups: {
                default: false,
                defaultVendors: {
                    enforce: true,
                    reuseExistingChunk: true,
                    test: /node_modules+(\/|\\)/gi,

                    name: (chunk) => {

                        let moduledata = chunk.resource, //chunk.identifier(),
                            rootfolder = 'vendors/'+moduledata.split(/node_modules+(\\|\/)/i).pop("").split(/(\\|\/)/i)[0],
                            fileModuleName = rootfolder+'/'+moduledata.replace(/\//gi,'\\').replace(/\.[^/.]+$/, "").split('\\').reduceRight((item) => item)

                        return fileModuleName

                    },

                    filename: (asset) => { 
                        console.log(':::: module export:',asset.chunk.name);
                        return asset.chunk.name+".js"
                    },
                },
                components: {

                    enforce: true,
                    reuseExistingChunk: true,
                    test: /components+(\/|\\)/gi,
                    name: (chunk) => {

                        if( /components(\\|\/)/gi.test(chunk.identifier()) ){
                            let componentPosition = 'components/'+chunk.identifier().replace(/\//gi,'\\').split(/components+(\\|\/)/i).pop("").split(/(\\|\/)/i)[0].replace(/(_js|\.js)/,'')
                            console.log(":::: components export:",componentPosition)
                            return componentPosition
                        }

                    },

                },
                // assets:{

                //     enforce: true,
                //     reuseExistingChunk: true,
                //     test: /src_assets+(\/|\\)/gi,
                //     name: (chunk) => {
                //         console.log(chunk);
                //     }

                // }

            },

        },

    },
    module: {

        rules: [

            {
                exclude: /(\/node_modules|\/\.bkp(s))/i,
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader'
            },
            
            {
                exclude: /(\/node_modules|\/\.bkp(s))/i,
                test: /\.css$/i,
                loader: 'style-loader',
                options: {
                    esModule: false,
                }
            },
            
            {
                exclude: /(\/node_modules|\/\.bkp(s))/i,
                test: /\.css$/i,
                loader: 'css-loader',
                options: {
                    url: true,
                    esModule: false,
                    sourceMap: false,
                    modules: false,
                },
            },

            {
                exclude: /(\/node_modules|\/\.bkp(s))/i,
                test: /\.(jp?g|png|gif|webp|svg|ico|zip|json|ttf|eot|woff|woff2)$/i,
                loader: 'file-loader',
                options: {
                    modules: false,
                    esModule: false,
                    sourceMap: false,
                    name: '[folder]/[name].[ext]?[contenthash]',
                },
                generator: {
                    emit: false,
                  },

            },
        ]
    },
    plugins : [].concat(

        // https://dev.to/marcinwosinek/tutorial-for-building-multipage-website-with-webpack-4gdk
        // https://github.com/jantimon/html-webpack-plugin
        htmlPagesList.map( page => new htmlPack({
            filename: `${page}.html`,
            title: 'Custom template',
            template: 'src/template.html',
            minify:{
                collapseWhitespace: false,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: false,
                removeScriptTypeAttributes: false,
                removeStyleLinkTypeAttributes: false,
                useShortDoctype: false,
                minifyURLs: false,
                sortAttributes: false,
                sortClassName: false,
                minifyJS: false,
                minifyCSS: false
            }
        }))
    )
}