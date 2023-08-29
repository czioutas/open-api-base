export const APP_RUNTIME_CONFIG = 'appRuntime';

export interface AppRuntimeConfig {
  appDomain: string;
  appPort: number;
}

export default (): object => ({
  appRuntime: {
    appDomain: process.env.APP_DOMAIN,
    appPort: process.env.APP_PORT,
  },
});
