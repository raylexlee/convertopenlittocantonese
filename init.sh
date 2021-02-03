#!/bin/bash
rm *html
BOOK_URL=${1?"missing link from http://open-lit.com"}
curl -o book.html $BOOK_URL
TITLE=$(grep html版 book.html | sed 's/^.*blank">\(.*\)<\/a>.*$/\1/')
BOOKZIP_URL=$(grep 下載本書html book.html | sed 's/^.*href="\([^"]*\)".*$/\1/')
mkdir $TITLE
cd $TITLE
mkdir original
mkdir temp
mkdir spx
mkdir cover
mkdir audio
mkdir youtube
curl -o lit.zip $BOOKZIP_URL
cd original
unzip ../lit.zip
cd ..
grep -e 'id=[0-9]*">' ../book.html | sed 's/.*id=\([0-9]*\)">\([^<]*\)<[^>]*>\([^<]*\)<.*/\1 \2 \3/' | nl -n rz -w 3 -s " $TITLE " > coverparameters.txt
LAST_CHAPTER=$(node ../gen2spx.js)
echo $LAST_CHAPTER