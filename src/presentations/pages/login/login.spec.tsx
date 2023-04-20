import React from 'react'
import { type RenderResult, render, cleanup, fireEvent } from '@testing-library/react'
import { Login } from './login'
import { type Validation } from '@/presentations/protocols/validation'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}
export class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
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

    fireEvent.change(emailInput, { target: { value: 'any_email' } })

    expect(emailInput.value).toBe('any_email')
    expect(validationSpy.input).toEqual({
      input: 'any_email'
    })
  })

  it('should call validation with correct password', () => {
    const passwordInput = sut.getByTestId('password') as HTMLInputElement

    fireEvent.change(passwordInput, { target: { value: 'any_password' } })

    expect(passwordInput.value).toBe('any_password')
    expect(validationSpy.input).toEqual({
      input: 'any_password'
    })
  })
})
