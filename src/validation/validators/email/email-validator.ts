import { InvalidFieldError } from '@/validation/errors'
import { type FieldValidation } from '@/validation/protocols'

export class EmailValidator implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error | null {
    return this.validateEmail(value) ? null : new InvalidFieldError(this.field)
  }

  validateEmail (email: string): RegExpMatchArray | null {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }
}
