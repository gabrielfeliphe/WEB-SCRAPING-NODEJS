const puppeteer = require('puppeteer');
require('dotenv').config()

const express = require('express')
const app = express()

var ApiSendEmail = require ('./sendemail-api.js')


async function main() {
  console.log('iniciado')
 // const browser = await puppeteer.launch({headless: false});
  const browser = await puppeteer.launch({
    'args' : [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  
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
  await page.waitForTimeout(1000);
  await page.click('#frequencia-tab999956')
  await page.waitForTimeout(3000);
  await page.select('#frequencia999956 > select', '6');
  //await page.waitForTimeout(5000);

  var absenceCount = '-';
 
  var MyDate = new Date();
  var today;
  
  MyDate.setDate(MyDate.getDate());
  
  today = ('0' + MyDate.getDate()).slice(-2) + '/' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/' + MyDate.getFullYear();
  console.log(today)
  
  for(var i = 1; i<=6; i++){
    await page.click(`#frequencia999956 > div > div:nth-child(${i}) > a > span`);
    await page.waitForTimeout(800);

    const selector = `#frequencia999956 > div > div:nth-child(${i}) > div > table > tbody > tr`;

    const row = await page.$$eval(selector, trs => trs.map(tr => {
        const tds = [...tr.getElementsByTagName('td')];
        return tds.map(td => td.textContent);
    }));

    for(var y=0 ;y < row.length;y++){
        if(row[y][2] === '\n              F\n            ' && row[y][0] === today){
          console.log("faltou dia: " + row[y][0]+' Aula ' +row[y][1]+' Materia: '+row[y][3])
          absenceCount += "faltou dia: " + row[y][0]+' Aula ' +row[y][1]+' Materia: '+row[y][3]+ '<br/> \n'
        }
    }
    console.log('fim do bloco '+i)
  }

  await browser.close()

  if(absenceCount === '-'){
    absenceCount = 'não houveram faltas'
  }
  else{
   retorno = await ApiSendEmail.sendEmail(today,absenceCount)
   console.log(retorno)
  }
  
  return absenceCount
}

app.get('/', async function (req, res) {
  var x = await main();
  console.log(x)
  res.status(200).json(x)
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Servidor subiu na porta %d e no ambiente de %s", this.address().port, app.settings.env);
});

