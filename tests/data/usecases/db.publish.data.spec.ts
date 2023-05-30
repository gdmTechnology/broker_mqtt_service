import { DbPublishData } from '@/data/usecases'
import { PublishData } from '@/domain/usecases'
import { KafkaSendDataSpy } from '../mocks'

type SutTypes = {
    publishSpy: KafkaSendDataSpy
    sut: PublishData
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const publishSpy = new KafkaSendDataSpy()
    const sut = new DbPublishData(publishSpy)
    return { sut, publishSpy }
}

const mockRequestSensorData = (): PublishData.Params => ({
    deviceIdentification: 'deviceIdentification',
    sensorIdentification: 'sensorIdentification',
    currentValue: 1,
    timestamp: 'timestamp'
})

describe('DbPublishData', () => {
    test('Should call PublishData with correct values', async () => {
        const { sut, publishSpy } = makeSut()
        const request = mockRequestSensorData()
        await sut.handle(request)
        expect(publishSpy.params).toHaveProperty('deviceIdentification')
    })
    test('Should return false if PublishData throws', async () => {
        const { sut, publishSpy } = makeSut()
        jest.spyOn(publishSpy, 'send').mockImplementationOnce(throwError)
        const request = mockRequestSensorData()
        const resp = await sut.handle(request)
        expect(resp).toBeFalsy()
    })
})
