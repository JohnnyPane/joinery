import { StrictMode } from 'react'
import '@mantine/core/styles.css';
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ fontFamily: 'Lora, serif' }} forceColorScheme="light">
      <App />
    </MantineProvider>
  </StrictMode>,
)
