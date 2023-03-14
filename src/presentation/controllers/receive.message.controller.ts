import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '../protocols/validation'
import { badRequest, serverError, noContent } from '../helpers/http.helper'
import { CheckDevice, PublishData } from '@/domain/usecases'
import { DeviceNotFoundError } from '../errors'

export class ReceiveMessageController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly checkDevice: CheckDevice,
        private readonly publishData: PublishData
    ) { }

    async handle(message: ReceiveMessageController.Request): Promise<any> {
        try {
            const error = this.validation.validate(message)
            if (error) return badRequest(error)

            const device = await this.checkDevice.handle(message)
            if (!device) return badRequest(new DeviceNotFoundError())
            await this.publishData.handle(message)
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
