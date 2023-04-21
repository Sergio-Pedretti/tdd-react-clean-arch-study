import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '@/presentations/pages'
import { LoginValidation } from '@/application/validator/validator'

export const Router = (): JSX.Element => {
  const validation = new LoginValidation()
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' index element={<Login validation={validation}/>} />
        </Routes>
    </BrowserRouter>
  )
}
