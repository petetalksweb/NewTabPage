
var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var htmlmin = require('gulp-htmlmin');

gulp.task('default', function(callback) {
    runSequence('clean', ['minify', 'moveImages'], callback)
});

gulp.task('clean', function() {
    del.sync('dist');
});

gulp.task('minify', function() {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist'));
});

gulp.task('moveImages', function() {
    return gulp.src('resources/img/*')
        .pipe(gulp.dest('dist/resources/img'))
});