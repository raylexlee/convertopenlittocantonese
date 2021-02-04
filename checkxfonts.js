/* Adapted from gen2spx.js by Raylex Lee on 3 February 2021
   Purpose : Locate those no show fonts, if any.   Usage : node gen2spx.js
*/
const fs = require('fs');
const regex = /<br>/mg;
const pattern = /^.*color=navy>(.*)<\/br>(.*)<\/font><\/h4>\r\n\t\t\t(.*)$/m;
const xcangjie = {};
const Chapters = fs.readFileSync('./coverparameters.txt', {encoding:'utf8', flag:'r'}).replace(/\n+$/, "").split('\n');
Chapters.forEach(Chapter => {
  let chapter, book, origin, rest;
  [chapter, book, origin, ...rest] = Chapter.split(' ');
  const rawdata = fs.readFileSync(`./original/${origin}.html`, {encoding:'utf8', flag:'r'});
  const m = rawdata.match(pattern);
  const c = m[3].match(/[A-Z]*\.B/mg);
  if (c === null) return;
  c.forEach(e => {
    const cc = e.substr(0, e.length - 2);
    if (cc in xcangjie) {
      if (chapter in xcangjie[cc]) { 
        xcangjie[cc][chapter]++;
      } 
      else {
        xcangjie[cc][chapter] = 1;
      }
    } else {
      xcangjie[cc] = {}
      xcangjie[cc][chapter] = 1;
    }
  });
});
fs.writeFileSync('./xcangjie.json', JSON.stringify(xcangjie));
const x = JSON.parse(fs.readFileSync('../xtext.json'));
const xk = Object.keys(xcangjie).filter(k => !(k in x));
if (xk.length >= 1) console.log(xk);