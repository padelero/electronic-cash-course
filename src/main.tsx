
import React from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'
import { DB_CONFIG } from './config/api.config.ts'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key. Ensure you have set VITE_CLERK_PUBLISHABLE_KEY in your .env file.");
}

// Verificamos que las variables de configuración de la base de datos estén definidas
console.log("Configuración de Base de Datos cargada:", {
  host: DB_CONFIG.HOST,
  port: DB_CONFIG.PORT,
  database: DB_CONFIG.NAME
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
)
