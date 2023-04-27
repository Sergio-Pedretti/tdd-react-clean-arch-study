import { EmailValidator } from '../email/email-validator'
import { MinLengthValidator } from '../min-length/min-length-validator'
import { RequiredFieldValidation } from '../required-field/required-field-validation'
import { type FieldValidation } from '@/validation/protocols'

export class BuilderValidator {
  constructor (
    private readonly fieldName: string,
    private readonly fieldValue: string,
    private readonly validations: FieldValidation[]
  ) {
  }

  static field (fieldName: string, fieldValue: string = ''): BuilderValidator {
    return new BuilderValidator(fieldName, fieldValue, [])
  }

  required (): BuilderValidator {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  min (min: number): BuilderValidator {
    this.validations.push(new MinLengthValidator(this.fieldName, min))
    return this
  }

  email (): BuilderValidator {
    this.validations.push(new EmailValidator(this.fieldValue))
    return this
  }

  build (): FieldValidation[] {
    return this.validations
  }
}
