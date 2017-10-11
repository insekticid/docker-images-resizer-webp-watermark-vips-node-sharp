How to use
-----------

1. edit docker-compose.yml and modify `unprocessed`, `original` and `generated` paths to your image folders
   1. where `unprocessed` folder is your folder with new pictures to process
   1. where `generated` folder is your folder where new images will be saved
   1. where `original` folder is your folder with original pictures without watermark
1. if you would like to add watermark, edit path to your `watermark.png` in docker-compose.yml
1. you can edit output picture sizes in `gulpfile.js` (125x125, 300x300, 270x190, 1024x1024) 

How to run
------------
1. `docker-compose up`

How to rebuild modified docker image
------------
1. `docker-compose up --build`