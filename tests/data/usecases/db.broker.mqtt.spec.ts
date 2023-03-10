import { DbMqttBroker } from '@/data/usecases'
import { MqttBroker } from '@/domain/usecases'

type SutTypes = {
    sut: DbMqttBroker
}

const throwError = (): never => {
    throw new Error()
}

const mqttClient = {
    publish() { }
}

const makeSut = (): SutTypes => {
    const sut = new DbMqttBroker()
    return { sut }
}

const mockRequest = (): MqttBroker.Params => ({
    deviceIdentification: 'deviceIdentification',
    actuatorIdentification: 'actuatorIdentification',
    actuatorCurrentValue: 0
})

describe('DbMqttBroker', () => {
    test('Should return true if mqttClient is called', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const response = await sut.handle(request, mqttClient)
        expect(response).toBeTruthy()
    })

    test('Should return false if mqttClient is empty', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const response = await sut.handle(request, null)
        expect(response).toBeFalsy()
    })
})
