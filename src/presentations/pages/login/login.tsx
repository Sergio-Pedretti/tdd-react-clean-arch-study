import React, { useState } from 'react'
import content from './login-style.module.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentations/components'
import Context from '@/presentations/contexts/form/form-context'

export const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })
  const [errorState] = useState({
    emailError: 'Campo Obrigatório',
    passwordError: 'Campo Obrigatório',
    main: ''
  })

  return (
    <div className={content.login}>
      <LoginHeader />
      <Context.Provider value={{ state, errorState }}>
        <form className={content.form}>
          <h2>Login</h2>
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <button data-testid='submit' disabled className={content.submit} type='submit'>Entrar</button>
          <span className={content.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}
