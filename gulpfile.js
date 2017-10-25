let config = require('./gulpfile.config'),

    gulp = require('gulp'),
    stylus = require('gulp-stylus'), 
    rename =require('gulp-rename'), //重命名
    concat = require('gulp-concat'), //合并文件
    htmlmin = require('gulp-htmlmin'),//html压缩
    uglify = require('gulp-uglify'),//js压缩
    spritesmith=require('gulp.spritesmith'),  //制作雪碧图插件
    autoprefixer =require('gulp-autoprefixer'),//根据设置浏览器版本自动处理浏览器前缀
    cssmin=  require('gulp-clean-css'), //css压缩
    imagemin = require('gulp-imagemin'),// img压缩
    babel = require("gulp-babel"), //es6 转码
    watch = require("gulp-watch"),
    clean = require("gulp-clean");


// gulp-load-plugins 自动加载插件

// stylus 编译
gulp.task('stylus',function(){
 return gulp.src([config.stylus.all,config.stylus.ignore])
 .pipe(stylus())
 .pipe(gulp.dest(config.stylus.css))
 .pipe(autoprefixer(config.stylus.settings))
 .pipe(cssmin())
 .pipe(gulp.dest(config.stylus.dest));
});

//雪碧图
gulp.task('sprite',function(){
	return gulp.src([__dirname+"/public/img/not/sex-f-1.png",__dirname+"/public/img/not/sex-m-1.png"])
	.pipe(spritesmith({
		imgName:'sex.png',
		cssName:'sex.css',
		padding:5,
		algorithm:'left-right'
	}))
	.pipe(gulp.dest(__dirname+"/public/123"));
})

//image 压缩
gulp.task('imagemin', function () {
    return gulp.src([config.images.all,config.images.ignore])
        .pipe(imagemin())
        .pipe(gulp.dest(config.images.dest));
});


//html 压缩
gulp.task('testHtmlmin', function () {
    return gulp.src(config.html.src)
        .pipe(htmlmin(config.html.settings))
        .pipe(gulp.dest(config.html.dest));
});

//es6 ->es5 js
gulp.task("babeljs", function () {  
    return gulp.src(config.js.src)  
    .pipe(babel({
        presets: ['es2015']
    })) 
    .pipe(uglify()) 
    .pipe(gulp.dest(config.js.dest));  
}); 


// 清除文件
gulp.task("clean",function(){
    return gulp.src(config.clean)
    .pipe(clean());
})

// 配置文件复制任务 
gulp.task("libscopy", function () {  
    return gulp.src(config.libs.src)
    .pipe(gulp.dest(config.libs.dest));  
});
gulp.task("csscopy", function () {  
    return gulp.src('/newDDY/public/css/reset.css')
    .pipe(gulp.dest('/newDDY/dist/public/css/'));  
});

// 生成部署文件夹
gulp.task('build',["clean"],function(){
    gulp.start("libscopy","csscopy",'stylus','babeljs','testHtmlmin','imagemin');
})


let nodemon = require('nodemon'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

//启动服务器
gulp.task('nodemon', (a)=> {
  let ft = false;
  return nodemon({
    script: 'app.js'
  }).on('start', ()=> {
    if (!ft) {
      a();
      ft = true;
    }
  });
});
//  proxy 服务器代理
gulp.task('browser-sync',['nodemon'] , ()=> {
  browserSync.init({
    proxy: {
      target: 'http://127.0.0.1/chat.html'
    },
    files: ['*'],
    open: true,
    notify: false,
    port: 8090
  });
});


//实时监控
gulp.task('watch', ['browser-sync'],function(){

    gulp.watch(config.stylus.all, ['stylus']);
    gulp.watch(config.js.src,['babeljs']);
    gulp.watch(config.html.src,['testHtmlmin']);
    gulp.watch(config.images.all,['imagemin']);
    gulp.watch([
        config.stylus.all,
        config.js.src,
        config.html.src,
        config.images.all
    ]).on('change', reload);

});


gulp.task('default',["nodemon"])