import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import GlobalContextProvider from './components/context-provider/GlobalContextProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <App />
      <Toaster />
    </GlobalContextProvider>
  </React.StrictMode>,
)
