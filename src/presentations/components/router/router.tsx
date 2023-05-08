import { MakeLogin } from '@/main/factories/pages/login/login-factory'
import { SignUp } from '@/presentations/pages'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const Router: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<div >START</div>} />
            <Route path='/login' index element={<MakeLogin />} />
            <Route path='/signup' element={<SignUp validation={undefined} addAccount={undefined}/>} />
        </Routes>
    </BrowserRouter>
  )
}
