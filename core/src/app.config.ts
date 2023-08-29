export const APP_RUNTIME_CONFIG = 'appRuntime';

export interface AppRuntimeConfig {
  appDomain: string;
  appPort: number;
  logserviceToken: string;
}

export const configuration = () => ({
  appRuntime: {
    appDomain: process.env.APP_DOMAIN,
    appPort: process.env.APP_PORT,
    logserviceToken: process.env.LOGSERVICE_TOKEN,
  },
});
