import { CheckSensorRepository } from '@/data/protocols'
import { SensorModel } from './models'

export class SensorMongoRepository implements CheckSensorRepository {
    async check(sensorIdentification: string, deviceIdentification: string): Promise<CheckSensorRepository.Result> {
        const sensor = await SensorModel.findOne({ sensorIdentification })
        return !!sensor
    }
}
