import React, { createContext, useState, useContext } from 'react'

type stateProps = {
  isLoading: false
}

type errorStateProps = {
  emailError: string
  passwordError: string
  main: string
}

type LoginContextProps = {
  state: stateProps
  setState: React.Dispatch<React.SetStateAction<stateProps>>
  errorState: errorStateProps
  setErrorState: React.Dispatch<React.SetStateAction<errorStateProps>>
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
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
  input: '',
  setInput: () => {}
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

  const [input, setInput] = useState<string>('')

  return (
    <LoginContext.Provider value={{ state, setState, errorState, setErrorState, input, setInput }}>
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
