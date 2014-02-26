#!/usr/bin/env bash
buildRepo=`pwd`
target="../lazd.github.io-deploy"

# Perform build
echo "Performing deploy build..."
grunt deploy

if [ $? != 0 ]; then
	echo "Build failed, aborting deploy"
	exit
fi

# Go to the target dir
cd $target

if [ $? != 0 ]; then
	echo "Switching to target directory failed, aborting deploy"
	exit
fi

# Fetch the latest
echo "Pulling the latest deployment from github..."
git pull

if [ $? != 0 ]; then
	echo "Pull failed, aborting deploy"
	exit
fi

# Blow it all away
echo "Cleaning out old files..."
rm -rf *.html styles scripts

# Go back to the build dir
cd $buildRepo

if [ $? != 0 ]; then
	echo "Switching to build directory failed, aborting deploy"
	exit
fi

# Copy all files
echo "Copying new files..."
cp -r build/* $target/

if [ $? != 0 ]; then
	echo "File copy failed, aborting deploy"
	exit
fi

# Go back to the target dir
cd $target

if [ $? != 0 ]; then
	echo "Switching to target failed, aborting deploy"
	exit
fi

# Commit to git
echo "Deploying to git..."
git checkout master
git add .
git commit -m "Updated"
git push origin master

if [ $? != 0 ]; then
	echo "Deploy failed"
	exit
else
	echo "Deploy complete"
fi
