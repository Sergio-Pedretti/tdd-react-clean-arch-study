import React, { useEffect }  from 'react'
import content from './signup-style.module.scss'
import { LoginHeader, Footer, Input, FormStatus, SubmitButton } from '@/presentations/components'
import { Link, useNavigate } from 'react-router-dom'
import { LoginProvider, useLogin } from '@/presentations/contexts/form/login-context'
import { Validation } from '@/presentations/protocols/validation'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'

type Props = {
  validation: Validation | undefined
  addAccount: AddAccount | undefined
  saveAccessToken: SaveAccessToken | undefined
}

const SignUpConsumer: React.FC<Props> = ({ validation, addAccount, saveAccessToken }:Props) => {
  const { setErrorState, errorState, signup, state, setState } = useLogin()
  const navigate = useNavigate()

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

  useEffect(() => {
    setState({
    ...state,
    invalidForm:!!errorState.nameError || !!errorState.emailError || !!errorState.passwordError || !!errorState.passwordConfirmationError
    })
  },[errorState])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.invalidForm) {
        return
      }
      setState({
        isLoading: true,
        invalidForm: false
      })
      const account = await addAccount?.add(signup)
      if(account){
        await saveAccessToken?.save(account.accessToken)
        navigate('/')
      }
    } catch (error) {
      setState({
          isLoading: false,
          invalidForm: false
        })
        setErrorState({
          ...errorState,
          main: error.message
        })
    }
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
          <SubmitButton text='Cadastrar' />
           <Link to='/login' replace data-testid='login' className={content.link}>Logar na conta</Link>
          <FormStatus />
        </form>
      <Footer />
    </div>
  )
}


export const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }:Props): JSX.Element => {
  return (
    <LoginProvider>
      <SignUpConsumer validation={validation} addAccount={addAccount} saveAccessToken={saveAccessToken}></SignUpConsumer>
    </LoginProvider>
  )
}
