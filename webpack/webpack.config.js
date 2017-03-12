/*
   webpack常用十大功能：
   1.启动服务 webpack-dev-servver
   2.模块发开发 commonjs
   3.版本控制 hash chunkhash
   4.css sass引入
   5.抽离scss css
   6.生成html
   7.合并压缩js
   8.配置babel-preset-es2015  ，支持es6
   9.mockshuju
   10.引入外部文件
 */

//安装可以编译sass的插件
var Extract=require("extract-text-webpack-plugin");

//创建 可以创建html的插件
var htmlWebpackPlugin=require("html-webpack-plugin");

var webpack=require("webpack");

module.exports={
	//入口配置
	entry:"./src/app.js",
	//entry:["../src/search.js","./src/ap.js"],//入口配置，多个入口
	//entry:{
//		app:"../src/search.js",
//		search:"./src/ap.js",
//	}
	
	//出口配置
	output:{
		path:__dirname+"/bulid",//必须设置绝对路径
		//filename:"bundle.js",//写死的出口文件名
//		filename:"[name]_[hash].js",
		filename:"[name]_[chunkhash].js"//版本号控制，只要源文件发生改变，重新就会生成新的版本
		
	},
	
	//引入模块
	module:{
		loaders:[
		   {
		   	/*抽离scss*/
		   	test:/\.scss$/,
//		   	loder:"style-loader!css-loader!sass-loader"
		   	loader:Extract.extract({
		   		fallback:"style-loader",
		   		use:"css-loader!sass-loader"
		   	})
		   },
		   {
		   	/*抽离css*/
		   	test:/\.css$/,
//		   	loder:"style-loader!css-loader!sass-loader"
		   	loader:Extract.extract({
		   		fallback:"style-loader",
		   		use:"css-loader"
		   	})
		   },
		   {
		   	/*配置react*/
		   	test:/\.js$/,
		   	exclude:/node_modules/,
	   		loader:"react-hot-loader!babel-loader"
		   },
		   {
		   	/*配置react的jsx扩展*/
		   	test:/\.jsx$/,
	   		exclude:/node_modules/,
	   		loader:"react-hot-loader!babel-loader"
		   }
		]
	},
	
	devServer:{//启动服务器
		contentBase:"./bulid",//服务的根目录
		port:8000,     //服务器的端口号
		proxy:{//mock数据模仿时配置的服务器
			"/api":{
				target:"http://localhost:3000",
				pathRewriter:{"^/api":""}
			}
		}
	},
	
	plugins:[
	    //一般都是发布的时候再压缩合并
//	    new webpack.optimize.UglifyJsPlugin({
//	    	    compress:{
//	    	    	    warnings:false,
//	    	    },
//	    	    output:{
//	    	    	    comments:false
//	    	    }
//	    }),
	    //new htmlWebpackPlugin();//自动创建index.html
	     new htmlWebpackPlugin({
	     	title:"webpack demo",//默认的tittle属性，页面的tittle
	     	abc:"hgdjhgfhjdf",//可以随意自定义属性
	     	filename:"app.html",//生成的页面文件名
	     	template:"my-index.ejs"//创建一个ejs文件模版
	     }),
	     new Extract({
	     	filename:"[name].[hash].css",//sass编译成css输出时，带有版本号
	     	disable:false,//true时表示禁用
	     	allChunks:true//控制版本号
	     })
	     
	],
	//可以引入外部文件，引入jquery
	externals:{
		jquery:"window.jquery"
	}
	
}


































