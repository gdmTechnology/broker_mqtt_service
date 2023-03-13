import { SensorMongoRepository } from '@/infra/db/mongodb'
import { MongoTestDbHelper } from './db.handler'
import { CheckSensorRepository } from '@/data/protocols'

const makeSut = (): SensorMongoRepository => {
    return new SensorMongoRepository()
}

describe('CheckSensorRepository', () => {
    beforeAll(async () => await MongoTestDbHelper.connect())
    afterEach(async () => await MongoTestDbHelper.clearDatabase())
    afterAll(async () => await MongoTestDbHelper.disconnect())

    describe('check()', () => {
        test('Should return false if sensorIdentification doesnt exists ', async () => {
            const sut = makeSut()
            const sensorMeasure = await sut.check('sensorIdentification', 'deviceIdentification')
            expect(sensorMeasure).toBeFalsy()
        })
    })
})
