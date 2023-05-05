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
    const validationError = ''

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', '')
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

   it('should show name error if validation fails', () => {
    validationSpy.errorMessage = faker.random.words()
    const name = faker.name.fullName()

    Helper.populateField(sut, 'email', name)
    Helper.testStatusForField(sut, 'name', '')
  })
})