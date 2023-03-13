import { DbReceiveMessage } from '@/data/usecases'
import { ReceiveMessage } from '@/domain/usecases'
import { CheckActuatorRepositorySpy, CheckSensorRepositorySpy } from '../mocks'

type SutTypes = {
    checkSensorRepositorySpy: CheckSensorRepositorySpy
    checkActuatorRepositorySpy: CheckActuatorRepositorySpy
    sut: ReceiveMessage
}

const throwError = (): never => {
    throw new Error()
}

const makeSut = (): SutTypes => {
    const checkSensorRepositorySpy = new CheckSensorRepositorySpy()
    const checkActuatorRepositorySpy = new CheckActuatorRepositorySpy()
    const sut = new DbReceiveMessage(checkSensorRepositorySpy, checkActuatorRepositorySpy)
    return { sut, checkSensorRepositorySpy, checkActuatorRepositorySpy }
}

const mockRequestSensorData = (): ReceiveMessage.Params => ({
    deviceIdentification: 'deviceIdentification',
    sensorIdentification: 'sensorIdentification',
    currentValue: 1,
    timestamp: 'timestamp'
})

const mockRequestActuatorData = (): ReceiveMessage.Params => ({
    deviceIdentification: 'deviceIdentification',
    actuatorIdentification: 'actuatorIdentification',
    currentValue: 1,
    timestamp: 'timestamp'
})

describe('DbReceiveMessage', () => {
    test('Should call checkSensorRepository with correct values if sensorIdentification', async () => {
        const { sut, checkSensorRepositorySpy } = makeSut()
        const request = mockRequestSensorData()
        await sut.handle(request)
        expect(checkSensorRepositorySpy.params).toHaveProperty('deviceIdentification')
        expect(checkSensorRepositorySpy.params).toHaveProperty('sensorIdentification')
    })

    test('Should return true if checkSensorRepository return true - sensorIdentification', async () => {
        const { sut } = makeSut()
        const request = mockRequestSensorData()
        const resp = await sut.handle(request)
        expect(resp).toBeTruthy()
    })

    test('Should return false if checkSensorRepository return false - sensorIdentification', async () => {
        const { sut, checkSensorRepositorySpy } = makeSut()
        checkSensorRepositorySpy.result = false
        const request = mockRequestSensorData()
        const resp = await sut.handle(request)
        expect(resp).toBeFalsy()
    })

    test('Should call checkActuatorRepository with correct values if actuatorIdentification', async () => {
        const { sut, checkActuatorRepositorySpy } = makeSut()
        const request = mockRequestActuatorData()
        await sut.handle(request)
        expect(checkActuatorRepositorySpy.params).toHaveProperty('deviceIdentification')
        expect(checkActuatorRepositorySpy.params).toHaveProperty('actuatorIdentification')
    })

    test('Should return true if checkActuatorRepository return true - actuatorIdentification', async () => {
        const { sut } = makeSut()
        const request = mockRequestActuatorData()
        const resp = await sut.handle(request)
        expect(resp).toBeTruthy()
    })

    test('Should return false if checkActuatorRepository return false - actuatorIdentification', async () => {
        const { sut, checkActuatorRepositorySpy } = makeSut()
        checkActuatorRepositorySpy.result = false
        const request = mockRequestActuatorData()
        const resp = await sut.handle(request)
        expect(resp).toBeFalsy()
    })
})
