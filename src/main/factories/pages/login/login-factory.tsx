import { RemoteAuthentication } from '@/data/usecases/authentication/remote-autentication'
import { Login } from '@/presentations/pages'
import { BuilderValidator } from '@/validation/validators/builder/builder'
import { ValidationComposite } from '@/validation/validators/composite/composite'
import React from 'react'
import { url } from '../http/url-factory'
import { makeAxiosHttp } from '../http/axios-http-factory'

export const MakeLogin: React.FC = () => {
  const remoteAuthentication = new RemoteAuthentication(url, makeAxiosHttp())
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
