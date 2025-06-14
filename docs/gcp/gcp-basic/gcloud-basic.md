---
sidebar_position: 2
displayed_sidebar: gcpSidebar
---

# Gcloud Basic

Follow this [guideline](https://cloud.google.com/sdk/docs/install) to install gcloud cli in your local

```sh
gcloud --version
```

## Setup multiple configurations

- [x] You have different projects
- [x] You have different accounts

```sh
gcloud config configurations list
gcloud config configurations delete [config_name]
gcloud config configurations activate [config_name]
gcloud auth login
# Dev config
gcloud config configurations create dev-config --activate
gcloud auth login            # use dev@gmail.com
gcloud auth application-default login
gcloud config set project dev-project-id

# Prod config
gcloud config configurations create prod-config
gcloud config configurations activate prod-config
gcloud auth login            # use prod@gmail.com
gcloud auth application-default login
gcloud config set project prod-project-id
```

## Grant permissions

```sh
# check perm
gcloud projects get-iam-policy your-project-id \
  --flatten="bindings[].members" \
  --filter="bindings.members:[your-user-email]" \
  --format="table(bindings.role)"
```

```sh
# add perm
gcloud projects add-iam-policy-binding your-project-id \
  --member="user:[your-user-email]" \
  --role="roles/secretmanager.secretAccessor"
```

Best practice, use service account

```sh
gcloud iam service-accounts create my-nest-app-sa \
  --display-name="NestJS Secret Access"
gcloud projects add-iam-policy-binding your-project-id \
  --member="serviceAccount:my-nest-app-sa@your-project-id.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
# create key to use in local
gcloud iam service-accounts keys create ./gcp-sa-key.json \
  --iam-account=my-nest-app-sa@your-project-id.iam.gserviceaccount.com

# remember change mode
chmod u+x ./gcp-sa-key.json
# put in your .env
GOOGLE_APPLICATION_CREDENTIALS="./gcp-sa-key.json"
# or export
export GOOGLE_APPLICATION_CREDENTIALS="./gcp-sa-key.json"
```

### CloudRun

```yml
# borrowed and modified from https://codelabs.developers.google.com/codelabs/cloud-run-django#7
steps:
  # Build the container image
  - name: "gcr.io/cloud-builders/docker"
    args:
      [
        "build",
        "-t",
        "gcr.io/${PROJECT_ID}/${_SERVICE_NAME}:latest",
        "-f",
        "Dockerfile.web",
        "--cache-from",
        "gcr.io/${PROJECT_ID}/${_SERVICE_NAME}:$COMMIT_SHA",
        "--cache-from",
        "gcr.io/${PROJECT_ID}/${_SERVICE_NAME}:$REF_NAME",
        "--cache-from",
        "gcr.io/${PROJECT_ID}/${_SERVICE_NAME}:latest",
        "--build-arg",
        "ARG_1=${ARG_1}",
        ".",
      ]

  # Push the container image to Container Registry
  - name: "gcr.io/cloud-builders/docker"
    args: ["push", "gcr.io/${PROJECT_ID}/${_SERVICE_NAME}"]

  # Run database migrations
  - name: "gcr.io/google.com/cloudsdktool/cloud-sdk"
    entrypoint: "gcloud"
    args:
      [
        "run",
        "jobs",
        "execute",
        "migrate-${_ENVIRONMENT_NAME}",
        "--region",
        "${_REGION}",
        "--wait",
      ]

  # Collect static files
  - name: "gcr.io/google.com/cloudsdktool/cloud-sdk"
    entrypoint: "gcloud"
    args:
      [
        "run",
        "jobs",
        "execute",
        "collectstatic-${_ENVIRONMENT_NAME}",
        "--region",
        "${_REGION}",
        "--wait",
      ]

  # Deploy the container image to Cloud Run
  - name: "gcr.io/google.com/cloudsdktool/cloud-sdk"
    entrypoint: gcloud
    args:
      [
        "run",
        "deploy",
        "${_SERVICE_NAME}",
        "--region",
        "${_REGION}",
        "--image",
        "gcr.io/${PROJECT_ID}/${_SERVICE_NAME}",
        "--network",
        "default",
        "--subnet",
        "default",
        "--set-env-vars=VAR_1=value1,PROJECT_ID=${PROJECT_ID},SECRET_NAME=${_SECRET_NAME}",
      ]

images: ["gcr.io/${PROJECT_ID}/${_SERVICE_NAME}"]
options:
  logging: CLOUD_LOGGING_ONLY
```

### BigQuery

- https://cloud.google.com/bigquery/docs/connect-to-sql?_gl=1*apy037*_up*MQ..&gclid=Cj0KCQjwmK_CBhCEARIsAMKwcD60gNTJH1ySEmhr4RA9X3SiR4ox4ucglr5-Ql0hLVNk0DFaPfDE1lUaAm4TEALw_wcB&gclsrc=aw.ds#console_1

```sh
service-21280600284@gcp-sa-bigqueryconnection.iam.gserviceaccount.com

service-21280600284@gcp-sa-bigqueryconnection.iam.gserviceaccount.com
```
