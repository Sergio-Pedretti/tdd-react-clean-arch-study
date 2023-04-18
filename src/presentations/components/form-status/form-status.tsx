import React from 'react'
import content from './form-status.module.scss'
import { Spinner } from '@/presentations/components/spinner/spinner'

export const FormStatus: React.FC = () => {
  return (
    <div className={content.errorWrap}>
        <Spinner className={content.spinner} />
        <span className={content.error}>Erro</span>
    </div>
  )
}
