import { CheckDevice } from '@/domain/usecases'
import { DbCheckDevice } from '@/data/usecases'
import { SensorMongoRepository, ActuatorMongoRepository } from '@/infra/db/mongodb'

export const makeDbCheckDevice = (): CheckDevice => {
    const sensorMongoRepository = new SensorMongoRepository()
    const actuatorMongoRepository = new ActuatorMongoRepository()
    return new DbCheckDevice(sensorMongoRepository, actuatorMongoRepository)
}
