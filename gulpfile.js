var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var jsSources=['public/javascripts/**/*.js'],
    siteSassSources = ['public/stylesheets/style.scss'],
    loginSassSources = ['public/stylesheets/login.scss'],
    htmlSources = ['**/*.ejs'],
    outputDir = 'public/assets';

gulp.task('siteSass', function() {
   gulp.src(['public/stylesheets/style.scss'])
   .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  //.pipe(uglify())
  .pipe(concat('style.css'))
  .pipe(gulp.dest(outputDir));
});

gulp.task('loginSass', function() {
   gulp.src(['public/stylesheets/login.scss'])
   .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  //.pipe(uglify())
  .pipe(concat('login.css'))
  .pipe(gulp.dest(outputDir));
});

gulp.task('js', function() {
  gulp.src([
    ,'public/javascripts/Services/*.js'
    ,'public/javascripts/Filters/*.js'
    ,'public/javascripts/Controllers/**/*.js'
    ,'public/javascripts/Directives/*.js'])
  //.pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest(outputDir));
});


gulp.task('mainAppjs', function() {
  gulp.src(['public/javascripts/app.js'])
  .pipe(concat('mainApp.js'))
  .pipe(gulp.dest(outputDir));
});

//watch the file changes to trigger livereload

gulp.task('watch', function() {
    gulp.watch(jsSources, ['js','mainAppjs']);
  	gulp.watch(siteSassSources, ['siteSass']);
    gulp.watch(loginSassSources, ['loginSass']);
});

gulp.task('default', ['js','mainAppjs', 'siteSass','loginSass']);//, 'watch']); 