'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');

var imageResize = require('gulp-image-resize');
var debug = require('gulp-debug');
var changed = require("gulp-changed");
var watermark = require("gulp-watermark");

// Config
var config = {
    source_images_path      : '/var/data/original',
    images_path             : '/var/data/generated',
    //images_upload_path      : 'web/uploads'
};
//
// Images
gulp.task('images', function() {
    return gulp.src(config.source_images_path)
        .pipe(cache(imagemin({progressive: true, interlaced: true})))
        .on('error', console.log)
        .pipe(gulp.dest(config.images_path))
        .pipe(reload({ stream: true }))
    ;
});

// Copy all static images
gulp.task('imagess', ['clean'], function() {
  return gulp.src(config.source_images_path)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(config.images_path+'/'));
});

gulp.task('images:watch', function() {
    return gulp.watch(config.source_images_path + "/*/**/*.{jpg,png}", ['generate']).on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

    //gulp.src([config.images_path + "/themes/*.png", config.images_path + "/design2016/*.png"], {base: "./"})
    //.pipe(debug())
    //.pipe(imageResize({ format: 'webp' }))
    //.pipe(gulp.dest("./"))
    //.pipe(imageResize({ format: 'jpg' }))
    //.pipe(gulp.dest("./"));
    
gulp.task("generate", function () {
    gulp.src(config.source_images_path + "/*/**/*.{jpg,png}", { base: config.source_images_path })
    .pipe(changed(config.images_path + "/pictures"))
    .pipe(debug())//.pipe(changed(config.images_path + "/270x190/"))
    .pipe(imageResize({ width : 1024, format: 'webp' }))
    .pipe(watermark({
        image: "watermark.png",
        resize: '221x72',
        gravity: 'Center'
    }))
    .pipe(gulp.dest(config.images_path + "/pictures"))
    .pipe(debug())
    .pipe(imageResize({ format: 'jpeg' }))
    .pipe(gulp.dest(config.images_path + "/pictures"))
    .pipe(changed(config.images_path + "/300x300/"))
    .pipe(imageResize({ width : 300, height: 300, gravity: 'Center', crop: true, format: 'webp', upscale: true }))
    .pipe(gulp.dest(config.images_path+'/300x300'))
    .pipe(debug())
    .pipe(imageResize({ format: 'jpeg' }))
    .pipe(gulp.dest(config.images_path+'/300x300'))
    .pipe(imageResize({ width : 270, height: 190, gravity: 'Center', crop: true, format: 'webp', upscale: true }))
    .pipe(gulp.dest(config.images_path+'/270x190'))
    .pipe(debug())
    .pipe(imageResize({ format: 'jpeg' }))
    .pipe(gulp.dest(config.images_path+'/270x190'))
    .pipe(imageResize({ width : 125, height: 125, gravity: 'Center', crop: true, format: 'webp', upscale: true }))
    .pipe(gulp.dest(config.images_path+'/125x125'))
    .pipe(debug())
    .pipe(imageResize({ format: 'jpeg' }))
    .pipe(gulp.dest(config.images_path+'/125x125'))
});

gulp.task('generate:watch', function() {
    gulp.watch(config.source_images_path + "/*/**/*", function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.run('generate');
    });
});

gulp.task('images_convert_minify', function() {
    return gulp.src(config.images_path+'/**/*')
        .pipe(cache(imagemin({progressive: true, interlaced: true, optimizationLevel: 7})))
        .on('error', console.log)
        .pipe(gulp.dest(config.images_path))
        .pipe(reload({ stream: true }))
    ;
});
//
// Main Tasks

// Default
gulp.task('default', ['generate']);