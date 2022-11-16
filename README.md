# react-base-app-nodejs-fullcli-{webpack}

<b>[under ooptimization] [working fine]</b>

A purist style approach to make a react app from stretch (without creacte-react-app) based on webpack.
This way create an auto-updated complete react app from 0 to 100.

<br>

---


- init project...<br>
    `npm init (or npm init -y)`<br>

- install react...<br>
    `npm i --save react react-dom`<br>

- install babel (for jsx and compiling)...<br>
    `npm i --save-dev @babel/preset-react`<br>
    
- install babel add-on (for get resurces)...<br>
    `npm i --save-dev babel-loader file-loader style-loader css-loader`<br>

- in root make .babelrc file with:
    ```json
    {
        "presets": [[ "@babel/preset-react", { "runtime" : "automatic"}]]
    }
    ```

- install webpack (for editing and build it)
    `npm i --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin`<br>

- in root make webpack.config.js confing file:
    ```javascript
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
