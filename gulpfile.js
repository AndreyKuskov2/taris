// const gulp = require("gulp");
// const minifyHtml = require("gulp-minify-html");

// function build(cb) {
//     return gulp.src('./src/*.html').pipe(minifyHtml()).pipe(gulp.dest('./build'));
// }

// exports.default = gulp.series(build);


// Пример 2. 
// const gulp = require('gulp');
// const sass = require('gulp-sass')(require('sass'));

// gulp.task('compile-sass', function() {
//   return gulp.src('src/styles/*.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('dist/styles'));
// });

// gulp.task('watch', function() {
//   gulp.watch('src/styles/*.scss', gulp.series('compile-sass'));
// });



const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const webserver = require('gulp-webserver');

gulp.task('compile-sass', function() {
  return gulp.src('src/styles/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('minify-images', function() {
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('concat-scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('webserver', function() {
  return gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('watch', function() {
  gulp.watch('src/styles/*.scss', gulp.series('compile-sass'));
  gulp.watch('src/images/*', gulp.series('minify-images'));
  gulp.watch('src/scripts/*.js', gulp.series('concat-scripts'));
});

gulp.task('default', gulp.series('compile-sass', 'minify-images', 'concat-scripts', 'webserver', 'watch'));
