<h1 align="center">Demo for <i>Judging a video by its bitstream cover</i>
</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">
    <img alt="License: CC BY 4.0" src="https://img.shields.io/badge/License-CC BY 4.0-yellow.svg" />
  </a>
</p>

## Overview

This repository contains an a demo implementation for the paper Judging a video by its bitstream cover. It consists of a vanilla JS+JQuery front-end interface with a Flask back-end. 


## Getting started

```sh
Overview of directory. Names should be self-explanatory.

1. "backend" contains app.py, where you will launch the packend app for listening
2. "frontend" contains index.html, entry point for user interface
3. "scripts" contains extra JS that is not used (for backup only)
4. "styles" contains deprecated css files (for backup only)


```


## Setup 

### Dependencies
* Listed in `requirements.txt`


### Install

```sh
cd backend
pip install -r requirements.txt
python3 app.py

then open index.html in browser

and you are good to go.
```


### Usage

1. Upload multiple files via click or drag and drop
2. Backend will save, process, and return classification of that video within 11 broad categories as defined by youtube ->
	- Beauty, Education, Entertainment, Knowledge, Music, News, Sports, Technology, Food, Game, Movie

## Author

👤 **Felix G**


## 📝 License

This project is [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) licensed.

***
