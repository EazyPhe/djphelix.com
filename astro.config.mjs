import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://djphelix.com',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
