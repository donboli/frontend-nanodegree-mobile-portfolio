var gulp = require('gulp');

gulp.task('default', function() {
  var inline = require('gulp-inline')
    , uglify = require('gulp-uglify')
    , minifyCss = require('gulp-minify-css')
    , autoprefixer = require('gulp-autoprefixer')
    , rename = require('gulp-rename');

  gulp.src('src_index.html')
    .pipe(inline({
      base: 'public/',
      js: uglify,
      css: [minifyCss, autoprefixer({ browsers:['last 2 versions'] })],
      disabledTypes: ['svg', 'img', 'js'], // Only inline css files
      ignore: ['./css/print.css']
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'));
});

gulp.task('remove_index', function () {
  gulp.src('./index.html', {read: false})
    .pipe(clean());
});

gulp.task('process', ['remove_index', 'default']);