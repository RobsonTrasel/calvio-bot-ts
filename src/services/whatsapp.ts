import { Client, MessageMedia, LocalAuth } from 'whatsapp-web.js'
import * as qrcode from 'qrcode-terminal'
import { resolve } from 'path'

const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'calvio-bot',
        dataPath: resolve(__dirname, '..', 'data')
    }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox']
    }
})

client.on('qr', async qr => qrcode.generate(qr, { small: true}))
client.on('authenticated', () => console.log('[ Sucesso ] - Whatsapp Autenticado.'));
client.on('auth_failure', () => console.log('[ Erro ] - Whatsapp não conseguiu autenticar.'));
client.on('disconnected', () => console.log('[ Erro ] - Whatsapp perdeu a conexão.'));
client.on('ready', async () => {
    await client.sendMessage('5545988064377@c.us', `[${client.info.pushname}] - Bot online!`)
    console.log('[ Sucesso ] - Whatsapp conectado com sucesso.')
})

client.initialize()

export { Client, MessageMedia}