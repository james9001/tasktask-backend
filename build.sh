#!/bin/sh

#You don't have to use this script, I just find it slightly more convenient to type ./build.sh instead of the full command each time
#Also, rootless docker is becoming more popular - obviates the need for sudo
sudo docker build -t tasktask-frontend:latest .
