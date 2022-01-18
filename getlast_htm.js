/* Modified getlast_chapter.sj by Raylex Lee on 20 February 2021
   Purpose : Output the 3-digit total number of htms from htms.txt
   Usage : node getlast_htm.js
*/
const fs = require('fs');
const Htms = fs.readFileSync('./htms.txt', {encoding:'utf8', flag:'r'}).replace(/\n+$/, "").split('\n');
const LastHtm = Htms.pop();  
console.log(LastHtm.split(' ')[0])