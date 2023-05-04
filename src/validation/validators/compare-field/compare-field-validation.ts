import { CompareFieldError } from '@/validation/errors'
import { type FieldValidation } from '@/validation/protocols'

export class CompareFieldValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare: string
    ) {}

  validate (value: string): Error | null {
    return value === this.valueToCompare ? null : new CompareFieldError()
  }
}
