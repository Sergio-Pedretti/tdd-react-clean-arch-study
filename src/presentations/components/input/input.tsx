import React from 'react'
import content from './input.module.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className={content.inputWrap}>
      <input {...props}></input>
      <span className={content.status}>🔴</span>
    </div>
  )
}
