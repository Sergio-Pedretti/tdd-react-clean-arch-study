import { App } from '../../src/main'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
