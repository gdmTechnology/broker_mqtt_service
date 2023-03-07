import { SaveSensorMeasureController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator, makeSaveSensorMeasuresValidation, makeDbSaveSensorMeasures } from '@/main/factories'

export const makeSaveSensorMeasuresController = (): Controller => {
    const controller = new SaveSensorMeasureController(makeSaveSensorMeasuresValidation(), makeDbSaveSensorMeasures())
    return makeLogControllerDecorator(controller)
}
