import { DbSaveSensorMeasure } from '@/data/usecases'
import { SaveSensorMeasure } from '@/domain/usecases'
import { LoadSensorRepositorySpy } from '@/tests/data/mocks'

type SutTypes = {
    loadSensorRepositorySpy: LoadSensorRepositorySpy
    sut: DbSaveSensorMeasure
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const loadSensorRepositorySpy = new LoadSensorRepositorySpy()
    const sut = new DbSaveSensorMeasure(loadSensorRepositorySpy)
    return { sut, loadSensorRepositorySpy }
}

const mockRequest = (): SaveSensorMeasure.Request => ({
    sensorIdentification: 'sensorIdentification',
    sensorValue: 'sensorValue',
    sensorTimeStamp: 'sensorTimeStamp'
})

describe('DbSaveSensorMeasure', () => {
    test('Should call LoadSensorRepository with correct values', async () => {
        const { sut, loadSensorRepositorySpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(loadSensorRepositorySpy.params).toEqual(request.sensorIdentification)
    })

    test('Should throw if LoadSensorRepository throws', async () => {
        const { sut, loadSensorRepositorySpy } = makeSut()
        jest.spyOn(loadSensorRepositorySpy, 'load').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })
})
