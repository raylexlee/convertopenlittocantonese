/* Modified from gen2spx.js by Raylex Lee on 3 February 2021
   Purpose : Prepare the text of each chapter of the fiction
   Ouput the last chapter 3 digit number to standard output 
*/
const fs = require('fs');
const subst = `<break time="100ms" />`;
const regex = /<br.{0,2}>/mg;
const pattern = /<\/font><\/h4>(.*)<hr>/mus;
const xpatt = k => `<[^<]+${k}\.BMP[^>]+>`;
const Chapters = fs.readFileSync('./coverparameters.txt', {encoding:'utf8', flag:'r'}).replace(/\n+$/, "").split('\n');
const xcangjie = JSON.parse(fs.readFileSync('./xcangjie.json'));
const xPattern = {};
const xKeys = Object.keys(xcangjie);
xKeys.forEach(k => { 
  xPattern[k] = new RegExp(xpatt(k), 'gm'); 
});
const x = JSON.parse(fs.readFileSync('../xtext.json'));
Chapters.forEach(Chapter => {
  let chapter, book, origin, mone, mtwo;
  [chapter, book, origin, mone, mtwo] = Chapter.split(' ');
  const rawdata = fs.readFileSync(`./original/${origin}.html`, {encoding:'utf8', flag:'r'});
  const m = rawdata.match(pattern);
  let paras = m[1];
  xKeys.filter(k => chapter in xcangjie[k]).forEach(k => {
    paras = paras.replace(xPattern[k], x[k]);
  });
  paras = paras.split(regex);
  paras.pop();
  paras.pop();                      
  fs.writeFileSync(`./${chapter}.txt`, paras.join('\n'));
});
const LastChapter = Chapters.pop();  
console.log(LastChapter.substr(0, 3))
