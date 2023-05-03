import React from 'react'
import { type RenderResult, render, cleanup, fireEvent, waitFor, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Login } from './login'
import { ValidationSpy, AuthenticationSpy } from '@/presentations/test'
import { faker } from '@faker-js/faker'
import { InvalidCredentialsError } from '@/domain/errors'
import { SaveAccessTokenMock } from '@/presentations/test/mock-save-access-token'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

const DisplayLocation = (): JSX.Element => {
  const location = useLocation()
  return <div data-testid="location-display">{location.pathname}</div>
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()

  const sut = render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path='/' element={<div data-testid='main'>main</div>}></Route>
        <Route path='/login' element={<Login validation={validationSpy} authentication={authenticationSpy} saveAccessToken={saveAccessTokenMock} />}></Route>
        <Route path='/signup' element={<div data-testid='route'>signup</div>}></Route>
      </Routes>
      <DisplayLocation />
    </MemoryRouter>
  )

  return {
    sut,
    validationSpy,
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): Promise<void> => {
  await populateEmailField(sut, email)
  await populatePasswordField(sut, password)
  const submitButton = sut.getByTestId('submit') as HTMLButtonElement

  await waitFor(() => {
    fireEvent.click(submitButton)
  })
}

const populateEmailField = async (sut: RenderResult, email: string = faker.internet.email()): Promise<void> => {
  const emailInput = sut.getByTestId('email') as HTMLInputElement

  await waitFor(() => {
    fireEvent.change(emailInput, { target: { value: email } })
  })
}

const populatePasswordField = async (sut: RenderResult, password: string): Promise<void> => {
  const passwordInput = sut.getByTestId('password') as HTMLInputElement

  await waitFor(() => {
    fireEvent.change(passwordInput, { target: { value: password } })
  })
}

describe('Login Component', () => {
  let sut: RenderResult
  let validationSpy: ValidationSpy
  let authenticationSpy: AuthenticationSpy
  let saveAccessTokenMock: SaveAccessTokenMock

  beforeEach(() => {
    const initals = makeSut()
    sut = initals.sut
    validationSpy = initals.validationSpy
    authenticationSpy = initals.authenticationSpy
    saveAccessTokenMock = initals.saveAccessTokenMock
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

    await simulateValidSubmit(sut)
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

    await Promise.all([simulateValidSubmit(sut), simulateValidSubmit(sut)])

    expect(authenticationSpy.countCalls).toBe(1)
  })

  it('should not call Authentication if form is invalid', () => {
    const form = sut.getByTestId('form')

    fireEvent.submit(form)

    expect(authenticationSpy.countCalls).toBe(0)
  })

  it('should present Error if Authentication fails', async () => {
    validationSpy.errorMessage = ''
    const error = new InvalidCredentialsError()
    const errorWrap = sut.getByTestId('error-wrap')
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)

    await simulateValidSubmit(sut)

    await waitFor(() => errorWrap)
    const mainError = sut.getByTestId('main-error')

    expect(mainError.textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })

  it('should call SaveAccessToken on success', async () => {
    validationSpy.errorMessage = ''
    const form = sut.getByTestId('form')

    await simulateValidSubmit(sut)
    await waitFor(() => form)

    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(screen.getByTestId('location-display').textContent).toBe('/')
  })

  it('should go to signup page', async () => {
    const register = sut.getByTestId('signup')

    fireEvent.click(register)

    const newPage = sut.getByTestId('route')

    expect(newPage.textContent).toBe('signup')
    expect(screen.getByTestId('location-display').textContent).toBe('/signup')
  })
})
