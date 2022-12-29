#!/bin/sh

CURRENT_DIR=$(cd $(dirname $0);pwd)
find $CURRENT_DIR/../packages* -name package-lock.json | xargs rm -rf
find $CURRENT_DIR/../packages* -name node_modules | xargs rm -rf
rm -rf $CURRENT_DIR/../node_modules
rm -rf $CURRENT_DIR/../package-lock.json