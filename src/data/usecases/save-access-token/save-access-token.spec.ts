import { SetStorageMock } from "@/data/test/mock-set-storage"
import { LocalSaveAccessToken } from "./save-access-token"
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = ():SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  it('should call SetStorage with correct method', async () => {
    const { setStorageMock, sut } = makeSut()
    const accessToken = faker.datatype.uuid()
    await sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })

   it('should rethrow if SetStorage throws', async () => {
    const { setStorageMock, sut } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
    const promise =  sut.save(faker.datatype.uuid())
    await expect(promise).rejects.toThrow(new Error())
  })
})
