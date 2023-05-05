import React  from 'react'
import content from './signup-style.module.scss'
import { LoginHeader, Footer, Input, FormStatus } from '@/presentations/components'
import { Link } from 'react-router-dom'

const SignUpConsumer: React.FC = () => {
  
  return (
    <div className={content.signup}>
      <LoginHeader />
        <form className={content.form}>
          <h2>Login</h2>
          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Confirme sua senha' />
          <button className={content.submit} type='submit'>Entrar</button>
          <Link to='/signup' className={content.link}>Voltar Para Login</Link>
          <FormStatus />
        </form>
      <Footer />
    </div>
  )
}

export const SignUp: React.FC = ( ): JSX.Element => {
  return (
    <>
      <SignUpConsumer ></SignUpConsumer>
    </>
  )
}
