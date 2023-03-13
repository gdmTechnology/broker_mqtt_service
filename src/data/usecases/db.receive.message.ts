import { ReceiveMessage } from '@/domain/usecases'
import { CheckSensorRepository, CheckActuatorRepository } from '@/data/protocols'

export class DbReceiveMessage implements ReceiveMessage {
    constructor(
        private readonly checkSensorRepository: CheckSensorRepository,
        private readonly checkActuatorRepository: CheckActuatorRepository
    ) { }

    async handle(message: ReceiveMessage.Params): Promise<boolean> {
        try {
            let exists = false
            if (message.sensorIdentification) exists = await this.checkSensorRepository.check(message.sensorIdentification, message.deviceIdentification)
            else exists = await this.checkActuatorRepository.check(message.sensorIdentification, message.deviceIdentification)
            return exists
        } catch (error) {
            return false
        }
    }
}
