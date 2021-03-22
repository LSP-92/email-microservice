#!/bin/bash

source name.sh
nameApp
git commit -am "commit-deploy"
ssh MU-NODE-MICRO "cd microservice;git pull;pm2 restart email;pm2 log"
