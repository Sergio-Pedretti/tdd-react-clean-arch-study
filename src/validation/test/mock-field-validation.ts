import { type FieldValidation } from '@/validation/protocols'

export class FieldValidationSpy implements FieldValidation {
  error: Error | null = null
  constructor (readonly field: string) {}
  validate (): Error | null {
    return this.error
  }
}
