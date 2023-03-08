import { SendCommandController } from '@/presentation/controllers'
import { ValidationSpy, MqttBrokerSpy } from '../mocks'

const throwError = (): never => {
    throw new Error()
}

const mockRequest = (): SendCommandController.Request => ({
    deviceIdentification: 'deviceIdentification',
    actuatorIdentification: 'actuatorIdentification',
    actuatorCurrentValue: 1
})

type SutTypes = {
    validationSpy: ValidationSpy
    mqttBrokerSpy: MqttBrokerSpy
    sut: SendCommandController
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const mqttBrokerSpy = new MqttBrokerSpy()
    const sut = new SendCommandController(validationSpy, mqttBrokerSpy)
    return {
        validationSpy,
        mqttBrokerSpy,
        sut
    }
}

describe('SendCommandController', () => {
    test('Should call validation with correct values', async () => {
        const { sut, validationSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(validationSpy.input).toEqual(request)
    })

    test('Should return 400 if Validation fails', async () => {
        const { sut, validationSpy } = makeSut()
        validationSpy.error = new Error()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(400)
    })

    test('Should return 500 if Validation throws', async () => {
        const { sut, validationSpy } = makeSut()
        jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should call MqttBroker with correct values', async () => {
        const { sut, mqttBrokerSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(mqttBrokerSpy.params).toEqual(request)
    })

    test('Should return 500 if SaveSensorMeasure throws', async () => {
        const { sut, mqttBrokerSpy } = makeSut()
        jest.spyOn(mqttBrokerSpy, 'handle').mockImplementationOnce(throwError)
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
