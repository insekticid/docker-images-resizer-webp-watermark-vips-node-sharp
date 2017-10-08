'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');

var imageResize = require('gulp-image-resize');
const imagemin = require('imagemin');
var imageminWebp = require('imagemin-webp');
var debug = require('gulp-debug');
var changed = require("gulp-changed");
var watermark = require("gulp-watermark");
var os = require('os');
var parallel = require('concurrent-transform');
var pipes = require('gulp-pipes');
var webp = require('gulp-webp');
var runSequence = require('run-sequence');
var responsive = require('gulp-responsive');
var rename = require("gulp-rename");

// Config
var config = {
    source_images_path      : 'original',
    images_path             : 'generated',
    //images_upload_path      : 'web/uploads'
};

var resizeImageTasks = [];

['125x125', '1024x1024','300x300', '270x190'].forEach(function(size) {
    var sizes  = size.split('x');
    var width  = sizes[0];
    var height = sizes[1];
    var watemarkResize = '221x72';

    if (size === '1024x1024') {
        size = 'pictures';
    }

    if (width <= 250) {
        watemarkResize = (width * 0.7) + 'x' + (width * 0.7);
    }

    var resizeImageTask = 'resize_' + size;

    gulp.task(resizeImageTask, function() {
        return gulp.src(config.source_images_path + "/*/**/*.{jpg,png}", { base: config.source_images_path })
            .pipe(changed(config.images_path + '/' + size + '/', {extension: '.jpg'}))
            .pipe(debug())
            .pipe(parallel(
                imageResize({
                    width:  width,
                    height: height,
                    upscale: true,
                    format: 'jpg',
                    noProfile: true
                }),
                os.cpus().length)
            )
            .pipe(watermark({
                image: "watermark.png",
                resize: watemarkResize,
                gravity: 'Center'
            }))
            .pipe(gulp.dest(config.images_path + '/' + size + '/'))
    });

    resizeImageTasks.push(resizeImageTask);
});


gulp.task('resize_images', resizeImageTasks);

gulp.task('generate_webp', function() {
    return gulp.src(config.images_path + "/*/**/*.{jpg,png}", { base: config.images_path })
        .pipe(changed(config.images_path, {extension: '.webp'}))
        .pipe(responsive({
            '*/*/**/*.jpg': {
                withoutEnlargement: true
            }
        }, {
            // global quality for all images
            quality: 50,
            format: 'webp',
            errorOnUnusedImage: false
        }))
        .pipe(rename({
            extname: ".webp"
        }))
        .pipe(gulp.dest(config.images_path))
});

gulp.task('recompress', function() {
    return gulp.src(config.source_images_path + "/*/**/*.{jpg,png}", { base: config.source_images_path })
        .pipe(changed(config.images_path + '/pictures/', {extension: '.jpg'}))
        .pipe(debug())
        .pipe(
            parallel(imageResize({
                noProfile: true
            }),
            os.cpus().length)
        )
        .pipe(gulp.dest(config.source_images_path))
});

gulp.task('default', function(done) {
    runSequence('generate_webp', function () {
    //runSequence('recompress', 'resize_images', 'generate_webp', function () {
        console.log('Finished');
        done();
    });
});