#!/bin/bash
if [[ -e book.html ]]; then
rm book.html
fi
BOOK_URL=${1?"missing link from http://open-lit.com"}
curl -o book.html $BOOK_URL
TITLE=$(grep html版 book.html | sed 's/^.*blank">\(.*\)<\/a>.*$/\1/')
BOOKZIP_URL=$(grep 下載本書html book.html | sed 's/^.*href="\([^"]*\)".*$/\1/')
mkdir $TITLE
cd $TITLE
mkdir original
mkdir spx
mkdir cover
mkdir audio
mkdir youtube
curl -o lit.zip $BOOKZIP_URL
cd original
unzip ../lit.zip
echo $(grep "作者：<br>" readme.html | sed 's/.*作者：<br>　　\([^，]*\).*/\1/') > ../author.txt
cd ..
grep -e 'id=[0-9]*">.*</br>' ../book.html | sed 's/.*id=\([0-9]*\)">\([^<]*\)<[^>]*>\([^<]*\)<.*/\1 \2 \3/' | nl -n rz -w 3 -s " $TITLE " > coverparameters.txt
MISSING_XCANGJIE_IN_XTEXT=$(node ../checkxfonts.js)
if [[ -n $MISSING_XCANGJIE_IN_XTEXT ]]; then
   echo $MISSING_XCANGJIE_IN_XTEXT
   exit 1
fi   
echo $(node ../gen2spx.js) > last_chapter.txt
../all_make_cover 001