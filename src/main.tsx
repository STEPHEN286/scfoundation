import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../toast-animations.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          style: {
            background: 'transparent',
            color: '#363636',
            margin: '0',
            padding: '0',
            boxShadow: 'none',
          },
          success: {
            duration: 2000,
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>,
)
