import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from 'qrcode-terminal';

const client = new Client({
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    },
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_create', message => {
    console.log(message.body)
    if (message.body === '!card') {
        message.reply('Cardápio: \n');
    } 
    if (message.body === '!2') {
        message.reply('Nosso horário de funcionamento é de segunda a sexta das 8h às 18h e aos sábados das 8h às 12h.');
    }
    if(message.body === '!3') {
        message.reply('Para fazer um pedido, envie uma mensagem com o número do pedido e o endereço de entrega.');
    }
});


client.initialize();