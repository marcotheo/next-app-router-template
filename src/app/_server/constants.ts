export const constants = {
  UserPoolId: process.env.COGNITO_USER_POOL_ID,
  Region: process.env.AWS_REGION ?? 'ap-southeast-1',
  AccessKeyId: process.env.AWS_CONFIG_ACCESS_KEY_ID,
  SecretAccessKey: process.env.AWS_CONFIG_SECRET_KEY,
  appClientId: process.env.COGNITO_APP_CLIENT_ID,
  appClientSecret: process.env.COGNITO_APP_CLIENT_SECRET,
  nextAuthSecret: process.env.NEXTAUTH_SECRET ?? 'secretsample',
  nextAuthUrl: process.env.NEXTAUTH_URL ?? 'http://localhost:3000',

  mailerSend: {
    supportEmail: process.env.MAILER_SEND_SUPPORT_EMAIL ?? 'scaledevs@gmail.com',
    fromEmail: process.env.MAILER_SEND_FROM_EMAIL,
    fromName: process.env.MAILER_SEND_FROM_NAME ?? 'ScaleDevs Team',
    apiKey: process.env.MAILER_SEND_API_KEY,
  },
};
