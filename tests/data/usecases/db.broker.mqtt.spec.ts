import { DbMqttBroker } from '@/data/usecases'
import { MqttBroker } from '@/domain/usecases'

type SutTypes = {
    sut: MqttBroker
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

const MqttClient = {
    publish() {
        return true
    }
}

describe('DbMqttBroker', () => {
    test('Should return true if MqttClient is valid', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const resp = await sut.handle(request, MqttClient)
        expect(resp).toBeTruthy()
    })

    test('Should return false if MqttClient is empty', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const resp = await sut.handle(request, false)
        expect(resp).toBeFalsy()
    })

    test('Should return false if MqttClient throws', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const resp = await sut.handle(request, true)
        expect(resp).toBeFalsy()
    })
})
