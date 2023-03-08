import { DbMqttBroker } from '@/data/usecases'
import { MqttBroker } from '@/domain/usecases'
import { PublisherSpy } from '@/tests/data/mocks'

type SutTypes = {
    publisher: PublisherSpy
    sut: DbMqttBroker
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const publisher = new PublisherSpy()
    const sut = new DbMqttBroker(publisher)
    return { sut, publisher }
}

const mockRequest = (): MqttBroker.Params => ({
    deviceIdentification: 'deviceIdentification',
    actuatorIdentification: 'actuatorIdentification',
    actuatorCurrentValue: 0
})

describe('DbMqttBroker', () => {
    test('Should call Publisher with correct values', async () => {
        const { sut, publisher } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(publisher.params).toEqual(request)
    })

    test('Should throw if Publisher throws', async () => {
        const { sut, publisher } = makeSut()
        jest.spyOn(publisher, 'publish').mockImplementationOnce(throwError)
        const request = mockRequest()
        const promise = sut.handle(request)
        await expect(promise).rejects.toThrow()
    })
})
