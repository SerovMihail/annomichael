var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');

function onError(err) {
    console.log(err);
}

gulp.task('sass', function(){
    return gulp.src('style.scss')
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(minify())
    .pipe(gulp.dest('css/'))
    .pipe(plumber({
        errorHandler: onError
    }))    
}); 

gulp.task('watcher',function(){
    gulp.watch('style.scss', ['sass']);
});

gulp.task('default', ['watcher']);