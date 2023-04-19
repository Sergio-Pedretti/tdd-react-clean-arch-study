import React from 'react'
import content from './form-status.module.scss'
import { Spinner } from '@/presentations/components'
import { useLogin } from '@/presentations/contexts/form/form-context'

export const FormStatus: React.FC = () => {
  const { state, errorState } = useLogin()
  return (
    <div data-testid="error-wrap" className={content.errorWrap}>
        {state.isLoading && <Spinner className={content.spinner} />}
        {errorState.main && <span className={content.error}>{errorState.main}</span>}
    </div>
  )
}
