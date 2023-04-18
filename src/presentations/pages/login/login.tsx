import React, { useState } from 'react'
import content from './login-style.module.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentations/components'
import Context from '@/presentations/contexts/form/form-context'

type statesProps = {
  isLoading: boolean
  errorMessage: string
}

export const Login: React.FC = () => {
  const [state] = useState<statesProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={content.login}>
      <LoginHeader />
      <Context.Provider value={state}>
        <form className={content.form}>
          <h2>Login</h2>
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <button className={content.submit} type='submit'>Entrar</button>
          <span className={content.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}
