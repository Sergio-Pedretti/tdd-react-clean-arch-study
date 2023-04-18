import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from '@/presentations/components'

const root = document.getElementById('root') as HTMLElement

ReactDOM.createRoot(root).render(
  <React.StrictMode>
     <Router />
  </React.StrictMode>
)
