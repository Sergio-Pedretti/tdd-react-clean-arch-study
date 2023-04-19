import React from 'react'
import { type RenderResult, render, fireEvent, cleanup } from '@testing-library/react'
import { LoginConsumer } from './login'
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
  const sut = render(<LoginConsumer validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should start with initial state', () => {
    const { sut } = makeSut()

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

  it('should call validation with correct values', () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')

    fireEvent.change(emailInput, { target: { value: 'Hello, World!' } })

    expect(validationSpy.input).toEqual({
      input: ''
    })
  })
})
