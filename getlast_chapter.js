#!/usr/bin/env node
/* Modified gen2spx.sj by Raylex Lee on 15 February 2021
   Purpose : Output the 3-digit total number of chapters from coverparameters.txt
   Usage : node getlast_chapter.js
*/
const fs = require('fs');
const Chapters = fs.readFileSync('./coverparameters.txt', {encoding:'utf8', flag:'r'}).replace(/\n+$/, "").split('\n');
const LastChapter = Chapters.pop();  
console.log(LastChapter.split(' ')[0])
