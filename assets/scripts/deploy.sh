#!/bin/bash

# Source environment variables from file
source deployment-env-variables 

# Path to project-dev repository
PROJECT_DEV_PATH=$DEV_PATH

# Path to project-prod repository
PROJECT_PROD_PATH=$PROD_PATH

# Make sure the main branch of project-dev is up-to-date
cd $PROJECT_DEV_PATH
git checkout main
# git pull

# website is within docs folder
cd docs

cp $PROJECT_DEV_PATH/docs/_config.yml $PROJECT_DEV_PATH/docs/_config_dev.yml
python3 assets/scripts/update_baseurl.py $PROJECT_DEV_PATH/docs/_config.yml "/family-history-prod"


# Build Jekyll website in project-dev repository
# Install Jekyll dependencies if Gemfile.lock does not exist
if [ ! -f "$PROJECT_DEV_PATH/docs/Gemfile.lock" ]; then
  bundle install
fi
bundle exec jekyll build

# Delete old contents of project-prod repository (excluding .git and _config.yml)
cd $PROJECT_PROD_PATH
find . -type f -not -path '*/\.*' -delete
find . -type d -empty -delete

# Copy new contents from project-dev to project-prod
cp -r $PROJECT_DEV_PATH/docs/_site/* $PROJECT_PROD_PATH

# Update baseurl in _config.yml of project-prod
cp $PROJECT_DEV_PATH/docs/_config_dev.yml $PROJECT_DEV_PATH/docs/_config.yml

# Commit and push changes to project-prod repository
cd $PROJECT_PROD_PATH
git add .
#git commit -m "Update production site"
#git push