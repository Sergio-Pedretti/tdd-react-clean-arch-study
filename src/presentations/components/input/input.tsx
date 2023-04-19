import React, { useContext } from 'react'
import content from './input.module.scss'
import Context from '@/presentations/contexts/form/form-context'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
}

export const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context)
  const error = errorState[`${props.name}Error`]
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = (): string => {
    return '🔴'
  }

  const getTitle = (): string => {
    return error
  }

  return (
    <div className={content.inputWrap}>
      <input readOnly onFocus={enableInput} {...props}></input>
      <span data-testid={`${props.name}-status`} title={getTitle()} className={content.status}>{getStatus()}</span>
    </div>
  )
}
