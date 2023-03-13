import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '../protocols/validation'
import { badRequest, serverError, noContent } from '../helpers/http.helper'
import { CheckDevice } from '@/domain/usecases'

export class ReceiveMessageController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly checkDevice: CheckDevice
    ) { }

    async handle(message: ReceiveMessageController.Request): Promise<any> {
        try {
            const error = this.validation.validate(message)
            if (error) return badRequest(error)

            await this.checkDevice.handle(message)
            return noContent()
        } catch (error) {
            return serverError(error)
        }
    }
}

export namespace ReceiveMessageController {
    export interface Request {
        deviceIdentification: string
        actuatorIdentification?: string
        sensorIdentification?: string
        currentValue: number
        timestamp: string
    }
}
