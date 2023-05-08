import React from "react"
import { RenderResult, fireEvent, render } from "@testing-library/react"
import { SignUp } from "./signup"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { faker } from "@faker-js/faker"
import { ValidationSpy } from "@/presentations/test"
import { Helper } from "@/presentations/test"
import { AddAccountSpy } from "@/presentations/test/mock-add-account"
import { EmailInUseError } from "@/domain/errors"

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  addAccountSpy: AddAccountSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const addAccountSpy = new AddAccountSpy()
    const sut = render(
    <MemoryRouter initialEntries={['/signup']}>
      <Routes>
        <Route path='/signup' element={<SignUp validation={validationSpy} addAccount={addAccountSpy}/>}></Route>
      </Routes>
    </MemoryRouter>
  )
    return {
        sut,
        validationSpy,
        addAccountSpy
    }
}

describe('SignUp Component', () => {
    let sut: RenderResult
    let validationSpy: ValidationSpy
    let addAccountSpy: AddAccountSpy

    beforeEach(() => {
    const initals = makeSut()
    sut = initals.sut
    validationSpy = initals.validationSpy
    addAccountSpy = initals.addAccountSpy
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
})