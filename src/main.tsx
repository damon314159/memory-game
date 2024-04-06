import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const root: HTMLElement =
  document.getElementById('root') ??
  // If no root element found, make one
  ((): HTMLElement => {
    const div = document.createElement('div')
    div.id = 'root'
    document.appendChild(div)
    return div
  })()

// Trigger the App initial render
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
