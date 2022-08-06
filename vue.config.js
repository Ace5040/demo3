module.exports = {
    "filenameHashing": false,
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.(js|ts)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "@enhancedjs/vue-template-in-string-loader"
                    }
                }
            ]
        }
    },
}
