#!/usr/bin/env bash
CURDIR=$(pwd)
for i in $(ls -l | grep ^d | awk '{print $9;}')
do
cd $CURDIR
./mk_text_subdir $i
done

