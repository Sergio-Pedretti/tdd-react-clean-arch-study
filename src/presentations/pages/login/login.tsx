import React from 'react'
import content from './login-style.module.scss'
import { Spinner } from '@/presentations/components/spinner/spinner'
import { LoginHeader } from '@/presentations/components/login-header/login-header'
import { Footer } from '@/presentations/components/footer/footer'

export const Login: React.FC = () => {
  return (
    <div className={content.login}>
      <LoginHeader />
      <form className={content.form}>
        <h2>Login</h2>
        <div className={content.inputWrap}>
          <input type='email' name='email' placeholder='Digite seu e-mail'></input>
          <span className={content.status}>🔴</span>
        </div>
        <div className={content.inputWrap}>
          <input type='password' name='password' placeholder='Digite sua senha'></input>
          <span className={content.status}>🔴</span>
        </div>
        <button className={content.submit} type='submit'>Entrar</button>
        <span className={content.link}>Criar conta</span>
        <div className={content.errorWrap}>
          <Spinner className={content.spinner} />
          <span className={content.error}>Erro</span>
        </div>
        <Footer />
      </form>
    </div>
  )
}
