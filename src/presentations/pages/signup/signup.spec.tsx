import React from "react"
import { RenderResult, render } from "@testing-library/react"
import { SignUp } from "./signup"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { faker } from "@faker-js/faker"
import { ValidationSpy } from "@/presentations/test"
import { Helper } from "@/presentations/test"

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const sut = render(
    <MemoryRouter initialEntries={['/signup']}>
      <Routes>
        <Route path='/signup' element={<SignUp validation={validationSpy} />}></Route>
      </Routes>
    </MemoryRouter>
  )
    return {
        sut,
        validationSpy
    }
}

describe('SignUp Component', () => {
    let sut: RenderResult
    let validationSpy: ValidationSpy

    beforeEach(() => {
    const initals = makeSut()
    sut = initals.sut
    validationSpy = initals.validationSpy
  })

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

  it('should show valid name if validation succeeds ', () => {
    const name = faker.name.fullName()
    Helper.populateField(sut, 'name', name)
    Helper.testStatusForField(sut, 'name', '')
  })
})