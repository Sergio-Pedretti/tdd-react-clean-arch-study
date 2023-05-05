import { faker } from "@faker-js/faker"
import { RenderResult, fireEvent } from "@testing-library/react"

export const testChildCount = (sut: RenderResult, field: string, count:number) => {
    const element = sut.getByTestId(field)
    expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (sut: RenderResult, fieldName:string, isDisabled: boolean) => {
    const button = sut.getByTestId(fieldName) as HTMLButtonElement
    expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (sut: RenderResult, fieldName:string, validationError: string) => {
    const fieldStatus = sut.getByTestId(`${fieldName}-status`) 
    expect(fieldStatus.title).toBe(validationError)
    expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()) => {
    const field = sut.getByTestId(fieldName)
    fireEvent.change(field, { target: { value } })
}