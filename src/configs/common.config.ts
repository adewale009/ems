import { registerAs } from '@nestjs/config';

const NODE_ENVIRONMENTS = ['development', 'staging', 'beta', 'production'];

export default registerAs('common', () => ({
  port: process.env.APP_PORT || 3000,
  appName: process.env.APP_NAME,
  appHostName: process.env.APP_HOSTNAME,
  nodeEnv: process.env.NODE_ENV,
  tokenEncryptionKey: process.env.TOKEN_ENCRYPTION_KEY,
  isDevelopment: process.env.NODE_ENV === NODE_ENVIRONMENTS['development'],
  swaggerApiRoot: process.env.SWAGGER_API_ROOT,
  emailVerificationOtpValidityInMinutes: process.env.EMAIL_VERIFICATION_OTP_VALIDITY_IN_MINUTES,
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
  defaultEmailProvider: process.env.DEFAULT_EMAIL_PROVIDER,
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    senderName: process.env.SENDGRID_SENDER_NAME,
    senderEmail: process.env.SENDGRID_SENDER_EMAIL,
    templates: {
      emailVerification: process.env.SENDGRID_TEMPLATES_EMAIL_VERIFICATION,
    },
  },
  auth: {
    authName: process.env.APP_AUTH_NAME,
    serviceKey: process.env.APP_SERVICE_KEY,
    jwt: {
      secret: process.env.JWT_SECRET,
      expiry: process.env.JWT_EXPIRES_IN_MS,
    },
    cookie: {
      name: process.env.AUTH_COOKIE_NAME,
      expiry: process.env.AUTH_COOKIE_EXPIRY,
    },
    refreshToken: {
      prefix: process.env.REFRESH_TOKEN_PREFIX,
    },
  },
  session: {
    expiryHours: process.env.SESSION_EXPIRY_HOURS,
  },
  otp: {
    validityMinutes: process.env.OTP_CODE_VALIDITY_MINUTES,
  },
}));
