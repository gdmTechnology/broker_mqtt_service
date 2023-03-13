export interface SaveSensorRepository {
    save: (data: SaveSensorRepository.Params) => Promise<SaveSensorRepository.Result>
}

export namespace SaveSensorRepository {
    export type Params = CreateSensor.Params & { sensorIdentification: string }
    export type Result = CreateSensor.Result | null
}

export namespace CreateSensor {
    export type Params = {
        accountId: string
        deviceIdentification: string
        sensorTenantId: string
        sensorName: string
        sensorEquipment: string
        sensorMeasureType: string
        sensorCurrentValue: number
        sensorTimeStamp: string
    }

    export type Result = {
        accountId: string
        deviceIdentification: string
        sensorIdentification: string
        sensorTenantId: string
        sensorName: string
        sensorEquipment: string
        sensorMeasureType: string
        sensorCurrentValue: number
        sensorTimeStamp: string
        createdAt: Date
        updatedAt: Date
    }
}
