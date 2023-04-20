import React, { createContext, useState, useContext } from 'react'

type stateProps = {
  isLoading: false
}

type errorStateProps = {
  emailError: string
  passwordError: string
  main: string
}

type formProps = {
  email: string
  password: string
}

type LoginContextProps = {
  state: stateProps
  setState: React.Dispatch<React.SetStateAction<stateProps>>
  errorState: errorStateProps
  setErrorState: React.Dispatch<React.SetStateAction<errorStateProps>>
  login: formProps
  setLogin: React.Dispatch<React.SetStateAction<formProps>>
}

const loginProps: LoginContextProps = {
  state: {
    isLoading: false
  },
  setState: () => {},
  errorState: {
    emailError: 'Campo Obrigatório',
    passwordError: 'Campo Obrigatório',
    main: ''
  },
  setErrorState: () => {},
  login: {
    email: '',
    password: ''
  },
  setLogin: () => {}
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
    emailError: 'Campo Obrigatório',
    passwordError: 'Campo Obrigatório',
    main: ''
  })
  const [login, setLogin] = useState<formProps>({
    email: '',
    password: ''
  })

  return (
    <LoginContext.Provider value={{ state, setState, errorState, setErrorState, login, setLogin }}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLogin = (): LoginContextProps => {
  const context = useContext(LoginContext)
  if (context === undefined) {
    throw new Error('useLogin can only be used inside LoginProvider')
  }
  return context
}
