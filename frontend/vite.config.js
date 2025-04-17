import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 5173, // Set the desired port
    strictPort: true, // Ensures it doesn't switch to another port
    // allowedHosts: [
    //   'b356-2401-4900-1c0a-43bf-2da8-813-52f7-5cc9.ngrok-free.app'
    // ]
  }
})
