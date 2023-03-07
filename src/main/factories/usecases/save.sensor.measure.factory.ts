import { SaveSensorMeasure } from '@/domain/usecases'
import { DbSaveSensorMeasure } from '@/data/usecases'
import { SensorMongoRepository } from '@/infra/db/mongodb'

export const makeDbSaveSensorMeasures = (): SaveSensorMeasure => {
    const sensorMongoRepository = new SensorMongoRepository()
    return new DbSaveSensorMeasure(sensorMongoRepository)
}
