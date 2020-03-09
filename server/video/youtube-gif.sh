#!/bin/bash

# Get options from command line, i.e. 'youtube-gif.sh -c AF -l https://www.youtube.com/watch?v={id}'
while getopts ":l:c:" opt; do
  case $opt in
    l) LINK="$OPTARG" # Example: 'https://www.youtube.com/watch?v={id}' YouTube video link
    ;;
    c) COUNTRY="$OPTARG" # Example: 'AF' Two letter country iso
    ;;
    \?) echo "Invalid option -$OPTARG" >&2
    ;;
  esac
done

# convert the youtube video to a compressed mp4 with set size and lengthss
START='30' # start 30 seconds in
LENGTH='10' # end after 10 seconds
SIZE='1380:440:sws_dither=ed' # size of the output GIF
ffmpeg -i $(youtube-dl -f bestvideo[ext=mp4] --get-url $LINK) -vcodec h264 -b:v 1000k -ss $START -t $LENGTH country_videos/$COUNTRY.mp4