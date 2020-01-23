#!/bin/bash

# brew install ffmpeg
# brew install youtube-dl
# brew install imagemagick

# convert the video file to GIF with ffmpeg
START='47' # start 60 seconds in
LENGTH='55' # end after 4 seconds

ID='8Z1eMy2FoX4&t' # YouTube video ID, i.e. https://www.youtube.com/watch?v={ID}

# fetch the video file with youtube-dl
# convert it to GIF and optimize using imagemagick
ffmpeg -i $(youtube-dl -f 18 --get-url https://www.youtube.com/watch?v=$ID) -ss $START -t $LENGTH -vf "fps=10,scale=1380:440" -c:v pam -f image2pipe - | convert -delay 5 - -loop 0 -dither None -colors 120 -layers optimize output.gif