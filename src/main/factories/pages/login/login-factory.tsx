import { RemoteAuthentication } from '@/data/usecases/authentication/remote-autentication'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { Login } from '@/presentations/pages'
import { BuilderValidator } from '@/validation/validators/builder/builder'
import { ValidationComposite } from '@/validation/validators/composite/composite'
import React from 'react'

export const makeLogin: React.FC = () => {
  const url = ''
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = new ValidationComposite([
    ...BuilderValidator.field('email').required().email().build(),
    ...BuilderValidator.field('password').required().min(6).build()
  ])

  return (
        <Login
            authentication={remoteAuthentication}
            validation={validationComposite}
        />
  )
}
