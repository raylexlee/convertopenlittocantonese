/* Modified from my-ms-translator/get4spx.js by Raylex Lee on 3 February 2021
   Purpose : Prepare the small chunk size of ssml parts of each chapter of the fiction
   Usage : node gen2spx.js
   Save : 001_?.ssml 002_?.ssml ... 060_?.ssml in sub-directory spx (e.g. fiction has 60 chap
   Ouput the last chapter 3 digit number to standard output 
*/
const StandardVoice = ['zh-HK-TracyRUS',  'zh-HK-Danny', 'zh-HK-TracyRUS' ];
const Neuralvoice = ["zh-HK-HiuMaanNeural", "zh-HK-WanLungNeural", "zh-HK-HiuGaaiNeural" ];
const fs = require('fs');
const voiceName = StandardVoice;
const voiceText = (voice, text) => `<voice name="${voice}">
        ${text}
    </voice>`;
const ssml = (title, body) => `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="zh-HK">
    ${title}
    ${body}
</speak>
`;
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
  const titleVoice = voiceText(voiceName[2], `${mone}${subst}${mtwo}`);
  let j = 0;
  let accPara = '';
  let cnt = 0;
  while (paras.length) {
    if ((cnt + 2*(paras[0].length) + subst.length) > 4500) {
      j++;
      const bodyVoice =  voiceText(voiceName[1], accPara);
      const title = (j === 1) ? titleVoice : '';
      fs.writeFileSync(`./spx/${chapter}_${j.toString().padStart(3,'0')}.ssml`, ssml(title, bodyVoice));
      cnt = 0;
      accPara = '';
    }
    const topPara = paras.shift();
    accPara = `${accPara}${subst}${topPara}`;
    cnt += 2*(topPara.length) + subst.length;
  }
  if (accPara) {
      j++;
      const bodyVoice =  voiceText(voiceName[1], accPara);
      const title = (j === 1) ? titleVoice : '';
      fs.writeFileSync(`./spx/${chapter}_${j.toString().padStart(3,'0')}.ssml`, ssml(title, bodyVoice));
  }
});
const LastChapter = Chapters.pop();  
console.log(LastChapter.substr(0, 3))
