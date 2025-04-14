
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.tsx'
import './index.css'

// Obtener la clave de las variables de entorno
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || ''

// Si no hay clave configurada, mostramos la aplicación sin autenticación
// pero con un mensaje de advertencia
if (!PUBLISHABLE_KEY) {
  console.warn('⚠️ No se ha configurado VITE_CLERK_PUBLISHABLE_KEY. La autenticación está desactivada. Por favor, configura tu clave de Clerk en https://dashboard.clerk.com/last-active?path=api-keys')
  
  // Renderizar la aplicación sin ClerkProvider
  createRoot(document.getElementById("root")!).render(<App />)
} else {
  // Si hay clave configurada, usar ClerkProvider normalmente
  createRoot(document.getElementById("root")!).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  )
}
