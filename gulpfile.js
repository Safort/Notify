var path = require('path');
var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var es6to5 = require('gulp-6to5');
var stylus = require('gulp-stylus');
var srcmaps = require('gulp-sourcemaps');


gulp.task('default', function() {
  gulp.run('js');
  gulp.run('styles');
  // gulp.run('html');

  gulp.watch('src/notify.js', ['js']);
  gulp.watch('src/notify.styl', ['styles']);
  // gulp.watch('src/*.html', ['html']);
});

gulp.task('js', function() {
  gulp.src('src/notify.js')
      .pipe(srcmaps.init())
        .pipe(es6to5())
        .pipe(rename('notify.js'))
      .pipe(srcmaps.write())
      .pipe(gulp.dest('build'));
});

gulp.task('styles', function() {
  gulp.src('src/notify.styl')
      .pipe(srcmaps.init())
        .pipe(stylus())
        .pipe(rename('notify.css'))
      .pipe(srcmaps.write())
      .pipe(gulp.dest('build'));
});

// gulp.task('html', function() {
//   gulp.src('src/index.html')
//       .pipe(gulp.dest('examples'));
// });