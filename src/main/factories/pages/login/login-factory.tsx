import React from 'react'
import { Login } from '@/presentations/pages'
import { makeRemoteAuthentication } from '@/main/factories/use-cases/authentication'
import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'
import { makeLocalSaveAccessToken } from '@/main/factories/use-cases/save-access-token/local-save-access-token-factory'

export const MakeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
