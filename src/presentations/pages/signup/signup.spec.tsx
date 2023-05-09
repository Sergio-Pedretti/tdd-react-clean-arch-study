import React from "react"
import { RenderResult, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { SignUp } from "./signup"
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom"
import { faker } from "@faker-js/faker"
import { AuthenticationSpy, SaveAccessTokenMock, ValidationSpy } from "@/presentations/test"
import { Helper } from "@/presentations/test"
import { AddAccountSpy } from "@/presentations/test/mock-add-account"
import { EmailInUseError, InvalidCredentialsError } from "@/domain/errors"
import { Login } from "../login/login"

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  addAccountSpy: AddAccountSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

const DisplayLocation = (): JSX.Element => {
  const location = useLocation()
  return <div data-testid="location-display">{location.pathname}</div>
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const addAccountSpy = new AddAccountSpy()
    const saveAccessTokenMock = new SaveAccessTokenMock()
    const authenticationSpy = new AuthenticationSpy()

    const sut = render(
    <MemoryRouter initialEntries={['/signup']}>
      <Routes>
        <Route path='/' element={<div data-testid='main'>main</div>}>
        </Route>
        <Route path='/signup' element={<SignUp 
        validation={validationSpy} 
        addAccount={addAccountSpy}
        saveAccessToken={saveAccessTokenMock}/>}
        ></Route>
        <Route path='/login' element={<Login validation={validationSpy} authentication={authenticationSpy} saveAccessToken={saveAccessTokenMock} />}></Route>
      </Routes>
      <DisplayLocation />
    </MemoryRouter>
  )
    return {
        sut,
        validationSpy,
        addAccountSpy,
        saveAccessTokenMock
    }
}

describe('SignUp Component', () => {
    let sut: RenderResult
    let validationSpy: ValidationSpy
    let addAccountSpy: AddAccountSpy
    let saveAccessTokenMock: SaveAccessTokenMock

    beforeEach(() => {
    const initals = makeSut()
    sut = initals.sut
    validationSpy = initals.validationSpy
    addAccountSpy = initals.addAccountSpy
    saveAccessTokenMock = initals.saveAccessTokenMock
  })

    afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should start with initial state', () => {
    validationSpy.errorMessage = 'Campo Obrigatório!'

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationSpy.errorMessage)
    Helper.testStatusForField(sut, 'email', validationSpy.errorMessage)
    Helper.testStatusForField(sut, 'password', validationSpy.errorMessage)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationSpy.errorMessage)
  })

   it('should show name error if validation fails', () => {
    Helper.populateField(sut, 'name', '')
    Helper.testStatusForField(sut, 'name', 'Campo Obrigatório!')
  })

    it('should show email error if validation fails', () => {
    Helper.populateField(sut, 'email', '')
    Helper.testStatusForField(sut, 'email', 'Campo Obrigatório!')
  })

  it('should show password error if validation fails', () => {
    Helper.populateField(sut, 'password', '')
    Helper.testStatusForField(sut, 'password', 'Campo Obrigatório!')
  })

  it('should show passwordConfirmation error if validation fails', () => {
    Helper.populateField(sut, 'passwordConfirmation', '')
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo Obrigatório!')
  })

  it('should show valid name if validation succeeds', () => {
    const name = faker.name.fullName()
    Helper.populateField(sut, 'name', name)
    Helper.testStatusForField(sut, 'name', '')
  })

  it('should show valid email if validation succeeds', () => {
    const email = faker.internet.email()
    Helper.populateField(sut, 'email', email)
    Helper.testStatusForField(sut, 'email', '')
  })

  it('should show valid password if validation succeeds', () => {
    const password = faker.internet.password()
    Helper.populateField(sut, 'password', password)
    Helper.testStatusForField(sut, 'password', '')
  })

  it('should show valid passwordConfirmation if validation succeeds', () => {
    const passwordConfirmation = faker.internet.password()
    Helper.populateField(sut, 'passwordConfirmation', passwordConfirmation)
    Helper.testStatusForField(sut, 'passwordConfirmation', '')
  })

  it('should enable button if validation succeeds', () => {
    Helper.simulateValidForm(sut)
  })

  it('should show spinner on submit', async () => {
    await Helper.simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })

  it('should call AddAccount with correct values', async () => {
    const name = faker.name.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await Helper.simulateValidSubmit(sut, name, email, password)

    expect(addAccountSpy.input).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    })
  })

  it('should call AddAccount only once', async () => {
    await Promise.all([Helper.simulateValidSubmit(sut), Helper.simulateValidSubmit(sut)])

    expect(addAccountSpy.countCalls).toBe(1)
  })

  it('should not call Authentication if form is invalid', () => {
    const form = sut.getByTestId('form')

    fireEvent.submit(form)

    expect(addAccountSpy.countCalls).toBe(0)
  })

  it('should present Error if AddAccount fails', async () => {
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    
    await Helper.simulateValidSubmit(sut)

    Helper.testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'error-wrap', 1)
  })

   it('should call SaveAccessToken on success', async () => {
    const form = sut.getByTestId('form')
    await Helper.simulateValidSubmit(sut)
    await waitFor(() => form)

    expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.account.accessToken)
    expect(screen.getByTestId('location-display').textContent).toBe('/')
  })

  it('should present error if SaveAccessToken fails', async () => {
    const error = new InvalidCredentialsError()
    const errorWrap = sut.getByTestId('error-wrap')
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)

    await Helper.simulateValidSubmit(sut)

    await waitFor(() => errorWrap)
    const mainError = sut.getByTestId('main-error')

    expect(mainError.textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })

  it('should go to login page', async () => {
    const login = sut.getByTestId('login')

    fireEvent.click(login)

    const title = sut.getByTestId('title')

    expect(title.textContent).toBe('Login')
    expect(screen.getByTestId('location-display').textContent).toBe('/login')
  })
})