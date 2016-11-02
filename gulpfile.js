var gulp = require('gulp');
var fs = require('fs');
var fileinclude = require('gulp-file-include');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');

var CFG = JSON.parse(fs.readFileSync('settings.json'));

require('./tasks/jquery.js')();
require('./tasks/revision.js')();
require('./tasks/deploy.js')();

gulp.task('path', function(cb) {
  fs.writeFileSync('less/path.less', '@path: "' + CFG.PATH_IN_CSS + '";');
  cb();
});

gulp.task('js', function() {
  return gulp.src('js/main.js')
    .pipe(fileinclude())
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(CFG.PATH_PUBLIC + 'js/'));
});

gulp.task('style', function() {
  return gulp.src('less/style.less')
    .pipe(gulpif(CFG.SRCMAP, sourcemaps.init()))
    .pipe(less())
    .pipe(postcss([ autoprefixer({ browsers: ['last 10 versions'] }) ]))
    .pipe(cssnano())
    .pipe(gulpif(CFG.SRCMAP, sourcemaps.write()))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(CFG.PATH_PUBLIC + 'css'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('sprite/*.*')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      // imgPath: 'img/sprite.png',
      cssName: 'sprite.less'
    }));

  spriteData.img
  // .pipe(imagemin())
    .pipe(gulp.dest(CFG.PATH_PUBLIC + 'img/'));

  return spriteData.css
    .pipe(gulp.dest('less/sprite/'));
});

gulp.task('image', function() {
  return gulp.src('img/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest(CFG.PATH_PUBLIC + 'img/'));
});

gulp.task('video', function() {
  return gulp.src('video/**/*.*')
    .pipe(gulp.dest(CFG.PATH_PUBLIC + 'video/'));
});

gulp.task('favicon', function() {
  return gulp.src('html/*.ico')
    .pipe(gulp.dest(CFG.PATH_PUBLIC));
});

gulp.task('fonts', function() {
  return gulp.src('fonts/**/*.*')
    .pipe(gulp.dest(CFG.PATH_PUBLIC + 'fonts/'));
});

gulp.task('html', function() {
  var revFiles = JSON.parse(fs.readFileSync(CFG.PATH_PUBLIC + 'rev-manifest.json'));
  return gulp.src('html/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        path: CFG.PATH,
        cssFile: 'css/style.min.css',
        jsFile: 'js/main.min.js',
        cssFile: revFiles['css/style.min.css'],
        jsFile: revFiles['js/main.min.js'],
        jquery: CFG.JQUERY.enabled
        // jqueryVersion: CFG.JQUERY.version
      }
    }))
    .pipe(gulp.dest(CFG.PATH_PUBLIC));
});

gulp.task('watch', function() {
  // gulp.watch('img/**/*.*', gulp.series(['image', 'revision:clean', 'revision', 'html']));
  // gulp.watch('sprite/*.*', gulp.series(['sprite', 'revision:clean', 'revision', 'html']));
  // gulp.watch('less/**/*.less', gulp.series(['style', 'revision:clean', 'revision', 'html']));
  // gulp.watch('js/**/*.js', gulp.series(['js', 'revision:clean', 'revision', 'html']));
  gulp.watch('img/**/*.*', gulp.series(['image', 'html']));
  gulp.watch('fonts/**/*.*', gulp.series(['fonts', 'html']));
  gulp.watch('video/**/*.*', gulp.series(['video', 'html']));
  gulp.watch('sprite/*.*', gulp.series(['sprite', 'html']));
  gulp.watch('less/**/*.less', gulp.series(['style', 'html']));
  gulp.watch('js/**/*.js', gulp.series(['js', 'html']));
  gulp.watch('html/**/*.html', gulp.series('html'));
});

gulp.task('serve', gulp.parallel(
  ['watch'],
  function browserSync() {
    var browserSync = require('browser-sync').create();
    browserSync.init({server: CFG.PATH_PUBLIC});
    browserSync.watch(CFG.PATH_PUBLIC + '**/*.html').on('change', browserSync.reload);
  }
));

// gulp.task('init', gulp.series(['path', 'js', 'style', 'revision', 'html', 'jquery', 'image', 'sprite']));
// gulp.task('build', gulp.series(['path', 'js', 'style', 'revision:clean', 'revision', 'html', 'jquery', 'image', 'sprite']));
gulp.task('init', gulp.series(['path', 'js', 'style', 'revision', 'html', 'jquery', 'image', 'sprite', 'video', 'favicon', 'fonts']));
gulp.task('build', gulp.series(['path', 'js', 'style', 'revision:clean', 'revision', 'html', 'jquery', 'image', 'sprite', 'video', 'favicon', 'fonts']));  