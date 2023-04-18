import React, { useContext } from 'react'
import content from './form-status.module.scss'
import { Spinner } from '@/presentations/components'
import Context from '@/presentations/contexts/form/form-context'

export const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={content.errorWrap}>
        {isLoading && <Spinner className={content.spinner} />}
        {errorMessage && <span className={content.error}>{errorMessage}</span>}
    </div>
  )
}
