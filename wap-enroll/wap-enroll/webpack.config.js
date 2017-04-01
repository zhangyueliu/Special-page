var Webpack = require("webpack");
var path=require("path");

module.exports = {
	entry: './js/entry.js',
	output: {
		path: path.join(__dirname, '/build'),
		filename: 'bundle.js',
		publicPath: './build/'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		},{
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=8192'
		},{
			  test: require.resolve('jquery'),  // 此loader配置项的目标是NPM中的jquery
			  loader: 'expose?$!expose?jQuery', // 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
			}]
	},
	watch:true
	
	
  
}