/* Adapted from gen2spx.js by Raylex Lee on 3 February 2021
   Purpose : Locate those no show fonts, if any.   Usage : node gen2spx.js
*/
const fs = require('fs');
const regex = /<br>/mg;
const pattern = /^.*color=navy>(.*)<\/br>(.*)<\/font><\/h4>\r\n\t\t\t(.*)$/m;
const Chapters = fs.readFileSync('./coverparameters.txt', {encoding:'utf8', flag:'r'}).replace(/\n+$/, "").split('\n');
Chapters.forEach(Chapter => {
  let chapter, book, origin, rest;
  [chapter, book, origin, ...rest] = Chapter.split(' ');
  const rawdata = fs.readFileSync(`./original/${origin}.html`, {encoding:'utf8', flag:'r'});
  const m = rawdata.match(pattern);
  const c = m[3].match(/[A-Z]*\.B/mg);
  if (c !== null) console.log(chapter, ' ' , c.map(e => e.substr(0, e.length - 2)));
});
