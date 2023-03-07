import { SaveSensorMeasureController } from '@/presentation/controllers'
import { ValidationSpy, SaveSensorMeasureSpy } from '../mocks'

const throwError = (): never => {
    throw new Error()
}

const mockRequest = (): SaveSensorMeasureController.Request => ({
    sensorIdentification: 'sensorIdentification',
    sensorValue: 'sensorValue',
    sensorTimeStamp: 'sensorTimeStamp'
})

type SutTypes = {
    validationSpy: ValidationSpy
    saveSensorMeasureSpy: SaveSensorMeasureSpy
    sut: SaveSensorMeasureController
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy()
    const saveSensorMeasureSpy = new SaveSensorMeasureSpy()
    const sut = new SaveSensorMeasureController(validationSpy, saveSensorMeasureSpy)
    return {
        validationSpy,
        saveSensorMeasureSpy,
        sut
    }
}

describe('SaveSensorMeasureController', () => {
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

    test('Should call SaveSensorMeasure with correct values', async () => {
        const { sut, saveSensorMeasureSpy } = makeSut()
        const request = mockRequest()
        await sut.handle(request)
        expect(saveSensorMeasureSpy.params).toEqual(request)
    })

    test('Should return 500 if SaveSensorMeasure throws', async () => {
        const { sut, saveSensorMeasureSpy } = makeSut()
        jest.spyOn(saveSensorMeasureSpy, 'handle').mockImplementationOnce(throwError)
        const request = mockRequest()
        const httpResponse = await sut.handle(request)
        expect(httpResponse.statusCode).toBe(500)
    })
})
