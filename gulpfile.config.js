// let src = `${__dirname}/app`,
//     dest = `${__dirname}/dist`;

//    /相对地址   \\绝对地址
let src = `/newDDY`,
    dest = `/newDDY/dist`;

module.exports={
	stylus:{
		all:`${src}/public/stylus/**/*.styl`,//所有 styl
		ignore:`!${src}/public/stylus/ignore/**` ,//需要忽略的 styl
		css:`${src}/public/css`,//输出 css 目录
		dest:`${dest}/public/css`, //输出目录
		settings:{            //编译 styl 过程需要的配置，可以为
			browsers: ['last 2 versions', 'Android >= 4.0'],
    		cascade: true, //是否美化属性值 默认：true 像这样：
    			//-webkit-transform: rotate(45deg);
    			//        transform: rotate(45deg);
    		remove:true //是否去掉不必要的前缀 默认：true 
		}
	},
	images:{
		all:`${src}/public/img/**/*.{jpg,png,gif}`,
		ignore:`!${src}/public/img/not/*.{jpg,png,gif}`,
		dest:`${dest}/public/img`
	},
	js:{
		src:`${src}/public/js/**/*.js`, // 需要编译的 js
		dest:`${dest}/public/js`,
	},
	libs:{
		src:`${src}/public/libs/**`,
		dest:`${dest}/public/libs`,
	},
	html:{
		src:`${src}/view/**/*.html`,
		dest:`${dest}/view`,
		settings:{           
			removeComments: true,//清除HTML注释
	        collapseWhitespace: false,//压缩HTML
	        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked=`true`/> ==> <input />
	        removeEmptyAttributes: true,//删除所有空格作属性值 <input id=`` /> ==> <input />
	        removeScriptTypeAttributes: true,//删除<script>的type=`text/javascript`
	        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type=`text/css`
	        minifyJS: true,//压缩页面JS
	        minifyCSS: true//压缩页面CSS
		}
	},
	clean:dest
}