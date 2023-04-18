import React from 'react'
import content from './login-style.module.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentations/components'

export const Login: React.FC = () => {
  return (
    <div className={content.login}>
      <LoginHeader />
      <form className={content.form}>
        <h2>Login</h2>
        <Input type='email' name='email' placeholder='Digite seu e-mail' />
        <Input type='password' name='password' placeholder='Digite sua senha' />
        <button className={content.submit} type='submit'>Entrar</button>
        <span className={content.link}>Criar conta</span>
        <FormStatus />
      </form>
        <Footer />
    </div>
  )
}
