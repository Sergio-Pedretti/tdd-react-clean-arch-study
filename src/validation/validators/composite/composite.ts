import { type Validation } from '@/presentations/protocols/validation'
import { type FieldValidation } from '@/validation/protocols'

export class ValidationComposite implements Validation {
  constructor (private readonly validators: FieldValidation[]) {}

  validate (fieldName: string, fieldValue: string): string {
    const validators = this.validators.filter(value => value.field === fieldName)
    for (const validator of validators) {
      const error = validator.validate(fieldValue)
      if (error) {
        return error.message
      }
    }
    return ''
  }
}
