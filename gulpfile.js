// include gulp
var gulp = require('gulp');
var src = 'public/src';
var dist = 'public/build';
var webserver = require('gulp-webserver');
var livereload = require('gulp-livereload');

var paths = {
	//js: src + '/js/*.js',
	css: src + '/css/*.css',
	html: src + '/**/*.html'
};

// include plugins

// 자바스크립트 파일을 하나로 합치고 압축한다.
gulp.task('combine-js', function () {
	return gulp.src(paths.js)
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dist + '/js'));
});

// sass 파일을 css 로 컴파일한다.
gulp.task('compile-sass', function () {
	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest(dist + '/css'));
});

// 파일 변경 감지 및 브라우저 재시작
gulp.task('watch', function () {
	livereload.listen();
	//gulp.watch(paths.js, ['combine-js']);
	//gulp.watch(paths.scss, ['compile-sass']);
	//gulp.watch(paths.html, ['compress-html']);
	gulp.watch(dist + '/**').on('change', livereload.changed);
});

// 웹서버를 localhost:8000 로 실행한다.
gulp.task('server', function () {
	return gulp.src(dist + '/')
		.pipe(webserver());
});

//기본 task 설정
gulp.task('default', [
	'server', 
    'watch' ]);
    