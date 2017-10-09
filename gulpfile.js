'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');

var debug = require('gulp-debug');
var changed = require("gulp-changed");
var watermark = require("gulp-watermark");

var runSequence = require('run-sequence');
var responsive = require('gulp-responsive');

// Config
var config = {
    source_images_path      : 'original',
    images_path             : 'generated',
    //images_upload_path      : 'web/uploads'
};

var resizeImageTasks = [];

['1024x1024'].forEach(function(size) {
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
        gulp.src(config.source_images_path + "/*/**/*.{jpg,png}", { base: config.source_images_path })
            .pipe(changed(config.images_path + '/' + size + '/', {extension: '.jpg'}))
            .pipe(responsive({
                '**/*.{jpg,png}': [
                    // {
                    //     withoutEnlargement: false,
                    //     width:  width,
                    //     height: height,
                    //     rename: {
                    //         extname: ".webp"
                    //     },
                    //     format: 'webp'
                    // },
                    {
                        withoutEnlargement: false,
                        width:  125,
                        height: 125,
                        //max: true,
                        rename: function (path) {
                            path.dirname = "125x125/" + path.dirname;
                            path.extname = ".jpg";
                            return path;
                        },
                        format: 'jpeg'
                    }
                ]
            }, {
                // global quality for all images
                //quality: 50,
                withMetadata: false,
                errorOnUnusedImage: false
            }))
            .pipe(watermark({
                image: "watermark.png",
                resize: '50%',
                gravity: 'Center'
            }))
            .pipe(gulp.dest(config.images_path + '/'));

        return gulp.src(config.source_images_path + "/*/**/*.{jpg,png}", { base: config.source_images_path })
            .pipe(changed(config.images_path + '/' + size + '/', {extension: '.jpg'}))
            .pipe(responsive({
                '**/*.{jpg,png}': [
                    // {
                    //     withoutEnlargement: false,
                    //     width:  width,
                    //     height: height,
                    //     rename: {
                    //         extname: ".webp"
                    //     },
                    //     format: 'webp'
                    // },
                    {
                        withoutEnlargement: false,
                        width:  270,
                        height: 190,
                        ignoreAspectRatio: true,
                        rename: function (path) {
                            path.dirname = "270x190/" + path.dirname;
                            path.extname = ".jpg";
                            return path;
                        },
                        format: 'jpeg'
                    },
                    {
                        withoutEnlargement: false,
                        width:  300,
                        height: 300,
                        //max: true,
                        rename: function (path) {
                            path.dirname = "300x300/" + path.dirname;
                            path.extname = ".jpg";
                            return path;
                        },
                        format: 'jpeg'
                    },
                    {
                        withoutEnlargement: false,
                        width:  1024,
                        height: 1024,
                        max: true,
                        rename: function (path) {
                            path.dirname = "pictures/" + path.dirname;
                            path.extname = ".jpg";
                            return path;
                        },
                        format: 'jpeg'
                    }
                ]
            }, {
                // global quality for all images
                //quality: 50,
                withMetadata: false,
                errorOnUnusedImage: false,
                errorOnUnusedConfig: false
            }))
            .pipe(watermark({
                image: "watermark.png",
                resize: '221x72',
                gravity: 'Center'
            }))
            .pipe(gulp.dest(config.images_path + '/'))
    });

    resizeImageTasks.push(resizeImageTask);
});


gulp.task('resize_images', resizeImageTasks);

gulp.task('recompress', function() {
    return gulp.src(config.source_images_path + "/*/**/*.{jpg,png}", { base: config.source_images_path })
        .pipe(changed(config.images_path + '/pictures/', {extension: '.jpg'}))
        .pipe(responsive({
                '**/*.{jpg,png}': [
                    {
                        format: 'jpeg'
                    }
                ]
            }, {
                // global quality for all images
                //quality: 50,
                withMetadata: false,
                errorOnUnusedImage: false,
                errorOnUnusedConfig: false
            })
        )
        .pipe(gulp.dest(config.source_images_path))
});

gulp.task('default', function(done) {
    //runSequence('resize_images', function () {
    runSequence('recompress', 'resize_images', function () {
        console.log('Finished');
        done();
    });
});