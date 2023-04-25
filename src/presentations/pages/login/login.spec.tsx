import React from 'react'
import { type RenderResult, render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import 'jest-localstorage-mock'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { Login } from './login'
import { ValidationSpy, AuthenticationSpy } from '@/presentations/test'
import { faker } from '@faker-js/faker'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()

  const sut = render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path='/login' element={<Login validation={validationSpy} authentication={authenticationSpy} />}></Route>
        <Route path='/signup' element={<div data-testid='route'>signup</div>}></Route>
      </Routes>
    </MemoryRouter>
  )

  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}

const simulateValidSubmit = async (sut: RenderResult, email: string, password: string): Promise<void> => {
  const emailInput = sut.getByTestId('email') as HTMLInputElement
  const passwordInput = sut.getByTestId('password') as HTMLInputElement
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement

  await waitFor(() => {
    fireEvent.change(emailInput, { target: { value: email } })
    fireEvent.change(passwordInput, { target: { value: password } })
    fireEvent.click(submitButton)
  })
}

describe('Login Component', () => {
  let sut: RenderResult
  let validationSpy: ValidationSpy
  let authenticationSpy: AuthenticationSpy

  beforeEach(() => {
    localStorage.clear()
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

  it('should show spinner on submit', async () => {
    validationSpy.errorMessage = ''
    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()

    await simulateValidSubmit(sut, fakeEmail, fakePassword)
    const spinner = sut.getByTestId('spinner')

    expect(spinner).toBeTruthy()
  })

  it('should call authentication with correct values', async () => {
    validationSpy.errorMessage = ''
    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()

    await simulateValidSubmit(sut, fakeEmail, fakePassword)

    expect(authenticationSpy.input).toEqual({
      email: fakeEmail,
      password: fakePassword
    })
  })

  it('should call authentication only once', async () => {
    validationSpy.errorMessage = ''
    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()

    await Promise.all([simulateValidSubmit(sut, fakeEmail, fakePassword), simulateValidSubmit(sut, fakeEmail, fakePassword)])

    expect(authenticationSpy.countCalls).toBe(1)
  })

  it('should not call Authentication if form is invalid', () => {
    const form = sut.getByTestId('form')

    fireEvent.submit(form)

    expect(authenticationSpy.countCalls).toBe(0)
  })

  it('should present Error if Authentication fails', async () => {
    validationSpy.errorMessage = ''
    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()
    const error = new InvalidCredentialsError()
    const errorWrap = sut.getByTestId('error-wrap')
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)

    await simulateValidSubmit(sut, fakeEmail, fakePassword)

    await waitFor(() => errorWrap)
    const mainError = sut.getByTestId('main-error')

    expect(mainError.textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })

  it('should add accessToken to localStorage in success', async () => {
    validationSpy.errorMessage = ''
    const fakeEmail = faker.internet.email()
    const fakePassword = faker.internet.password()
    const form = sut.getByTestId('form')
    await simulateValidSubmit(sut, fakeEmail, fakePassword)
    await waitFor(() => form)

    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
  })

  it('should go to signup page', async () => {
    const register = sut.getByTestId('signup')

    fireEvent.click(register)

    const newPage = sut.getByTestId('route')

    expect(newPage.textContent).toBe('signup')
  })
})
