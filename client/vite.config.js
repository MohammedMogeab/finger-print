// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path'; // Import 'resolve' from Node.js 'path' module

export default defineConfig({
  // 'base' defines the public base path when served in production.
  // For Vercel deployments where your app is at the root of the domain (e.g., your-app.vercel.app),
  // it should be '/'. If your app is in a subpath (e.g., your-app.vercel.app/my-sub-app/),
  // then it would be '/my-sub-app/'.
  base: '/', 

  // The 'build' option configures how Vite bundles your application for production.
  build: {
    // 'rollupOptions' allows you to customize Rollup's behavior (Vite uses Rollup internally).
    rollupOptions: {
      // 'input' is crucial for Multi-Page Applications (MPAs).
      // It tells Vite/Rollup about all the HTML entry points in your project.
      // Each entry point will result in a separate HTML file in the 'dist' folder.
      input: {
        // 'main' is a common name for the primary entry point (your index.html).
        // 'resolve(__dirname, 'index.html')' constructs an absolute path to index.html
        // from the current directory where vite.config.js resides.
        main: resolve(__dirname, 'index.html'),
        
        // Add your 'service.html' here. The key 'service' will be used in the output filename
        // (e.g., 'service.html' in 'dist').
        // Ensure 'service.html' matches the exact filename you have.
        service: resolve(__dirname, 'service.html'), 

        // Add your 'contact.html' here.
        contact: resolve(__dirname, 'contact.html'),
      },
    },
    // 'outDir' specifies the directory where the production build files will be placed.
    // 'dist' is the default, so you might not need to explicitly set it if you're happy with 'dist'.
    // outDir: 'dist', 
  },

  // You can add other Vite configurations here if needed,
  // for example, plugins, server options, etc.
  // plugins: [],
  // server: {
  //   port: 3000,
  // },
});