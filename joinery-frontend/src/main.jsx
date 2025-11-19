import { StrictMode } from 'react'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './index.css'
import './utility.scss'
import './components/ui/JoineryUI.scss'
import App from './App.jsx'

const queryClient = new QueryClient()

const mantineTheme = {
  fontFamily: 'Lora, serif',
  cursorType: 'pointer',
  primaryColor: 'teal',
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme} forceColorScheme="light">
        <Notifications position="top-right" />
        <App />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
)
