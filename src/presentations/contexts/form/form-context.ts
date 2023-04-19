import { createContext } from 'react'

export default createContext({
  state: { isLoading: false },
  errorState: { emailError: 'Campo Obrigatório', passwordError: 'Campo Obrigatório', main: '' }
})
