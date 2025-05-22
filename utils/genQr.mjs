import qrcode from "qrcode-terminal";

export const genQr = (qr) => qrcode.generate(qr, { small: true });
