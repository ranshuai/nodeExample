const webpack = require('webpack')
const base = require('./webpack.base.config')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = Object.assign({},base,{
    resolve: {
        alias: Object.assign({}, base.resolve.alias, {
            'create-api': './create-api-client.js'
        })
    }
})

module.exports = config