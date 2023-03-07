import { LoadSensorRepository } from '@/data/protocols'
import { SensorModel } from './models'

export class SensorMongoRepository implements LoadSensorRepository {
    async load(sensorIdentification: string): Promise<LoadSensorRepository.Result> {
        const sensor = await SensorModel.findOne({ sensorIdentification })
        return sensor
    }
}
