#!/usr/bin/env node
const CDP = require('chrome-remote-interface');

const chromeLauncher = require('chrome-launcher');

function launchChrome(headless=true) {
  return chromeLauncher.launch({
    // port: 9222, // Uncomment to force a specific port of your choice.
    chromeFlags: [
      '--window-size=412,732',
      '--disable-gpu',
      headless ? '--headless' : ''
    ]
  });
}


(async function() {

const chrome = await launchChrome();
const protocol = await CDP({port: chrome.port});

// Extract the DevTools protocol domains we need and enable them.
// See API docs: https://chromedevtools.github.io/devtools-protocol/
const {Page, Runtime} = protocol;
await Promise.all([Page.enable(), Runtime.enable()]);

Page.navigate({url: process.argv[2]});

// Wait for window.onload before doing stuff.
Page.loadEventFired(async () => {
 // const js = "document.getElementsByTagName('a')";
  const js = `
    b=document.getElementsByTagName('a').length; 
    `;
  // Evaluate the JS expression in the page.
  const res_js = await Runtime.evaluate({expression: js});
  let i;
  for (i=0; i<res_js.result.value; i++) {
    const js = `
    b=document.getElementsByTagName('a')[${i}]; 
    c=b.innerHTML+' '+b.href;
    `;
    const result = await Runtime.evaluate({expression: js});
    console.log(result.result.value);
  }

  protocol.close();
  chrome.kill(); // Kill Chrome.
});

})();
