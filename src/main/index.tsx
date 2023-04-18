import React from 'react'
import ReactDOM from 'react-dom/client'
import { Login } from '@/presentations/pages'

const root = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
)
