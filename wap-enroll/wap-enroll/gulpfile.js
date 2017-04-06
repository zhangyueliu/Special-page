var gulp = require('gulp'),
	cssmin=require('gulp-minify-css'),
	sourcemaps=require('gulp-sourcemaps'),
	notify=require('gulp-notify'),
	plumber=require('gulp-plumber'),
	cssver=require('gulp-make-css-url-version'),
	livereload=require('gulp-livereload'),
	autoprefixer=require('gulp-autoprefixer'),
	imagemin=require('gulp-imagemin');

//压缩css的任务
gulp.task('testcss', function() {
  // 将你的默认的任务代码放在这
  gulp.src('css/*.css')
	  .pipe(autoprefixer({
	  	browsers:['last 2 versions','Andriod>=4.0'],
	  	cascade:true,
	  	remove:true
	  }))
	  .pipe(plumber({errorHandler:notify.onError('Error:<%= error.message %>')}))
	  .pipe(sourcemaps.init())
	  .pipe(cssver())
	  .pipe(cssmin())
	  .pipe(sourcemaps.write())
	  .pipe(gulp.dest('src/css'))
	  .pipe(livereload());
});
//压缩image
gulp.task('testimg',function(){
	gulp.src('img/*.{png,gif,jpg,ico}')
		.pipe(imagemin({
			optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
	        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
	        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
	        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
		}))
		.pipe(gulp.dest('src/img'));
})
//监听任务
gulp.task('testwatch',function(){
	livereload.listen();
	gulp.watch('css/*.css',['testcss','testimg'])
});
