#!/bin/sh
 

 
Folder_A="./data/MLB"
for file_a in ${Folder_A}/*
do
    out_filename=`basename $file_a`
    in_filename="_CIDI_"${out_filename}
    python3 -m ffmpeg_bitrate_stats  -a time -c 30 -of csv $Folder_A/$out_filename
done

