import React from 'react'
import { type RenderResult, render, cleanup, fireEvent } from '@testing-library/react'
import { Login } from './login'
import { ValidationSpy, AuthenticationSpy } from '@/presentations/test'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(<Login validation={validationSpy} authentication={authenticationSpy} />)
  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}

describe('Login Component', () => {
  let sut: RenderResult
  let validationSpy: ValidationSpy
  let authenticationSpy: AuthenticationSpy

  beforeEach(() => {
    const initals = makeSut()
    sut = initals.sut
    validationSpy = initals.validationSpy
    authenticationSpy = initals.authenticationSpy
  })

  afterEach(cleanup)

  it('should start with initial state', () => {
    const errorWrap = sut.getByTestId('error-wrap')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('password-status')

    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(emailStatus.title).toBe('Campo Obrigatório!')
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe('Campo Obrigatório!')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should call validation with correct email', () => {
    const emailInput = sut.getByTestId('email') as HTMLInputElement
    const fakeEmail = faker.internet.email()

    fireEvent.change(emailInput, { target: { value: fakeEmail } })

    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(fakeEmail)
    expect(emailInput.value).toBe(fakeEmail)
  })

  it('should call validation with correct password', () => {
    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    const fakePassword = faker.internet.password()

    fireEvent.change(passwordInput, { target: { value: fakePassword } })

    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(fakePassword)
    expect(passwordInput.value).toBe(fakePassword)
  })

  it('should show Email error if validation fails', () => {
    validationSpy.errorMessage = faker.random.words()
    const emailInput = sut.getByTestId('email') as HTMLInputElement
    const fakeEmail = faker.internet.email()
    const emailStatus = sut.getByTestId('email-status')

    fireEvent.change(emailInput, { target: { value: fakeEmail } })

    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('should show password error if validation fails', () => {
    validationSpy.errorMessage = faker.random.words()
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

  it('should show valid Email state if validation succeeds', () => {
    validationSpy.errorMessage = ''
    const emailInput = sut.getByTestId('email') as HTMLInputElement
    const fakeEmail = faker.internet.email()
    const emailStatus = sut.getByTestId('email-status')

    fireEvent.change(emailInput, { target: { value: fakeEmail } })

    expect(emailStatus.title).toBe('')
    expect(emailStatus.textContent).toBe('🟢')
  })

  it('should enable button if validation succeeds', () => {
    validationSpy.errorMessage = ''
    const emailInput = sut.getByTestId('email') as HTMLInputElement
    const fakeEmail = faker.internet.email()
    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    const fakePassword = faker.internet.password()
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    fireEvent.change(emailInput, { target: { value: fakeEmail } })
    fireEvent.change(passwordInput, { target: { value: fakePassword } })

    expect(submitButton.disabled).toBe(false)
  })

  it('should show spinner on submit', () => {
    validationSpy.errorMessage = ''
    const emailInput = sut.getByTestId('email') as HTMLInputElement
    const fakeEmail = faker.internet.email()
    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    const fakePassword = faker.internet.password()
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    fireEvent.change(emailInput, { target: { value: fakeEmail } })
    fireEvent.change(passwordInput, { target: { value: fakePassword } })
    fireEvent.click(submitButton)

    const spinner = sut.getByTestId('spinner')

    expect(spinner).toBeTruthy()
  })

  it('should call authentication with correct values', () => {
    validationSpy.errorMessage = ''
    const emailInput = sut.getByTestId('email') as HTMLInputElement
    const fakeEmail = faker.internet.email()
    const passwordInput = sut.getByTestId('password') as HTMLInputElement
    const fakePassword = faker.internet.password()
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    fireEvent.change(emailInput, { target: { value: fakeEmail } })
    fireEvent.change(passwordInput, { target: { value: fakePassword } })
    fireEvent.click(submitButton)

    expect(authenticationSpy.input).toEqual({
      email: fakeEmail,
      password: fakePassword
    })
  })
})
