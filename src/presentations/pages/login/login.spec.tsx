import React from 'react'
import { type RenderResult, render, cleanup, fireEvent } from '@testing-library/react'
import { Login } from './login'
import { ValidationSpy } from '@/presentations/test/mock-validation'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  let sut: RenderResult
  let validationSpy: ValidationSpy

  beforeEach(() => {
    const initals = makeSut()
    sut = initals.sut
    validationSpy = initals.validationSpy
  })

  afterEach(() => {
    cleanup()
  })

  it('should start with initial state', () => {
    const errorWrap = sut.getByTestId('error-wrap')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('password-status')

    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(emailStatus.title).toBe('Campo Obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe('Campo Obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should call validation with correct email', () => {
    const emailInput = sut.getByTestId('email') as HTMLInputElement
    const fakeEmail = faker.internet.email()

    fireEvent.change(emailInput, { target: { value: fakeEmail } })

    expect(emailInput.value).toBe(fakeEmail)
    expect(validationSpy.input).toEqual({
      input: fakeEmail
    })
  })

  it('should call validation with correct password', () => {
    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    const fakePassword = faker.internet.password()

    fireEvent.change(passwordInput, { target: { value: fakePassword } })

    expect(passwordInput.value).toBe(fakePassword)
    expect(validationSpy.input).toEqual({
      input: fakePassword
    })
  })
})
