const http = require('http');

http.get('http://127.0.0.1:3000/engineering', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const cssLinks = data.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi) || [];
    console.log('CSS links found in HTML:', cssLinks);
    const styleTags = data.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
    console.log('Style tags found in HTML:', styleTags.length);
    if (cssLinks.length > 0) {
      cssLinks.forEach(link => {
        const hrefMatch = link.match(/href=["']([^"']+)["']/i);
        if (hrefMatch) {
          const href = hrefMatch[1];
          console.log('Checking CSS url:', href);
          const fullUrl = href.startsWith('http') ? href : 'http://127.0.0.1:3000' + href;
          http.get(fullUrl, (cssRes) => {
            console.log('CSS resource response status:', cssRes.statusCode, 'for', href);
            let cssData = '';
            cssRes.on('data', c => cssData += c);
            cssRes.on('end', () => {
              console.log('CSS bytes received:', cssData.length, 'Contains tailwind classes?', cssData.includes('bg-brand-navy') || cssData.includes('text-brand-blue') || cssData.includes('flex'));
            });
          });
        }
      });
    } else {
      console.log('HTML snippet (first 1000 chars):', data.substring(0, 1000));
    }
  });
}).on('error', err => {
  console.error('Fetch error:', err.message);
});

