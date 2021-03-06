var gulp = require('gulp');

var minifyCss = require('gulp-minify-css');

gulp.task('build_index', ['clean'], function() {
  var inline = require('gulp-inline')
    , uglify = require('gulp-uglify')
    , htmlmin = require('gulp-htmlmin');

  gulp.src('index.html')
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
});

gulp.task('copy_resources', ['clean'], function() {
  gulp.src('views/images/*')
    .pipe(gulp.dest('dist/views/images'));

  gulp.src('css/print.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('compress_images', ['clean'], function() {
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

gulp.task('clean', function () {
  var del = require('del');

  return del('dist/*');
});

gulp.task('default', ['build_index', 'compress_images', 'copy_resources']);