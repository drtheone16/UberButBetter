import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AppStateProvider } from './context/AppState'

function RegisterSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // vite-plugin-pwa injects registerSW if needed; fallback here for dev
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])
  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppStateProvider>
        <RegisterSW />
        <App />
      </AppStateProvider>
    </BrowserRouter>
  </StrictMode>,
)
