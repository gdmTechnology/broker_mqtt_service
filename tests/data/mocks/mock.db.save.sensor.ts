import { LoadSensorRepository, SaveSensorMeasureRepository } from '@/data/protocols/db'

export class LoadSensorRepositorySpy implements LoadSensorRepository {
    params: any
    result: any = {
        accountId: 'accountId',
        sensorIdentification: 'sensorIdentification',
        sensorTenantId: 'sensorTenantId',
        sensorName: 'sensorName',
        sensorEquipment: 'sensorEquipment',
        sensorMeasureType: 'sensorMeasureType',
        sensorCurrentValue: 'sensorCurrentValue',
        sensorTimeStamp: 'sensorTimeStamp',
        createdAt: 'createdAt',
        updateAt: 'updateAt'
    }

    async load(params: any): Promise<LoadSensorRepository.Result> {
        this.params = params
        return this.result
    }
}

export class SaveSensorMeasureRepositorySpy implements SaveSensorMeasureRepository {
    params: any
    result: any = {
        sensorIdentification: 'sensorIdentification',
        sensorTenantId: 'sensorTenantId',
        sensorName: 'sensorName',
        sensorEquipment: 'sensorEquipment',
        sensorMeasureType: 'sensorMeasureType',
        sensorCurrentValue: 'sensorCurrentValue',
        sensorTimeStamp: 'sensorTimeStamp',
        createdAt: 'createdAt',
        updateAt: 'updateAt'
    }

    async save(params: any): Promise<SaveSensorMeasureRepository.Result> {
        this.params = params
        return this.result
    }
}
