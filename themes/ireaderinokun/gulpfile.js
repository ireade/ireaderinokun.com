var gulp = require('gulp');
var gutil = require('gulp-util');

/* *************
	CSS
************* */

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var scss = require('postcss-scss');
var autoprefixer = require('autoprefixer');
var postcssCriticalCSS = require('postcss-critical-css');
var postcssProcessors = [
	postcssCriticalCSS({
		outputPath: 'assets/css'
	}),
	autoprefixer( {
		browsers: [
			'Explorer >= 11',
			'last 2 versions'
		]
	} )
];

var sassMainFile = 'source/_scss/main.scss';
var sassFiles = 'source/_scss/*.scss';

gulp.task('css', function() {
	gulp.src(sassMainFile)
		.pipe(
			postcss(postcssProcessors, {syntax: scss})
		)
		.pipe(
			sass({ outputStyle: 'compressed' }) // compressed
			.on('error', gutil.log)
		)
		.pipe(gulp.dest('source/css'));
});

/* *************
	JS
************* */

var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var babel = require('gulp-babel');
var jsFiles = 'source/_js/*.js';

gulp.task('js', function() {
	gulp.src(jsFiles)
		.pipe(
			babel({ presets: ['es2015'] })
			.on('error', gutil.log)
		)
		.pipe(uglify())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('source/js'));
});

/* *************
	WATCH
************* */

gulp.task('watch', function() {
	gulp.watch(sassFiles,['css']);
	gulp.watch(jsFiles,['js']);
});

/* *************
	DEFAULT
************* */

gulp.task('default', ['css', 'js', 'watch']);
