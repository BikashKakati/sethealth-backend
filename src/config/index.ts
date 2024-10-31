export const mongodbUrl = process.env.MONGODB_URL;
export const serverPort = process.env.SERVER_PORT;
export const tokenKey: string = process.env.SECRET_KEY!;
export const tokenName: string = process.env.TOKEN_NAME!;
export const smtpHost = process.env.SMTP_HOST!;
export const smtpPort = parseInt(process.env.SMTP_PORT!);
export const smtpUser = process.env.SMTP_USER!;
export const smtpPass = process.env.SMTP_PASS!;
