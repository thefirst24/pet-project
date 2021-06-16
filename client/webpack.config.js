const path = require('path')

module.exports = {
    entry: './src/app.js',
    module: {
        rules:[
            {test: /\.css/, use: ['style-loader','css-loader']},
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { targets: "ie 11" }]
                    ]
                  }
                }
              }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'src'),
        filename: 'bundle.js'
    },
    watch: true
}