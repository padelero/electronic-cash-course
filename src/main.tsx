
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

// Usar la variable de entorno o una clave temporal para desarrollo
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_development_key'

// Advertencia para recordar configurar la clave real
if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  console.warn('⚠️ No se ha configurado VITE_CLERK_PUBLISHABLE_KEY. La aplicación está usando una clave temporal para desarrollo. Por favor, configura tu clave de Clerk para funcionalidad completa.')
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
)
