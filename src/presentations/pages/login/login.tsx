import React, { useEffect } from 'react'
import content from './login-style.module.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentations/components'
import { LoginProvider, useLogin } from '@/presentations/contexts/form/form-context'
import { type Validation } from '@/presentations/protocols/validation'

type Props = {
  validation: Validation
}

const LoginConsumer: React.FC<Props> = ({ validation }: Props) => {
  const { login, setErrorState, errorState, setState } = useLogin()

  useEffect(() => {
    setErrorState({
      main: errorState.main,
      passwordError: errorState.passwordError,
      emailError: validation.validate('email', login.email)
    })

    validation.validate('email', login.email)
  }, [login.email])

  useEffect(() => {
    setErrorState({
      main: errorState.main,
      emailError: errorState.emailError,
      passwordError: validation.validate('password', login.password)
    })
    validation.validate('password', login.password)
  }, [login.password])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setState({
      isLoading: true
    })
  }

  return (
    <div className={content.login}>
      <LoginHeader />
        <form className={content.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <button data-testid='submit' disabled={!!errorState.emailError || !!errorState.passwordError} className={content.submit} type='submit'>Entrar</button>
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
