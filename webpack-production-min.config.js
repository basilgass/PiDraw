const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
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
        filename: 'pidraw.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: true
    },
    externals: {
        // '@svgdotjs/svg.js': '@svgdotjs/svg.js',
        // '@svgdotjs/svg.draggable.js': '@svgdotjs/svg.draggable.js'
    }
};