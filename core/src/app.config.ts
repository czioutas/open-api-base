export const APP_RUNTIME_CONFIG = 'appRuntime';
export const JWT_CONFIG = 'jwt';
export const SENDGRID_CONFIG = 'sendgrid';
export const PGSQL_CONFIG = 'pgsql';

export interface AppRuntimeConfig {
  appDomain: string;
  appPort: number;
  logserviceToken: string;
}

export interface JwtConfig {
  secret: string;
  audience: string;
  issuer: string;
  expiration: string;
  idTokenSecret: string;
  idTokenExpiration: string;
  refreshIdTokenSecret: string;
  refreshIdTokenExpiration: string;
  magicLinkTokenSecret: string;
  magicLinkTokenExpiration: string;
}

export interface SendGridConfig {
  apiKey: string;
  templates: { [key: string]: string };
  senderEmail: string;
}

export interface PgsqlDbConfig {
  appRuntimeUsername: string;
  appRuntimeUserPassword: string;
  dbName: string;
  host: string;
  port: number;
  shouldUseSsl: boolean;
  rejectUnauthorized: boolean;
  dropDb: boolean;
  runMigrations: boolean;
}

export const configuration = () => ({
  appRuntime: {
    appDomain: process.env.APP_DOMAIN,
    appPort: process.env.APP_PORT,
    logserviceToken: process.env.LOGSERVICE_TOKEN,
  },
  jwt: {
    audience: process.env.JWT_AUD,
    issuer: process.env.JWT_ISS,
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION,
    idTokenSecret: process.env.JWT_ID_TOKEN_SECRET,
    idTokenExpiration: process.env.JWT_ID_TOKEN_EXPIRATION,
    refreshIdTokenSecret: process.env.JWT_REFRESH_ID_TOKEN_SECRET,
    refreshIdTokenExpiration: process.env.JWT_REFRESH_ID_TOKEN_EXPIRATION,
    magicLinkTokenSecret: process.env.JWT_MAGICLINK_SECRET,
    magicLinkTokenExpiration: process.env.JWT_MAGICLINK_EXPIRATION,
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    templates: {
      magicLinkEmailId: process.env.SENDGRID_MAGIC_LINK_EMAIL_ID,
    },
    senderEmail: process.env.SENDGRID_SENDER_EMAIL,
  },
  pgsql: {
    host: process.env.POSTGRES_HOST,
    appRuntimeUsername: process.env.APP_RUNTIME_USER,
    appRuntimeUserPassword: process.env.APP_RUNTIME_USER_PASSWORD,
    dbName: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
    shouldUseSsl: process.env.POSTGRES_SHOULD_USE_SSL,
    rejectUnauthorized: process.env.POSTGRES_REJECT_UNAUTHORIZED,
    dropDb: process.env.POSTGRES_DROP_DB,
    runMigrations: process.env.POSTGRES_RUN_MIGRATIONS,
  },
});
