interface FieldValidation {
  field: string
  validate: (value: string) => Error
}

class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return new RequiredFieldError()
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
})
