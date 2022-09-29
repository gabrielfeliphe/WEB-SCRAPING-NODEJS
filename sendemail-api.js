const TakeoutClient = require('takeout.js')
const client = new TakeoutClient()
client.login(process.env.TAKEOUT_TOKEN)

sendEmail = async function (currentDate,faltas) {

const emailTemplate = {
    to: 'gabriel_campos@estudante.sc.senai.br',
    from: 'Takeout.js', // This will be (e.g) 'Takeout.js via Takeout' for free users
    subject: `SERVIÇO DE AVISO DE FALTAS ${currentDate}`,
    html: `<b>${faltas}</b>`,
}

   sendingStatus =  await client.send(emailTemplate)
    
   return sendingStatus
}
        
module.exports = {sendEmail}