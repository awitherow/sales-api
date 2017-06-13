#!/bin/bash

set -e

# please run this script from the root of the project,
# like ./scripts/setup.sh

source .env

echo "Preparing serverless.yml"
echo "..."

USER_POOL_ARN=$USER_POOL_ARN
AWS_REGION=$AWS_REGION

# https://stackoverflow.com/a/525612/1475153
sed 's~$USER_POOL_ARN~'"$USER_POOL_ARN"'~g' serverless-template.yml
sed 's~$AWS_REGION~'"$AWS_REGION"'~g' serverless-template.yml

mv serverless-template.yml serverless.yml

echo "All environment variables successfully transferred"
exit