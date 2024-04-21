import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    //if the url has forward slash api '/api' target will be change to localhost:3000 from 5173 
    proxy:{
      '/api':{
          target: 'http://localhost:3000',
          secure:false // secure to be false because its an http not https
      },
    },
  },
  plugins: [react()],
})
