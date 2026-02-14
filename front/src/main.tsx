import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './styles/index.css'

const queryClient = new QueryClient()

// Default uses dark variables in CSS (:root). Ensure no `light` class set by default.
document.documentElement.classList.remove('light')

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
