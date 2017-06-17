#!/bin/bash
# mock.sh requires serverless to be installed globally.
# please run npm i -g serverless and configure that if you have not
# this should be self explanitory...

# script requirements
# 1) setting up mocks
# proper mocks set up in src/mocks with format of
# src/mocks/FUNCTION_NAME-event.json
# 2) function...
# clearly, a function needs to exist to run the mock against.
set -e

echo "running mock for function" $1

serverless webpack invoke --function $1 --path src/mocks/$1-event.json