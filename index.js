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
 
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  //today = dd+'/'+mm+'/'+yyyy;
  today = '2022-08-25'
  console.log(today)

  for(var i = 1; i<=6; i++){
    await page.click(`#frequencia999956 > div > div:nth-child(${i}) > a > span`);
    await page.waitForTimeout(800);

    const data = await page.evaluate(() => {
      var retorno = '';
      let x = document.querySelector('#uc9999560 > table > tbody').rows;
      for(var i = 1; i <= x.length; i++){
        for(var y=1; y <= x.item(i).cells.length; y++){
          retorno +=  x.item(i).cells.item(y) + ' | '
        }
        retorno += '\n'
      }
      return retorno;
    });

    console.log('data valor '+data)

    // console.log('entrou no for') 
  }

  // page.on('response', async (response) => {    
  //   if (response.url() == "https://estudante.sesisenai.org.br/api/desempenho/frequencia/999956/7593"){
  //       let x = await response.json(); 
  //       for (const item of x) {
  //         //console.log(item.dataAula)
  //         if(today === item.dataAula && item.presente != 'P'){console.log('Falta | '+item.horarioAula+' | '+item.nomeUc)}
  //       }
  //       //console.log(await response.json()); 
  //   }
  // }); 

  // page.on('response', async (response) => {    
  //   if (response.url() == "https://estudante.sesisenai.org.br/api/desempenho/frequencia/999956/7588"){
  //        let x = await response.json(); 
  //       for (const item of x) {
  //         //console.log(item.dataAula)
  //         if(today === item.dataAula && item.presente != 'P'){console.log('Falta | '+item.horarioAula+' | '+item.nomeUc)}
  //       }
  //   }
  // });
  
  // page.on('response', async (response) => {    
  //   if (response.url() == "https://estudante.sesisenai.org.br/api/desempenho/frequencia/999956/7589"){
  //        let x = await response.json(); 
  //       for (const item of x) {
  //         //console.log(item.dataAula)
  //         if(today === item.dataAula && item.presente != 'P'){console.log('Falta | '+item.horarioAula+' | '+item.nomeUc)}
  //       }
  //   }
  // }); 
  // page.on('response', async (response) => {    
  //   if (response.url() == "https://estudante.sesisenai.org.br/api/desempenho/frequencia/999956/7591"){
  //        let x = await response.json(); 
  //       for (const item of x) {
  //         //console.log(item.dataAula)
  //         if(today === item.dataAula && item.presente != 'P'){console.log('Falta | '+item.horarioAula+' | '+item.nomeUc)}
  //       }
  //   }
  // }); 

  // page.on('response', async (response) => {    
  //   if (response.url() == "https://estudante.sesisenai.org.br/api/desempenho/frequencia/999956/7592"){
  //        let x = await response.json(); 
  //       for (const item of x) {
  //         //console.log(item.dataAula)
  //         if(today === item.dataAula && item.presente != 'P'){console.log('Falta | '+item.horarioAula+' | '+item.nomeUc)}
  //       }
  //   }
  // }); 
}
main();
