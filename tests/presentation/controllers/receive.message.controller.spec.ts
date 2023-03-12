import { ReceiveMessageController } from '@/presentation/controllers'
import { ValidationSpy, ReceiveMessageSpy } from '../mocks'

const throwError = (): never => {
    throw new Error()
}

const mockRequest = (): ReceiveMessageController.Request => ({
    deviceIdentification: 'deviceIdentification',
    actuatorIdentification: 'actuatorIdentification',
    currentValue: 1,
    timestamp: 'timestamp'
})

type SutTypes = {
    validationSpy: ValidationSpy
    receiveMessageSpy: ReceiveMessageSpy
    sut: ReceiveMessageController
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const receiveMessageSpy = new ReceiveMessageSpy()
    const sut = new ReceiveMessageController(validationSpy, receiveMessageSpy)
    return {
        validationSpy,
        receiveMessageSpy,
        sut
    }
}

describe('ReceiveMessageController', () => {
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

    test('Should call ReceiveMessage with correct values', async () => {
        const { sut, receiveMessageSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(receiveMessageSpy.params).toEqual(request)
    })

    test('Should return 500 if ReceiveMessage throws', async () => {
        const { sut, receiveMessageSpy } = makeSut()
        jest.spyOn(receiveMessageSpy, 'handle').mockImplementationOnce(throwError)
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should return 204 if ReceiveMessage succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toEqual(204)
    })
})
