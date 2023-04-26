import { FieldValidationSpy } from '@/validation/test/mock-field-validation'
import { ValidationComposite } from './composite'

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const fieldValidationSpy = new FieldValidationSpy('any_field')
    const fieldValidationSpy2 = new FieldValidationSpy('any_field')
    fieldValidationSpy2.error = new Error('any_error')
    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2
    ])

    const error = sut.validate('any_field', 'any_value')

    expect(error).toBe('any_error')
  })
})
