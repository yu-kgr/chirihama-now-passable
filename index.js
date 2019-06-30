'use strict';

const puppeteer = require('puppeteer');

(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://douro-k.pref.ishikawa.jp/p/wd012060.html', {
    waitUntil: 'domcontentloaded'
  });

  const roadClosedList = await page.$$('.kukan');
  const listTexts = [];
  let result = '現在「通行可能」です。';

  for (let i = 0; i < roadClosedList.length; i++) {
    const textContentProp = await roadClosedList[i].getProperty('textContent');
    const textContent = await textContentProp.jsonValue();

    const check = /千里浜なぎさドライブウェイ/.test(textContent);
    if (check == true) {
      result = '現在「通行禁止」です。'
    }
  }
  console.log(result);

  await browser.close();
})();


