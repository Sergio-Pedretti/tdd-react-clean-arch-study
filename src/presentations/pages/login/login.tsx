import React, { useEffect } from 'react'
import content from './login-style.module.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentations/components'
import { LoginProvider, useLogin } from '@/presentations/contexts/form/form-context'
import { type Validation } from '@/presentations/protocols/validation'
import { SaveAccessToken, type Authentication } from '@/domain/usecases'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const LoginConsumer: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const { login, errorState, setErrorState, state, setState } = useLogin()
  const navigate = useNavigate()
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || errorState.emailError || errorState.passwordError) {
        return
      }
      setState({
        isLoading: true
      })
      const account = await authentication.auth({
        email: login.email,
        password: login.password
      })
      if (account) {
        await saveAccessToken.save(account.accessToken)
        navigate('/')
      }
    } catch (error) {
      setState({
        isLoading: false
      })
      setErrorState({
        ...errorState,
        main: error.message
      })
    }
  }

  return (
    <div className={content.login}>
      <LoginHeader />
        <form data-testid='form' className={content.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <button data-testid='submit' disabled={!!errorState.emailError || !!errorState.passwordError} className={content.submit} type='submit'>Entrar</button>
          <Link to='/signup' data-testid='signup' className={content.link}>Criar conta</Link>
          <FormStatus />
        </form>
      <Footer />
    </div>
  )
}

export const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props): JSX.Element => {
  return (
    <LoginProvider>
      <LoginConsumer validation={validation} authentication={authentication} saveAccessToken={saveAccessToken}></LoginConsumer>
    </LoginProvider>
  )
}
