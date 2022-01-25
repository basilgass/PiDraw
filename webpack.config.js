const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main.ts',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_module/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx','.ts', '.js'],
    },
    output: {
        filename: 'pidraw.js',
        path: path.resolve(__dirname, 'dev'),
    },
    optimization: {
        minimize: false
    },
    externals: {
        // '@svgdotjs/svg.js': '@svgdotjs/svg.js',
        // '@svgdotjs/svg.draggable.js': '@svgdotjs/svg.draggable.js'
    }
};