import React from 'react'
import { type RenderResult, render, cleanup, fireEvent } from '@testing-library/react'
import { Login } from './login'
import { ValidationSpy } from '@/presentations/test'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = faker.random.words()
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

  afterEach(cleanup)

  it('should start with initial state', () => {
    const errorWrap = sut.getByTestId('error-wrap')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('password-status')

    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should call validation with correct email and password', () => {
    const emailInput = sut.getByTestId('email') as HTMLInputElement
    const fakeEmail = faker.internet.email()
    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    const fakePassword = faker.internet.password()

    fireEvent.change(emailInput, { target: { value: fakeEmail } })
    fireEvent.change(passwordInput, { target: { value: fakePassword } })

    expect(emailInput.value).toBe(fakeEmail)
    expect(passwordInput.value).toBe(fakePassword)
    expect(validationSpy.input).toEqual({
      email: fakeEmail,
      password: fakePassword
    })
  })

  it('should show Email error if validation fails', () => {
    const emailInput = sut.getByTestId('email') as HTMLInputElement
    const fakeEmail = faker.internet.email()
    const emailStatus = sut.getByTestId('email-status')

    fireEvent.change(emailInput, { target: { value: fakeEmail } })

    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('should show password error if validation fails', () => {
    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    const fakePassword = faker.internet.password()
    const passwordStatus = sut.getByTestId('password-status')

    fireEvent.change(passwordInput, { target: { value: fakePassword } })

    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show valid password state if validation succeeds ', () => {
    validationSpy.errorMessage = ''
    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    const fakePassword = faker.internet.password()
    const passwordStatus = sut.getByTestId('password-status')

    fireEvent.change(passwordInput, { target: { value: fakePassword } })

    expect(passwordStatus.title).toBe('')
    expect(passwordStatus.textContent).toBe('🟢')
  })
})
