const path = require('path');

// Currently, it seems that with the current app structure, using webpack will require a lot of changes.
// For now, webpack config stays as an open option.

module.exports = {
    mode: 'development',

    entry: {

    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
    },

    devtool: 'inline-source-map',
    watch: true,
}