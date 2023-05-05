import React from "react"
import { RenderResult, fireEvent, render } from "@testing-library/react"
import { SignUp } from "./signup"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { faker } from "@faker-js/faker"
import { ValidationSpy } from "@/presentations/test"

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

const testChildCount = (sut: RenderResult, field: string, count:number) => {
    const element = sut.getByTestId(field)
    expect(element.childElementCount).toBe(count)
}

const testButtonIsDisabled = (sut: RenderResult, fieldName:string, isDisabled: boolean) => {
    const button = sut.getByTestId(fieldName) as HTMLButtonElement
    expect(button.disabled).toBe(isDisabled)
}

const testStatusForField = (sut: RenderResult, fieldName:string, validationError: string) => {
    const fieldStatus = sut.getByTestId(`${fieldName}-status`) 
    expect(fieldStatus.title).toBe(validationError || "Campo Obrigatório!")
    expect(fieldStatus.textContent).toBe(validationError ? '🟢': '🔴')
}

const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()) => {
    const field = sut.getByTestId(fieldName)
    fireEvent.change(field, { target: { value } })
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

    testChildCount(sut, 'error-wrap', 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'name', '')
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'passwordConfirmation', validationError)
  })

   it('should show name error if validation fails', () => {
    validationSpy.errorMessage = faker.random.words()
    const name = faker.name.fullName()

    populateField(sut, 'email', name)
    testStatusForField(sut, 'name', '')
  })
})