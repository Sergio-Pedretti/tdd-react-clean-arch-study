import React, { useEffect }  from 'react'
import content from './signup-style.module.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentations/components'
import { Link } from 'react-router-dom'
import { LoginProvider, useLogin } from '@/presentations/contexts/form/login-context'
import { Validation } from '@/presentations/protocols/validation'
import { AddAccount } from '@/domain/usecases'

type Props = {
  validation: Validation | undefined
  addAccount: AddAccount | undefined
}

const SignUpConsumer: React.FC<Props> = ({ validation, addAccount }:Props) => {
  const { setErrorState, errorState, signup, state, setState } = useLogin()

  const disableButton = !!errorState.nameError || !!errorState.emailError || !!errorState.passwordError || !!errorState.passwordConfirmationError

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

  useEffect(() => {
    setErrorState({
      ...errorState,
      passwordError:  signup.password ? '' : 'Campo Obrigatório!'
    })

    validation?.validate('password', signup.password)
  }, [signup.password])

  useEffect(() => {
    setErrorState({
      ...errorState,
      passwordConfirmationError:  signup.passwordConfirmation ? '' : 'Campo Obrigatório!'
    })

    validation?.validate('passwordConfirmation', signup.passwordConfirmation)
  }, [signup.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
      if (state.isLoading || errorState.emailError || errorState.passwordError) {
        return
      }
      setState({
        isLoading: true
      })
      addAccount?.add(signup)
  }
  
  return (
    <div className={content.signup}>
      <LoginHeader />
        <form data-testid='form' className={content.form} onSubmit={handleSubmit}>
          <h2>Sign up</h2>
          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Confirme sua senha' />
          <button data-testid='submit' disabled={disableButton} className={content.submit} type='submit'>Entrar</button>
          <Link to='/signup' className={content.link}>Voltar Para Login</Link>
          <FormStatus />
        </form>
      <Footer />
    </div>
  )
}

export const SignUp: React.FC<Props> = ({ validation, addAccount }:Props): JSX.Element => {
  return (
    <LoginProvider>
      <SignUpConsumer validation={validation} addAccount={addAccount} ></SignUpConsumer>
    </LoginProvider>
  )
}
