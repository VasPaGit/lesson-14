var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		concatCss    = require('gulp-concat-css'),
		autoprefixer = require('gulp-autoprefixer'),
		imagemin     = require('gulp-imagemin'),
		pngquant     = require('gulp-pngquant'),
		wait         = require('gulp-wait'),
		rimraf       = require('rimraf'),
		browserSync  = require('browser-sync');

var path = {
	clear: 'dist',

	src: {
		html:    'src/*.html',
		fonts:   'src/fonts/**/*',
		img:     'src/img/**/*',
		sass:    'src/sass/*.sass',
		css:     'src/css/*.css',
		script:  'src/js/*.js',
	},

	dist: {
		html:    'dist',
		fonts:   'dist/fonts',
		img:     'dist/img',
		css:     'dist/css',
		script:  'dist/js',
	},

	watch: {
		html:    'src/**/*.html',
		sass:    'src/**/*.sass',
		css:     'src/**/*.css',
		script:  'src/**/*.js',
	}
};

gulp.task('server', function () {
	browserSync({
		server: {baseDir: 'dist'},
		notify: false,
		open:   false,
	});
});

gulp.task('html', function () {
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.dist.html))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function () {
	gulp.src(path.src.sass)
		.pipe(wait(1000))
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(concatCss('style.css'))
		.pipe(autoprefixer(['last 15 versions', '> 1%'], {cascade: true}))
		.pipe(gulp.dest(path.dist.css))
		.pipe(browserSync.reload({stream: true}));
	});
	
gulp.task('css', function () {
	gulp.src(path.src.css)
		.pipe(autoprefixer(['last 15 versions', '> 1%'], {cascade: true}))
		.pipe(gulp.dest(path.dist.css))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function() {
	return gulp.src(path.src.img)
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(path.dist.img));
});

gulp.task('fonts', function () {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.dist.fonts));
});

gulp.task('script', function () {
	gulp.src(path.src.script)
		.pipe(gulp.dest(path.dist.script));
});

gulp.task('watch', ['server', 'html', 'sass', 'css', 'img', 'fonts', 'script'], function () {
	gulp.watch(path.watch.html,    ['html']);
	gulp.watch(path.watch.sass,    ['sass']);
	gulp.watch(path.watch.css,     ['css']);
	gulp.watch(path.src.img,       ['img']);
	gulp.watch(path.src.fonts,     ['fonts']);
	gulp.watch(path.watch.script,  ['fonts']);
});

gulp.task('clear', function (cb) {
	rimraf(path.clear, cb);
});

gulp.task('default', ['watch'], function () {
	console.log('Gulp запустился и готов к работе!');
});