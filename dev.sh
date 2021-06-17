#!/usr/bin/env bash
# @AUTHOR: Chun-Jie Liu
# @CONTACT: chunjie.sam.liu.at.gmail.com
# @DATE: 2020-06-28 17:04:53
# @DESCRIPTION:

# Number of input parameters
git pull
[ -d venv ] || eval '`which python3` -m venv venv'

source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

cd evea/evea-angular/
npm install
