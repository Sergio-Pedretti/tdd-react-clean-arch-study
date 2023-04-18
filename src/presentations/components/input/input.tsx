import React from 'react'
import content from './input.module.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = (props: Props) => {
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  return (
    <div className={content.inputWrap}>
      <input readOnly onFocus={enableInput} {...props}></input>
      <span className={content.status}>🔴</span>
    </div>
  )
}
