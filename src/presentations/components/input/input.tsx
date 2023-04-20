import React from 'react'
import content from './input.module.scss'
import { useLogin } from '@/presentations/contexts/form/form-context'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
}

export const Input: React.FC<Props> = (props: Props) => {
  const { errorState, setInput } = useLogin()
  const error = errorState[`${props.name}Error`]

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
      <input data-testid={props.name} {...props} onChange={handleChange}></input>
      <span data-testid={`${props.name}-status`} title={getTitle()} className={content.status}>{getStatus()}</span>
    </div>
  )
}
