import { type Validation } from '@/presentations/protocols/validation'

export class LoginValidation implements Validation {
  errorMessage: string = 'Campo Obrigatório!'
  fieldName: string
  fieldValue: string

  validate (fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  }
}
