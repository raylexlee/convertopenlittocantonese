/* Adapted from gen2spx.js by Raylex Lee on 3 February 2021
   Purpose : Locate those no show fonts, if any.   Usage : node gen2spx.js
*/
const fs = require('fs');
const regex = /<br>/mg;
const pattern = /<\/font><\/h4>(.*)<hr>/mus;
const xcangjie = {};
const Chapters = fs.readFileSync('./coverparameters.txt', {encoding:'utf8', flag:'r'}).replace(/\n+$/, "").split('\n');
Chapters.forEach(Chapter => {
  let chapter, book, origin, rest;
  [chapter, book, origin, ...rest] = Chapter.split(' ');
  const rawdata = fs.readFileSync(`./original/${origin}.html`, {encoding:'utf8', flag:'r'});
  const m = rawdata.match(pattern);
  const c = m[1].match(/\/[A-Z]+[A-Z1-9]\.B/mg);
  if (c === null) return;
  c.forEach(e => {
    const cc = e.substr(1, e.length - 3);
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
const xm = JSON.parse(fs.readFileSync('../xMasterText.json'));
const xt = {}
Object.keys(xcangjie).forEach(k => { xt[k] = (k in xm) ? xm[k] : ""; });
fs.writeFileSync('./xtext.json', JSON.stringify(xt))
const xk = Object.keys(xt).filter(k => xt[k] === '');
if (xk.length >= 1) console.log(xk);
