#!/bin/bash

source name.sh
nameApp
MU-NODE-MICRO ssh MU-"cd microservice;git pull;pm2 restart email;pm2 log"
