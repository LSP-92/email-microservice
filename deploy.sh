#!/bin/bash

source name.sh
nameApp
git commit -am "commit-deploy"
git push
ssh MU-NODE-MICRO "cd microservice;git pull;pm2 restart mail;pm2 log"
