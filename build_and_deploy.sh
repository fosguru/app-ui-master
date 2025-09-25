#!/usr/bin/env bash
set -e

timestamp=$(date +%s)

# https://github.com/fabfuel/ecs-deploy
# pip install ecs-deploy

function build() {
   docker build \
    --platform linux/amd64 \
    -t 389472934677.dkr.ecr.us-east-1.amazonaws.com/datachef-development-ecr-app-ui:development-latest \
    -t "389472934677.dkr.ecr.us-east-1.amazonaws.com/datachef-development-ecr-app-ui:development-${timestamp}" \
    .

  aws ecr get-login-password --region us-east-1 \
    | docker login --username AWS --password-stdin 389472934677.dkr.ecr.us-east-1.amazonaws.com

  docker push "389472934677.dkr.ecr.us-east-1.amazonaws.com/datachef-development-ecr-app-ui:development-${timestamp}"
}

build

ecs deploy \
  --region us-east-1 \
  --rollback \
  datachef-development datachef-development-ecs-appui \
  -t "development-${timestamp}"

docker push 389472934677.dkr.ecr.us-east-1.amazonaws.com/datachef-development-ecr-app-ui:development-latest
