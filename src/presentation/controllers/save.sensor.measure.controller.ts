import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '../protocols/validation'
import { badRequest, serverError, noContent } from '../helpers/http.helper'
import { SaveSensorMeasure } from '@/domain/usecases'

export class SaveSensorMeasureController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly saveSensorMeasure: SaveSensorMeasure
    ) { }

    async handle(data: SaveSensorMeasureController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) return badRequest(error)
            await this.saveSensorMeasure.handle(data)
            return noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace SaveSensorMeasureController {
    export interface Request {
        sensorIdentification: string
        sensorValue: string
        sensorTimeStamp: string
    }
}
