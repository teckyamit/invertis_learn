const { chromium } = require('@playwright/test');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  const results = [];
  for (const width of [1440, 390]) {
    for (const route of ['/', '/engineering', '/resources', '/career-pathways', '/about', '/programmes', '/programmes/BTECH-CSE', '/programmes/BTECH-CSE?entry=lateral', '/programmes/BTECH-CSE-AI', '/programmes/BTECH-CSE-CC', '/programmes/DIP-CSE', '/programmes/MTECH-CSE', '/programmes/BTECH-CSE-IOT', '/programmes/PHD-009', '/phd', '/syllabus', '/pyq']) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [], failed = [], css = [];
      const onError = e => errors.push(e.message);
      const onFail = r => failed.push(r.url());
      const onResponse = r => { if (r.request().resourceType() === 'stylesheet') css.push({ url: r.url(), status: r.status() }); };
      page.on('pageerror', onError); page.on('requestfailed', onFail); page.on('response', onResponse);
      const response = await page.goto('http://127.0.0.1:3000' + route, { waitUntil: 'networkidle' });
      const style = await page.evaluate(() => ({
        display: getComputedStyle(document.body).display,
        font: getComputedStyle(document.body).fontFamily,
        background: getComputedStyle(document.body).backgroundColor,
        heading: document.querySelector('h1') && getComputedStyle(document.querySelector('h1')).fontFamily,
        footerBackground: document.querySelector('footer') && getComputedStyle(document.querySelector('footer')).backgroundColor,
        columns: [...document.querySelectorAll('.grid')].map(e => getComputedStyle(e).gridTemplateColumns),
        grids: [...document.querySelectorAll('.grid')].map(e => getComputedStyle(e).display),
        overflow: document.documentElement.scrollWidth > innerWidth,
        nav: !!document.querySelector('nav'), footer: !!document.querySelector('footer'),
      }));
      const pass = response.status() === 200 && css.length > 0 && css.every(r => r.status === 200) && style.display === 'flex' && style.grids.every(x => x === 'grid') && !style.overflow && !errors.length && !failed.length;
      results.push({ route, width, status: response.status(), css, style, errors, failed, pass });
      console.log(pass ? 'PASS' : 'FAIL', width, route);
      if (route === '/engineering') await page.screenshot({ path: `test-results/styles-${width}.png`, fullPage: true });
      page.off('pageerror', onError); page.off('requestfailed', onFail); page.off('response', onResponse);
      await page.close();
    }
  }
  fs.writeFileSync('test-results/global-styles.json', JSON.stringify(results, null, 2));
  await browser.close();
  if (results.some(r => !r.pass)) process.exitCode = 1;
})().catch(e => { console.error(e); process.exitCode = 1; });

