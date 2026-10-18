import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.shahiagrofarm.app',
  appName: 'SHAHI AGRO FARM',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: { androidScheme: 'https' }
};

export default config;
