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

client.on('message_create', async (message) => {
    console.log(message.body)
    if (message.body == '!ping') {
        message.reply('pong');
    }
});

client.initialize();