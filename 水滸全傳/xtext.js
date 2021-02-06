let xtext;
const imgSrc = c => `http://open-lit.com/mpf/${c.substr(0,1).toLowerCase()}/${c.toUpperCase()}.BMP`;
const imgElement = c => 
  `<img src="${imgSrc(c)}" align=absmiddle border=0>`;
const inputElement = k => `<input type="text" name="${k}" id="${k}" value="${xtext[k]}">`;  
fetch('xtext.json')
    .then(response => response.json())
    .then(data => { 
      xtext = data;
      LayoutTable();
    });
function LayoutTable() {      
document.querySelector('div').innerHTML = ` <table> <tr>
${ Object.keys(xtext).map(key => `<td>${key}</td>
  <td>${imgElement(key)}</td>
  <td>${inputElement(key)}</td>`)
  .join('</tr><tr>') }
        </tr></table>`;
}        
function CopyCodes() {
  const textHint = document.getElementById('idHint');
  Object.keys(xtext).forEach(k => {
    xtext[k] = document.getElementById(k).value;
  });
  textHint.value = `echo ${JSON.stringify(xtext).replace(/[{}"]/gm, '\\$&')}>xtext.json`;
  const r = document.createRange();
  r.selectNode(textHint);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
}
        
