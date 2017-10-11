'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');

var debug = require('gulp-debug');
var watermark = require("gulp-watermark");

var runSequence = require('run-sequence');
var responsive = require('gulp-responsive');

var rm = require('gulp-rimraf');

// Config
var config = {
    source_images_path: 'unprocessed',
    original_images_path: 'original',
    images_path: 'generated'
    //images_upload_path      : 'web/uploads'
};

const resizeImages = function () {
    gulp.src(config.source_images_path + "/*/**/*.{jpg,png}", {base: config.source_images_path})
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
                    width: 125,
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

    return gulp.src(config.source_images_path + "/*/**/*.{jpg,png}", {base: config.source_images_path})
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
        .pipe(gulp.dest(config.original_images_path))
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
                    width: 270,
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
                    width: 300,
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
                    width: 1024,
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
        .pipe(gulp.dest(config.images_path + '/'));
};

gulp.task('resize_images', resizeImages);

gulp.task('recompress', function () {
    return gulp.src(config.original_images_path + "/*/**/*.{jpg,png}", {base: config.original_images_path})
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
        .pipe(gulp.dest(config.original_images_path));
});

gulp.task('finish', function () {
    return gulp.src(config.source_images_path + "/*/**/*.{jpg,png}", {base: config.source_images_path})
        .pipe(rm());
});

gulp.task('default', function (done) {
    runSequence('resize_images', 'finish', function () {
    //runSequence('recompress', 'resize_images', 'finish', function () {
        console.log('Finished');
        done();
    });
});