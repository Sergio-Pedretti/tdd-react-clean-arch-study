import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '@/presentations/pages'

export const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/login' index element={<Login validation={undefined}/>} />
        </Routes>
    </BrowserRouter>
  )
}
