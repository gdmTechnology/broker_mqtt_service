import { AccountMongoRepository } from '@/infra/db/mongodb'
import { MongoTestDbHelper } from './db.handler'

import { AccountModel } from '@/infra/db/mongodb/models'

const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
}

const addAccountParams = (): any => ({
    email: 'any_email@gmail.com',
    tenant: 'tenant',
    password: 'any_password',
    identification: 'identification',
    name: 'name',
    lastName: 'lastName',
    birthDate: new Date(),
    tellphone: 'tellphone',
    cellphone: 'cellphone',
    streetAddress: 'streetAddress',
    numberAddress: 'numberAddress',
    districtAddress: 'districtAddress',
    cityAddress: 'cityAddress',
    stateAddress: 'stateAddress',
    accessToken: 'accessToken',
    role: null
})

const addAccountParamsWithRoleAdmin = (): any => ({
    email: 'adminl@gmail.com',
    tenant: 'tenant',
    password: 'any_password',
    identification: 'admin_identification',
    name: 'name',
    lastName: 'lastName',
    birthDate: new Date(),
    tellphone: 'tellphone',
    cellphone: 'cellphone',
    streetAddress: 'streetAddress',
    numberAddress: 'numberAddress',
    districtAddress: 'districtAddress',
    cityAddress: 'cityAddress',
    stateAddress: 'stateAddress',
    accessToken: 'accessToken',
    role: 'admin'
})

describe('AccountMongoRepository', () => {
    beforeAll(async () => await MongoTestDbHelper.connect())
    afterEach(async () => await MongoTestDbHelper.clearDatabase())
    afterAll(async () => await MongoTestDbHelper.disconnect())

    describe('LoadAccountByTokenRepository()', () => {
        test('Should return an account on loadByToken without role', async () => {
            const sut = makeSut()
            const request = addAccountParams()
            await AccountModel.create({ ...request })
            const account = await sut.load({ accessToken: request.accessToken })
            expect(account).toBeDefined()
        })

        test('Should return an account on loadByToken with admin role', async () => {
            const sut = makeSut()
            const request = addAccountParams()
            const requestAdmin = addAccountParamsWithRoleAdmin()
            await AccountModel.create(requestAdmin)
            await AccountModel.create(request)
            const account = await sut.load({ accessToken: requestAdmin.accessToken, role: 'admin' })
            expect(account).toBeDefined()
            expect(account.identification).toBeTruthy()
        })

        test('Should return null on loadByToken with invalid role', async () => {
            const sut = makeSut()
            const request = addAccountParams()
            await AccountModel.create(request)
            const account = await sut.load({ accessToken: request.accessToken, role: 'admin' })
            expect(account).toBeNull()
        })

        test('Should return account on loadByToken with user is admin role', async () => {
            const sut = makeSut()
            const request = addAccountParamsWithRoleAdmin()
            await AccountModel.create(request)
            const account = await sut.load({ accessToken: request.accessToken })
            expect(account).toBeDefined()
            expect(account.identification).toBe(request.identification)
        })

        test('Should return null if loadByToken fails', async () => {
            const sut = makeSut()
            const request = addAccountParamsWithRoleAdmin()
            const account = await sut.load({ accessToken: request.accessToken })
            expect(account).toBeNull()
        })
    })
})
