import { ActuatorMongoRepository } from '@/infra/db/mongodb'
import { MongoTestDbHelper } from './db.handler'

const makeSut = (): ActuatorMongoRepository => {
    return new ActuatorMongoRepository()
}

describe('ActuatorMongoRepository', () => {
    beforeAll(async () => await MongoTestDbHelper.connect())
    afterEach(async () => await MongoTestDbHelper.clearDatabase())
    afterAll(async () => await MongoTestDbHelper.disconnect())

    describe('check()', () => {
        test('Should return false if fails', async () => {
            const sut = makeSut()
            const actuator = await sut.check(
                'actuatorIdentification',
                'deviceIdentification'
            )
            expect(actuator).toBeFalsy()
        })
    })
})
