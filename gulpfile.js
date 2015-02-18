var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var stylus = require('gulp-stylus');
var srcmaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('default', function() {
  gulp.run('js');
  gulp.run('styles');
  gulp.run('packageJson');

  gulp.watch('src/notify.js', ['js', 'packageJson']);
  gulp.watch('src/notify.styl', ['styles']);
});


gulp.task('packageJson', function() {
  var version = fs.readFileSync('src/notify.js', 'utf-8').match(/\/\* Notify v([0-9].[0-9].[0-9a-z-]) \*\//)[1];
  var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

  packageJson.version = version;

  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
});


gulp.task('js', function() {
  gulp.src('src/notify.js')
      .pipe(srcmaps.init())
        .pipe(babel())
        .pipe(rename('notify.js'))
      .pipe(srcmaps.write())
      .pipe(gulp.dest('build'));
});


gulp.task('styles', function() {
  gulp.src('src/notify.styl')
      .pipe(srcmaps.init())
        .pipe(stylus())
        .pipe(autoprefixer({browsers: ['last 20 version']}))
        .pipe(rename('notify.css'))
      .pipe(srcmaps.write())
      .pipe(gulp.dest('build'));
});