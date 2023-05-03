import { SetStorageSpy } from "@/data/test/mock-set-storage"
import { LocalSaveAccessToken } from "./save-access-token"
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageSpy: SetStorageSpy
}

const makeSut = ():SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return {
    sut,
    setStorageSpy
  }
}

describe('LocalSaveAccessToken', () => {
  it('should call SetStorage with correct method', async () => {
    const {setStorageSpy, sut} = makeSut()
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
