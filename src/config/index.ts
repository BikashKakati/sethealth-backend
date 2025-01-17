export const mongodbUrl = process.env.MONGODB_URL;
export const serverPort = process.env.SERVER_PORT;

// Admin client url
export const adminClientUrl = process.env.ADMIN_CLIENT_URL;

// Doctor client url
export const doctorClientUrl = process.env.DOCTOR_CLIENT_URL;

//token
export const tokenKey: string = process.env.SECRET_KEY!;
export const tokenName: string = process.env.TOKEN_NAME!;

// mail
export const smtpHost = process.env.SMTP_HOST!;
export const smtpPort = parseInt(process.env.SMTP_PORT!);
export const smtpUser = process.env.SMTP_USER!;
export const smtpPass = process.env.SMTP_PASS!;
