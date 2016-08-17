'use strict';
var gulp = require('gulp');
var connect = require('gulp-connect'); //runs a local dev server
var open = require('gulp-open'); //open a url in a web browser
var browserify = require('browserify'); //bundles javascript
var reactify = require('reactify'); //transforms react jsx to js
var source = require('vinyl-source-stream'); //use conventional text streams with gulp
var concat = require('gulp-concat');
var lint = require('gulp-eslint'); //lint js files, including jsx files

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js', //look in subdirectories
		images: './src/images/*',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/toastr/toastr.css'
		],
		dist: './dist',
		mainJS: './src/main.js'
	}
}

gulp.task('connect', function() { //start a local development server
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function() { //run after connect task
	gulp.src('dist/index.html')
	.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
})

gulp.task('html', function() { //get html files to dist folder
	gulp.src(config.paths.html)
	.pipe(gulp.dest(config.paths.dist))
	.pipe(connect.reload()); //reload anything that is running in our local dev server
});

gulp.task('js', function() {
	browserify(config.paths.mainJS)
	.transform(reactify)
	.bundle()
	.on('error', console.error.bind(console))
	.pipe(source('bundle.js'))
	.pipe(gulp.dest(config.paths.dist + '/scripts'))
	.pipe(connect.reload());
})

gulp.task('css', function() {
	gulp.src(config.paths.css)
	.pipe(concat('bundle.css'))
	.pipe(gulp.dest(config.paths.dist + '/css'));
})

gulp.task('images', function() { //migrate images to dist folder
	gulp.src(config.paths.images)
	.pipe(gulp.dest(config.paths.dist + '/images'))
	.pipe(connect.reload());

	gulp.src('./src/favicon.ico') 
	.pipe(gulp.dest(config.paths.dist));
})

gulp.task('lint', function() {
	return gulp.src(config.paths.js) //look at js files. notice we have a return. this is so we can get the output of this step.
	.pipe(lint({config: 'eslint.config.json'})) //linting rules defined in this json file
	.pipe(lint.format()); //this is the output
})

gulp.task('watch', function() { //watch html path & js path for any changes. if any, run associated task
	gulp.watch(config.paths.html, ['html']); 
	gulp.watch(config.paths.js, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);