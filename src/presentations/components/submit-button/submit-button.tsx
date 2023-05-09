import React from 'react'
import content from './submit-button-style.module.scss'
import { useLogin } from '@/presentations/contexts/form/login-context'

type Props = {
  text: string
}

export const SubmitButton: React.FC<Props> = (props: Props) => {
  const { state } = useLogin()
  return (
    <button data-testid='submit' disabled={state.invalidForm} className={content.submit} type='submit'>{props.text}</button>
  )
}
