import React, { useEffect } from 'react'
import content from './login-style.module.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentations/components'
import { LoginProvider, useLogin } from '@/presentations/contexts/form/form-context'
import { type Validation } from '@/presentations/protocols/validation'

type Props = {
  validation: Validation | undefined
}

const LoginConsumer: React.FC<Props> = ({ validation }: Props) => {
  const { login } = useLogin()

  useEffect(() => {
    validation?.validate({
      email: login.email,
      password: login.password
    })
  }, [login])

  return (
    <div className={content.login}>
      <LoginHeader />
        <form className={content.form}>
          <h2>Login</h2>
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <button data-testid='submit' disabled className={content.submit} type='submit'>Entrar</button>
          <span className={content.link}>Criar conta</span>
          <FormStatus />
        </form>
      <Footer />
    </div>
  )
}

export const Login: React.FC<Props> = ({ validation }: Props): JSX.Element => {
  return (
    <LoginProvider>
      <LoginConsumer validation={validation} ></LoginConsumer>
    </LoginProvider>
  )
}
