import wa from "whatsapp-web.js";
const { LocalAuth, Client } = wa;

export const client = new Client({
  authStrategy: new LocalAuth(),
  qrMaxRetries: 5,
  puppeteer: {
    executablePath: "/usr/bin/google-chrome-stable",
    headless: true,
  },
});
