import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '@/presentations/pages'
import { LoginValidation } from '@/application/validator/validator'

export const Router = (): JSX.Element => {
  const validation = new LoginValidation()
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<div >START</div>} />
            <Route path='/login' index element={<Login validation={validation} authentication={undefined}/>} />
            <Route path='/signup' element={<div data-testid='route'>signup</div>} />
        </Routes>
    </BrowserRouter>
  )
}
