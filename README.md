How to use
-----------

1. edit docker-compose.yml and modify `original` and `generated` paths to your images folder
   1. where `original` folder is your folder with `jpg` or `png` pictures (there is hardcoded `*.{jpg,png}` filter)
   1. where `generated` folder is your folder where new images will be saved
1. if you would like to add watermark, edit path to your `watermark.png` in docker-compose.yml
1. you can edit output picture sizes in `gulpfile.js` (125x125, 300x300, 270x190, 1024x1024) 
1. this script will regenerate pictures if original has changed
1. first time run will recompress your original images. you can disabled it via modify `gulpfile.js` and modify runSequence to only `resize_images`

How to run
------------
1. `docker-compose up`

How to rebuild modified docker image
------------
1. `docker-compose up --build`