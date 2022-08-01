#!/bin/sh
if [ ! -f "pid" ]
then
  node ../lib/deamon.mjs ../conf/config.json &
  echo $! > pid
fi  