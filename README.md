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

Then run  `.scripts/setup.sh`

## scripts

### setup.sh

once you have gotten the above steps done, run `.scripts/setup.sh`. This will set up your env based on the variables we sourced, and create all of the files required for your serverless backend.


### mock.sh 

this will mock any of the functions you wish to fire off. simply call

```bash
./scripts/mock.sh add-user 
```

It will then use the events file to run your mock json against the serverless endpoint.



## deployment

Before any form of deployment, make sure you have your environment variables properly set up and then run the script found at `scripts/setup_serverless_yml.sh`.
