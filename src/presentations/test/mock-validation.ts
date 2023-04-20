import { type Validation } from '@/presentations/protocols/validation'

export class ValidationSpy implements Validation {
  errorMessage: string
  input: Record<string, string>

  validate (input: Record<string, string>): string {
    this.input = input
    return this.errorMessage
  }
}
