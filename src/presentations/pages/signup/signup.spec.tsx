import React from "react"
import { RenderResult, render } from "@testing-library/react"
import { SignUp } from "./signup"
import { MemoryRouter, Routes, Route } from "react-router-dom"

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
    const sut = render(
    <MemoryRouter initialEntries={['/signup']}>
      <Routes>
        <Route path='/signup' element={<SignUp />}></Route>
      </Routes>
    </MemoryRouter>
  )
    return {
        sut
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

describe('SignUp Component', () => {
    let sut: RenderResult

    beforeEach(() => {
    const initals = makeSut()
    sut = initals.sut
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
})