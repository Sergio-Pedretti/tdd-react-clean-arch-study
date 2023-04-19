import React from 'react'
import content from './input.module.scss'
import { useLogin } from '@/presentations/contexts/form/form-context'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
}

export const Input: React.FC<Props> = (props: Props) => {
  const { errorState, setInput } = useLogin()
  console.log(props.name)
  const error = errorState[`${props.name}Error`]

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setInput(event.target.value)
  }

  const getStatus = (): string => {
    return '🔴'
  }

  const getTitle = (): string => {
    return error
  }

  return (
    <div className={content.inputWrap}>
      <input data-testid={props.name} readOnly onFocus={enableInput} {...props} onChange={handleChange}></input>
      <span data-testid={`${props.name}-status`} title={getTitle()} className={content.status}>{getStatus()}</span>
    </div>
  )
}
