const fs = require('fs');
const xtext = JSON.parse(fs.readFileSync('./xtext.json'));
const xMasterText = JSON.parse(fs.readFileSync('./xMasterText.json'));
const newKeys = Object.keys(xtext).filter(k => xtext[k] && !(k in xMasterText));
if (newKeys.length !== 0) { 
  newKeys.forEach(k => {
    xMasterText[k] = xtext[k];
  });
  fs.writeFileSync('./xMasterText.json', JSON.stringify(xMasterText) );
}  