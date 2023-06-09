import { MinLengthValidator } from '../min-length/min-length-validator'
import { RequiredFieldValidation } from '../required-field/required-field-validation'
import { BuilderValidator } from './builder'
import { EmailValidator } from '../email/email-validator'

describe('BuilderValidator', () => {
  it('should return RequiredFieldValidation', () => {
    const validations = BuilderValidator.field('field').required().build()

    expect(validations).toEqual([new RequiredFieldValidation('field')])
  })

  it('should return MinLengthValidator', () => {
    const validations = BuilderValidator.field('field').min(5).build()

    expect(validations).toEqual([new MinLengthValidator('field', 5)])
  })

  it('should return EmailValidator', () => {
    const validations = BuilderValidator.field('field').email().build()

    expect(validations).toEqual([new EmailValidator('field')])
  })

  it('should return a list of validations', () => {
    const validations = BuilderValidator.field('field').required().min(100).email().build()

    expect(validations).toEqual([
      new RequiredFieldValidation('field'),
      new MinLengthValidator('field', 100),
      new EmailValidator('field')
    ])
  })
})
