import { ValidationComposite } from '@/validation/validators/composite/composite'
import { makeLoginValidation } from './login-validation-factory'
import { BuilderValidator } from '@/validation/validators/builder/builder'

describe('LoginValidationFactory', () => {
  it('should compose ValidationCompose with correct validations', () => {
    const composite = makeLoginValidation()

    expect(composite).toEqual(new ValidationComposite([
      ...BuilderValidator.field('email').required().email().build(),
      ...BuilderValidator.field('password').required().min(6).build()
    ]))
  })
})
