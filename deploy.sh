#!/usr/bin/env bash
target="../lazd.github.io-deploy"

# Perform build
echo "Performing build..."
grunt clean default

if [ $? != 0 ]; then
	echo "Build failed, aborting deploy"
	exit
fi

# Go to the target dir
cd $target

# Fetch the latest
git pull

if [ $? != 0 ]; then
	echo "Pull failed, aborting deploy"
	exit
fi

# Blow it all away
rm -rf *.html styles scripts

# Go back to the build dir
cd -

# Copy all files
cp -r build/* $target/

# Go back to the target dir
cd $target

# Commit to git
git add .
git commit -m "Updated"
git push

echo "Deploy complete"
