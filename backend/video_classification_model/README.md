# Judging a video by its bitstream cover

This repository is the official implementation of [Judging a video by its bitstream cover](https://arxiv.org/pdf/2309.07361v1.pdf).

## Overview

Classifying videos into distinct categories, such as Sport and Music Video, is crucial for multimedia understanding and retrieval, especially
in an age where an immense volume of video content is constantly being generated. Traditional methods require video decompression to extract pixel-level features like color, texture, and motion, thereby
increasing computational and storage demands. Moreover, these methods often suffer from performance degradation in low-quality videos. We present a novel approach that examines only the post-compression
bitstream of a video to perform classification, eliminating the need for bitstream. We validate our approach using a custombuilt data set comprising over 29,000 YouTube video clips, totaling 6,000 hours and spanning 11 distinct categories. Our preliminary evaluations indicate precision, accuracy, and recall rates well over 80%.

## Requirements
All experiments use the tensorflow. We recommend installing the following package versions:

* &nbsp;&nbsp; python=3.6.5 

* &nbsp;&nbsp; tensorflow-gpu=2.4.0


Dependency packages can be installed using following command:
```
pip install -r requirements.txt
```

## Dateset
### Download
We created a large data set consisting of 29,142 video clips, each containing at least 3,000 frames.
[Download](https://tinyurl.com/bitstream-video-data)



### Data preprocess
Transcoded the input video to different Mbps using the FFmpeg open-source H.264/AVC encoder with the same encoding settings.

```
Average Bitrate (ABR) mode: ffmpeg -i input.mp4 -c:v libx264 -b:v 1.5M output.mp4
Constant Bitrate (CBR) mode: ffmpeg -i input.mp4 -c:v libx264 -crf 23 output.mp4
```
Extract bitstream cover of the videos

```
cd ffmpeg_frame_size_calculate
bash deal.sh
```


Merge and preprocess data
```
python data_deal.py
```

## Training

```
python main.py
```

## Inference

```
python predict.py
```


## Acknowledgement
1. The implementation is based on the repo: [ffmpeg-bitrate-stats](https://github.com/slhck/ffmpeg-bitrate-stats) and [Deep Learning for Time Series Classification](https://github.com/hfawaz/dl-4-tsc).
