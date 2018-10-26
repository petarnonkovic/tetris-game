#! /usr/bin/bash

checkForPackageJson() {
  FILE="package.json"
  if [[ -f "$FILE" ]]
  then
    echo "package.json exists, installing packages ..."
    yarn
  else
    npm init -y
  fi
}

loadDependencies() {
  COMMAND="yarn add"
  while read -r PACKAGE
    do
      COMMAND+=" $PACKAGE"
  done < "./dependencies.txt"
  # run install
  $COMMAND
}

loadDevDependencies() {
  COMMAND="yarn add -D"
  while read -r PACKAGE
    do
      COMMAND+=" $PACKAGE"
  done < "./devDependencies.txt"
  # run install
  $COMMAND
}

# run functions
checkForPackageJson
loadDependencies
loadDevDependencies

echo "Install completed."
