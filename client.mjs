import wa from "whatsapp-web.js";
const { LocalAuth, Client } = wa;

export const client = new Client({
    authStrategy: new LocalAuth(),
    qrMaxRetries: 5,
    puppeteer: {
        executablePath: "/usr/bin/google-chrome-stable",
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-accelerated-2d-canvas",
            "--disable-gpu",
            "--no-zygote",
            "--disable-notifications",
            "--disable-extensions",
            "--mute-audio",
            "--disable-default-apps",
            "--disable-background-timer-throttling",
            "--disable-backgrounding-occluded-windows",
            "--disable-renderer-backgrounding",
            "--disable-infobars",
            "--autoplay-policy=user-gesture-required",
            "--window-size=1024,768",
        ],
    },
});
