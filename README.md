# react-base-app-nodejs-fullcli-{webpack}

<b>[under ooptimization] [working fine]</b>

A purist style approach to make a react app from stretch (without creacte-react-app) based on webpack.
This way create an auto-updated complete react app from 0 to 100.

<br>

---

Open your terminal in a folder and...

- init project...<br>
    `npm init (or npm init -y)`<br>

- install react...<br>
    `npm i --save react react-dom`<br>

- install babel (for jsx and compiling)...<br>
    `npm i --save-dev @babel/preset-react`<br>
    
- install babel add-on (for get resurces)...<br>
    `npm i --save-dev babel-loader file-loader style-loader css-loader`<br>

- in root make .babelrc file with:<br>
    ```json
    {
        "presets": [[ "@babel/preset-react", { "runtime" : "automatic"}]]
    }
    ```

- install webpack (for editing and build it)<br>
    `npm i --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin`<br>

- in root make webpack.config.js confing file:<br>
    ```javascript
    const htmlPack = require('html-webpack-plugin')

    const htmlPagesList = [
        "index",
        "pages/test01",
        "pages/test02"
    ]

    module.exports = {

        entry: htmlPagesList.reduce( (config, page) => {
            config[page] = `./src/${page}.js`
            return config;
        },{}),

        output: {

            clean: true,
            path: __dirname+'/public/',
            filename: asset => {
                return asset.chunk.name+'.bundle.js'
            },            

        },

        devServer: {
            static: __dirname+'/src',
            port: 8080,
            open: true,
            hot: true
        },

        cache: false,
        
        optimization: {

            minimize: true,                 // compress files
            innerGraph: false,              // do not print analysis for unused exports
            mangleExports:true,             // false: not change name of export modules (true: small name or id)
            mangleWasmImports: true,        // true: shorter strings. It merge module and export names
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

                            let rootfolder = 'vendors/'+chunk.resource.split(/node_modules+(\\|\/)/i).pop("").split(/(\\|\/)/i)[0],
                                moduleName = rootfolder+'/'+chunk.resource.replace(/\//gi,'\\').replace(/\.[^/.]+$/, "").split('\\').reduceRight((item) => item)

                            return moduleName

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

                    }

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
                    }

                },
            ]
        },
        plugins : [].concat(

            htmlPagesList.map( page => new htmlPack({

                filename: `${page}.html`,
                title: 'Custom template',
                template: 'src/template.html',
                minify:{
                    collapseWhitespace: true,
                    keepClosingSlash: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true,
                    minifyURLs: false,
                    sortAttributes: true,
                    sortClassName: false,
                    minifyJS: true,
                    minifyCSS: true
                }

            }))
        )
    }
    ```

- server:

  - if not have express:<br><br>

    1. install a server<br>
        `npm i --save-dev http-server`<br>

    2. open package.json and change `"scripts": {...},` with:<br>
        ```json
        "scripts": {
            "start": "start http://localhost:8080/ && npm run server",
            "server": "http-server -a localhost -p 8080 -c-1",
            "edit": "webpack serve --mode development",
            "build": "webpack --mode production"
        }
        ```

    3. test server:<br>
	_nb: for view result in server you need to compile app with last step_<br>
        with: `npm run start` for test build in public<br>
        with: `npm run serve` for edit in src<br><br>


  - if you use express:<br><br>

	coming soon...

<br><br>
- make a first index:<br><br>
  - react dir: `mkdir src`<br>
  - make index.js `echo '' > src/index.js`<br>
    copy index file content (we suggest see the simple exemple in "src"):<br>
    ```jsx
    //:
    //: Main of react app project
    //:

    // get react
    import React from 'react'
    import ReactDOM from 'react-dom/client'

    //make app root
    const root = ReactDOM.createRoot(document.getElementsByTagName('div')[0])

    //render app
    root.render(
        <React.StrictMode>
            <h1>HELLO FROM REACT!</h1>
        </React.StrictMode>
    )
    ```
<br><br>
- `npm run build` for make "public" folder and optimized app (ready to online server use)
