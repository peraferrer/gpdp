/**
 * Created by german on 25/01/16.
 */

var gulp = require('gulp');
var path = require('path');
var notifier = require('node-notifier');
var browserify = require('gulp-browserify');
var less = require('gulp-less');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var colors = require('colors');


var browserifyConfig = {
    transform: ['partialify'],
    extensions: ['.js']
};

var onError = function(err) {
    console.log(err.message || err);
    notifier.notify({
        time: 15000,
        title: 'Browserify ERROR',
        message: err.message || JSON.stringify(err),
        icon: path.join(__dirname, "/assets/icons/error.png")
    });
};

gulp.task('Compile Component', function(done) {
    gulp.src('./src/js/workana.js', { read: false })
        .pipe(plumber({ errorHandler: onError }))
        .pipe(browserify(browserifyConfig))
        .pipe(rename('workana-compile.js'))
        .pipe(gulp.dest(path.dirname('./src/js/workana-compile.js')));

    done();
});

gulp.task('Compile Less', function () {
    return gulp.src(['./src/less/workana.less'])
        .pipe(plumber({ errorHandler: onError }))
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(rename('workana.css'))
        .pipe(gulp.dest('./src/less'));
});

gulp.task('Watchers', function() {

    gulp.watch(
        // Archivos que estamos escuchando
        [
            './src/js/workana.js',
            './src/less/**/*.less',
            './src/less/workana/**/*.css'
        ],
        // Tareas que ejecutamos cuando algo cambia
        [
            //'Compile Components',
            'Compile Component',
            'Compile Less'
        ]);

});
