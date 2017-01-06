var gulp = require('gulp');

gulp.task('default', ['clean'], function() {
  var inline = require('gulp-inline')
    , uglify = require('gulp-uglify')
    , minifyCss = require('gulp-minify-css')
    , rename = require('gulp-rename');

  gulp.src('src_index.html')
    .pipe(inline({
      base: './',
      js: uglify,
      css: [minifyCss],
      disabledTypes: ['svg', 'img'], // Only inline css files
      ignore: ['css/print.css']
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'));
});

gulp.task('clean', function () {
  var del = require('del');

  return del('./index.html');
});