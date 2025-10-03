import { StrictMode } from 'react'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './index.css'
import './utility.scss'
import App from './App.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ fontFamily: 'Lora, serif' }} forceColorScheme="light">
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
)
