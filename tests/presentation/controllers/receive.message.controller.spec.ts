import { ReceiveDataFromDeviceController } from '@/presentation/controllers'
import { ValidationSpy, CheckDeviceSpy, PublishDataSpy } from '../mocks'

const throwError = (): never => {
    throw new Error()
}

const mockRequest = (): ReceiveDataFromDeviceController.Request => ({
    deviceIdentification: 'deviceIdentification',
    actuatorIdentification: 'actuatorIdentification',
    currentValue: 1,
    timestamp: 'timestamp'
})

type SutTypes = {
    validationSpy: ValidationSpy
    checkDeviceSpy: CheckDeviceSpy
    publishDataSpy: PublishDataSpy
    sut: ReceiveDataFromDeviceController
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const checkDeviceSpy = new CheckDeviceSpy()
    const publishDataSpy = new PublishDataSpy()
    const sut = new ReceiveDataFromDeviceController(validationSpy, checkDeviceSpy, publishDataSpy)
    return {
        validationSpy,
        checkDeviceSpy,
        publishDataSpy,
        sut
    }
}

describe('ReceiveDataFromDeviceController', () => {
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

    test('Should call CheckDevice with correct values', async () => {
        const { sut, checkDeviceSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(checkDeviceSpy.params).toEqual(request)
    })

    test('Should return 500 if CheckDevice throws', async () => {
        const { sut, checkDeviceSpy } = makeSut()
        jest.spyOn(checkDeviceSpy, 'handle').mockImplementationOnce(throwError)
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should return 204 if succeds', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toEqual(204)
    })

    test('Should return 400 if CheckDevice fail', async () => {
        const { sut } = makeSut()
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toEqual(204)
    })

    test('Should return 500 if PublishData throws', async () => {
        const { sut, checkDeviceSpy } = makeSut()
        jest.spyOn(checkDeviceSpy, 'handle').mockImplementationOnce(throwError)
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })

    test('Should call PublishData with correct values', async () => {
        const { sut, publishDataSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(publishDataSpy.params).toEqual(request)
    })
})
