'use strict';

var gulp = require('gulp'),
	fileinclude = require('gulp-file-include'),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat-css'),
	//sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
   	cssmin = require('gulp-minify-css'),
   	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rimraf = require('rimraf'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;

var path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		css: 'build/css/',
		img: 'build/img/',
		fonts: 'build/fonts/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/**.js',
		css: 'src/css/**.css',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		css: 'src/css/**/*.css',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './build'
};

var config = {
	server: {
		baseDir: "./build"
	},
	tunnel: true,
	host: 'localhost',
	port: 9000,
	logPrefix: "sookidak"
};

gulp.task('webserver', function () {
	browserSync(config);
});

gulp.task('clean', function () {
	rimraf(path.clean);
});

gulp.task('html:build', function () {
	gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
	gulp.src(path.src.js) 
		.pipe(rigger()) 
		//.pipe(sourcemaps.init()) 
		.pipe(uglify()) 
	   	//.pipe(sourcemaps.write()) 
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});

gulp.task('css:build', function () {
	gulp.src(path.src.css) 
	   	//.pipe(sourcemaps.init())
		//.pipe(sass({
		//   sourceMap: true,
		//   errLogToConsole: true
	  	// }))
		//.pipe(prefixer())
		//css합치기
		//.pipe(concat('common.css'))
	   	//.pipe(cssmin())
	  	//.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
	gulp.src(path.src.img) 
		.pipe(imagemin({
		   progressive: true,
		   svgoPlugins: [{removeViewBox: false}],
		   use: [pngquant()],
		   interlaced: true
	   }))
		.pipe(gulp.dest(path.build.img))
		.pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
	'html:build',
	'js:build',
	'css:build',
	'fonts:build',
	'image:build'
]);


gulp.task('watch', function(){
	watch([path.watch.html], function(event) {
		gulp.start('html:build');
	});
	watch([path.watch.css], function(event) {
		gulp.start('css:build');
	});
	watch([path.watch.js], function(event) {
		gulp.start('js:build');
	});
	watch([path.watch.img], function(event) {
		gulp.start('image:build');
	});
	watch([path.watch.fonts], function(event) {
		gulp.start('fonts:build');
	});
});


gulp.task('default', ['build', 'webserver', 'watch']);
