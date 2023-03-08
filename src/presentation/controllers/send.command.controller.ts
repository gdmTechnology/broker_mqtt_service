import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '../protocols/validation'
import { badRequest, serverError, noContent } from '../helpers/http.helper'
import { MqttBroker } from '@/domain/usecases'

export class SendCommandController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly mqttBroker: MqttBroker
    ) { }

    async handle(data: SendCommandController.Request): Promise<any> {
        try {
            const error = this.validation.validate(data)
            if (error) return badRequest(error)

            await this.mqttBroker.handle(data)
            return noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace SendCommandController {
    export interface Request {
        deviceIdentification: string
        actuatorIdentification: string
        actuatorCurrentValue: number
    }
}
