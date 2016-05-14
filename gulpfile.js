var exec = require('child_process').exec;
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var bootlint  = require('gulp-bootlint');

// Compile scss file
gulp.task('sass', function() {
  return gulp.src('./assets/custom/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('assets/custom/scss/'));
});

// Watch version of the scss compilation
gulp.task('sass:watch', function() {
  gulp.watch('./assets/custom/scss/style.scss', ['sass']);
});

// Validate html, links, etc.
gulp.task('html-proofer', function(done) {
  execute('htmlproofer ./index.html --check-html --check-favicon --check-external-hash', {}, done);
});

// Validate bootstrap
gulp.task('bootlint', function() {
  return gulp.src('./index.html')
    .pipe(bootlint({
      stoponerror: true
    }));
});

// Full test task
gulp.task('test', ['html-proofer', 'bootlint']);

// Util to execute external command
function execute(cmd, opts, done) {
  console.log(cmd);
  exec(cmd, opts, function(error, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    done(error);
  });
}
