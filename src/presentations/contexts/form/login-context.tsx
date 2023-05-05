import React, { createContext, useState, useContext } from 'react'

type stateProps = {
  isLoading: boolean
}

type errorStateProps = {
  emailError: string
  passwordError: string
  passwordConfirmationError: string
  nameError: string
  main: string
}

type formLoginProps = {
  email: string
  password: string
}

type formSignupProps = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

type LoginContextProps = {
  state: stateProps
  setState: React.Dispatch<React.SetStateAction<stateProps>>
  errorState: errorStateProps
  setErrorState: React.Dispatch<React.SetStateAction<errorStateProps>>
  login: formLoginProps
  setLogin: React.Dispatch<React.SetStateAction<formLoginProps>>
  signup: formSignupProps
  setSignup: React.Dispatch<React.SetStateAction<formSignupProps>>
}

const loginProps: LoginContextProps = {
  state: {
    isLoading: false
  },
  setState: () => {},
  errorState: {
    emailError: 'Campo Obrigatório!',
    passwordError: 'Campo Obrigatório!',
    passwordConfirmationError: 'Campo Obrigatório!',
    nameError: 'Campo Obrigatório!',
    main: ''
  },
  setErrorState: () => {},
  login: {
    email: '',
    password: ''
  },
  setLogin: () => {},
  signup: {
    name: '',
    email: '',
    password: '',
    passwordConfirmation:''
  },
  setSignup: () => {}
}

const LoginContext = createContext(loginProps)

interface LoginProviderProps {
  children: React.ReactNode
}
export const LoginProvider = ({ children }: LoginProviderProps): JSX.Element => {
  const [state, setState] = useState<stateProps>({
    isLoading: false
  })
  const [errorState, setErrorState] = useState<errorStateProps>({
    emailError: 'Campo Obrigatório!',
    passwordError: 'Campo Obrigatório!',
    passwordConfirmationError: 'Campo Obrigatório!',
    nameError: 'Campo Obrigatório!',
    main: ''
  })
  const [login, setLogin] = useState<formLoginProps>({
    email: '',
    password: ''
  })

  const [signup, setSignup] = useState<formSignupProps>({
    name: '',
    email: '',
    password: '',
    passwordConfirmation:''
  })

  return (
    <LoginContext.Provider value={{ state, setState, errorState, setErrorState, login, setLogin, signup, setSignup }}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLogin = (): LoginContextProps => {
  return useContext(LoginContext)
}
