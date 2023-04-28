import { BuilderValidator } from '@/validation/validators/builder/builder'
import { ValidationComposite } from '@/validation/validators/composite/composite'

export const makeLoginValidation = (): ValidationComposite => {
  return new ValidationComposite([
    ...BuilderValidator.field('email').required().email().build(),
    ...BuilderValidator.field('password').required().min(6).build()
  ])
}
