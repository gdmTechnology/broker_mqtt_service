import { SensorMongoRepository } from '@/infra/db/mongodb'
import { MongoTestDbHelper } from './db.handler'
import { LoadSensorRepository } from '@/data/protocols'

const makeSut = (): SensorMongoRepository => {
    return new SensorMongoRepository()
}

const loadSensorParams = (): string => 'sensorIdentification'

describe('LoadSensorRepository', () => {
    beforeAll(async () => await MongoTestDbHelper.connect())
    afterEach(async () => await MongoTestDbHelper.clearDatabase())
    afterAll(async () => await MongoTestDbHelper.disconnect())

    describe('load()', () => {
        test('Should return null if sensorIdentification doesnt exists ', async () => {
            const sut = makeSut()
            const request = loadSensorParams()
            const sensorMeasure = await sut.load(request)
            expect(sensorMeasure).toBeNull()
        })
    })
})
