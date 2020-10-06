#!/usr/bin/env bash
# @AUTHOR: Chun-Jie Liu
# @CONTACT: chunjie.sam.liu.at.gmail.com
# @DATE: 2020-06-22 16:29:07
# @DESCRIPTION:

# Number of input parameters

git pull

source venv/bin/activate
pip install -r requirements.txt

cd evea/evea-angular/
npm install

npm run build:prod
# npm run compodoc
# npm run stat
