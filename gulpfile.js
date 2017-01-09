var gulp = require('gulp');

gulp.task('build_index', ['clean'], function() {
  var inline = require('gulp-inline')
    , uglify = require('gulp-uglify')
    , minifyCss = require('gulp-minify-css')
    , rename = require('gulp-rename')
    , htmlmin = require('gulp-htmlmin');

  gulp.src('src_index.html')
    .pipe(inline({
      base: './',
      js: uglify,
      css: [minifyCss],
      disabledTypes: ['svg', 'img'],
      ignore: ['css/print.css']
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'));

  gulp.src('views/pizza.html')
    .pipe(inline({
      base: './',
      js: uglify,
      css: [minifyCss],
      disabledTypes: ['svg', 'img']
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist/views'));

  gulp.src('views/images/*')
    .pipe(gulp.dest('dist/views/images'))
});

gulp.task('clean', function () {
  var del = require('del');

  return del('./index.html');
});

gulp.task('compress_images', function() {
  var responsive = require('gulp-responsive');
  var imagemin = require('gulp-imagemin');

  var config = {
    quality: 70,
    // Global configuration for all images
    // Use progressive (interlace) scan for JPEG and PNG output
    progressive: true,
    // Zlib compression level of PNG output format
    compressionLevel: 9,
    // Strip all metadata
    withMetadata: false,
  };

  gulp.src(['img/*', '!img/pizzeria.jpg'])
    .pipe(responsive({
      '*': {}
    }, config))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));

  gulp.src('img/pizzeria.jpg')
    .pipe(responsive({
      '*': [{
        height: 75,
        width: 100,
        rename: { suffix: '-small' }
      }, {
        height: 270,
        width: 360,
        rename: { suffix: '-medium' }
      }],
    }, config))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['build_index', 'compress_images']);