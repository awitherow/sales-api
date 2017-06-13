#!/bin/bash

set -e

# please run this script from the root of the project,
# like ./scripts/setup.sh

source .env

echo "Preparing"
echo "..."

rm -rf serverless.yml
cp serverless-template.yml serverless-template.yml.tmp

# https://stackoverflow.com/a/525612/1475153
sed -i '' 's~$USER_POOL_ARN~'"$USER_POOL_ARN"'~g' serverless-template.yml
sed -i '' 's~$AWS_REGION~'"$AWS_REGION"'~g' serverless-template.yml

cat serverless-template.yml

mv serverless-template.yml serverless.yml
mv serverless-template.yml.tmp serverless-template.yml

echo "serverless.yml prepared"
exit