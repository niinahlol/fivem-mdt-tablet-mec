import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom' // Mudamos de BrowserRouter para HashRouter
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter> {/* Agora usando HashRouter para compatibilidade com FiveM */}
      <App />
    </HashRouter>
  </React.StrictMode>,
)