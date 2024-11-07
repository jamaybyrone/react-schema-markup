const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'react-schema-markup',
        libraryTarget: 'umd',
        clean: true,
        umdNamedDefine: true,
        globalObject: `typeof self !== 'undefined' ? self : this`
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [new TsconfigPathsPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
    },
    target: 'web',
    devtool: 'source-map',

};
