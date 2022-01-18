/* Created by Raylex Lee on 11 December 2021
   Purpose : ./merg_paragraph.js <file>
*/
const fs = require('fs');
const Lines = fs.readFileSync(process.argv[2], {encoding:'utf8', flag:'r'}).split('\n');
const Output = Lines.filter(e => e.length >= 1).map(e => `${e}${(e.endsWith("。") || e.length < 25) ? "\n" : ""}`).join('');
console.log(Output);
