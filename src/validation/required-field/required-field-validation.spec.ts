import { faker } from '@faker-js/faker'

interface FieldValidation {
  field: string
  validate: (value: string) => Error | null
}

class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error | null {
    return value ? null : new RequiredFieldError()
  }
}

class RequiredFieldError extends Error {
  constructor () {
    super('Campo Obrigatório!')
    this.name = 'RequiredFieldError'
  }
}

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')

    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is not empty', () => {
    const sut = new RequiredFieldValidation('email')

    const error = sut.validate(faker.random.word())

    expect(error).toBeFalsy()
  })
})
