# sales api

## .env

Create a .env with at minimum

```bash
export AWS_ACCESS_KEY_ID=
export AWS_SECRET_ACCESS_KEY=
export USER_POOL_ARN=
export AWS_REGION=
```

source this when completed.

```bash
source .env
```

## deployment

Before any form of deployment, make sure you have your environment variables properly set up and then run the script found at `scripts/setup_serverless_yml.sh`.