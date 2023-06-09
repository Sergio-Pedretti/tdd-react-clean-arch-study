import { LocalStorageAdapter } from "./local-storage-adapter"
import { faker } from "@faker-js/faker"
import "jest-localstorage-mock"

describe('LocalStorageAdapter', () => {
  
  beforeEach(() => {
    localStorage.clear()
  })

  it('should call localStorage with correct values', async () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.random.word()

    await sut.set(key,value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)

  })
})
