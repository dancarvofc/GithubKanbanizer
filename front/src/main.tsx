import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './styles/index.css'

const queryClient = new QueryClient()

// Ensure dark theme is default (no 'light' class)
const html = document.documentElement
html.classList.remove('light')
console.log('🎨 Theme initialized:', { hasLightClass: html.classList.contains('light'), bgColor: getComputedStyle(document.body).backgroundColor })

window.toggleTheme = () => {
  html.classList.toggle('light')
  console.log('🎨 Theme toggled:', { hasLightClass: html.classList.contains('light'), bgColor: getComputedStyle(document.body).backgroundColor })
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
