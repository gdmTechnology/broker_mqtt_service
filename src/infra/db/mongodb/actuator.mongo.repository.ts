import { CheckActuatorRepository } from '@/data/protocols'
import { ActuatorModel } from './models'

export class ActuatorMongoRepository implements CheckActuatorRepository {
    async check(actuatorIdentification: string, deviceIdentification: string): Promise<CheckActuatorRepository.Result> {
        const actuator = await ActuatorModel.findOne({ actuatorIdentification })
        return !!actuator
    }
}
