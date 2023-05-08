import React, { useEffect }  from 'react'
import content from './signup-style.module.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentations/components'
import { Link } from 'react-router-dom'
import { LoginProvider, useLogin } from '@/presentations/contexts/form/login-context'
import { Validation } from '@/presentations/protocols/validation'

type Props = {
  validation: Validation | undefined
}

const SignUpConsumer: React.FC<Props> = ({ validation }:Props) => {
  const { setErrorState, errorState, signup } = useLogin()

  useEffect(() => {
    setErrorState({
      ...errorState,
      nameError:  signup.name ? '' : 'Campo Obrigatório!'
    })

    validation?.validate('name', signup.name)
  }, [signup.name])

  useEffect(() => {
    setErrorState({
      ...errorState,
      emailError:  signup.email ? '' : 'Campo Obrigatório!'
    })

    validation?.validate('email', signup.email)
  }, [signup.email])
  
  return (
    <div className={content.signup}>
      <LoginHeader />
        <form className={content.form}>
          <h2>Sign up</h2>
          <Input data-testid='name' type='text' name='name' placeholder='Digite seu nome' />
          <Input data-testid='email' type='email' name='email' placeholder='Digite seu e-mail' />
          <Input data-testid='password' type='password' name='password' placeholder='Digite sua senha' />
          <Input data-testid='passwordConfirmation' type='password' name='passwordConfirmation' placeholder='Confirme sua senha' />
          <button data-testid='submit' disabled className={content.submit} type='submit'>Entrar</button>
          <Link to='/signup' className={content.link}>Voltar Para Login</Link>
          <FormStatus />
        </form>
      <Footer />
    </div>
  )
}

export const SignUp: React.FC<Props> = ({ validation }:Props): JSX.Element => {
  return (
    <LoginProvider>
      <SignUpConsumer validation={validation} ></SignUpConsumer>
    </LoginProvider>
  )
}
