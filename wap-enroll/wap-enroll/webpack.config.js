var Webpack = require("webpack");
var path = require("path");

module.exports = {
	entry: './js/entry.js',
	output: {
		path: path.join(__dirname, '/build'),
		filename: 'bundle.js',
		publicPath: "/src/"
	},
	module: {
		loaders: [{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}, {
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=8192'
			}, 
//			{
//				include: path.join(__dirname, '../bulid/js'),
//				exclude: /(node_modules)/,
//				test: /\.jsx?$/,
//				loader: 'babel?presets=es2015',
//				query: {
//					presets: [
//						'babel-preset-es2015'
//					].map(require.resolve)
//				}
//			}, 
			{
				test: require.resolve('zepto'),
				loader: 'exports-loader?window.Zepto!script-loader'
			}
		]
	},
	watch: true,
	devtool: "cheap-module-eval-source-map"
}