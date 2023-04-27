import { MakeLogin } from '@/main/factories/pages/login/login-factory'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const Router: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<div >START</div>} />
            <Route path='/login' index element={<MakeLogin />} />
            <Route path='/signup' element={<div data-testid='route'>signup</div>} />
        </Routes>
    </BrowserRouter>
  )
}
