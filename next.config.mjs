/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    // This project lives in a OneDrive-synced folder — OneDrive's sync
    // client intercepts/delays native filesystem change events on
    // Windows, so webpack's default watcher misses edits until something
    // else forces a recheck (hence needing a manual refresh). Polling
    // instead of relying on native fs events works around that.
    if (dev) {
      config.watchOptions = {
        poll: 800,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
