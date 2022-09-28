const puppeteer = require('puppeteer');
require('dotenv').config()

async function main() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.setViewport({width: 1200, height: 720});
  await page.goto('https://estudante.sesisenai.org.br/login', { waitUntil: 'networkidle0' }); // wait until page load
  await page.type('[name="user"]', process.env.SENAI_CREDENTIAL);

  await page.type('[name="password"]', process.env.SENAI_SECRET);

  // click and wait for navigation
  await Promise.all([
    page.click('[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);

  await page.goto('https://estudante.sesisenai.org.br/desempenho', { waitUntil: 'networkidle0' });
 
  await Promise.all([
    page.click('#heading999956'),
  ])
  await page.waitForTimeout(5000);
  await page.click('#frequencia-tab999956')
  await page.waitForTimeout(5000);
  await page.select('#frequencia999956 > select', '6');
  await page.waitForTimeout(5000);

  var absenceCount = 0;

  let today = new Date().toLocaleDateString('pt-br')

  console.log(today)

  for(var i = 1; i<=6; i++){
    await page.click(`#frequencia999956 > div > div:nth-child(${i})`);
  }

  page.on('response', async (response) => {    
    if (response.url() == "https://estudante.sesisenai.org.br/api/desempenho/frequencia/999956/7593"){
        console.log('XHR response received'); 
        console.log(await response.json()); 
    }
  }); 

  page.on('response', async (response) => {    
    if (response.url() == "https://estudante.sesisenai.org.br/api/desempenho/frequencia/999956/7588"){
        console.log('XHR response received'); 
        console.log(await response.json()); 
    }
  });
  
  page.on('response', async (response) => {    
    if (response.url() == "https://estudante.sesisenai.org.br/api/desempenho/frequencia/999956/7589"){
        console.log('XHR response received'); 
        console.log(await response.json()); 
    }
  }); 
  page.on('response', async (response) => {    
    if (response.url() == "https://estudante.sesisenai.org.br/api/desempenho/frequencia/999956/7591"){
        console.log('XHR response received'); 
        console.log(await response.json()); 
    }
  }); 

  page.on('response', async (response) => {    
    if (response.url() == "https://estudante.sesisenai.org.br/api/desempenho/frequencia/999956/7592"){
        console.log('XHR response received'); 
        console.log(await response.json()); 
    }
  }); 
}
main();
