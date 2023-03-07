export interface SaveSensorMeasureRepository {
    save: (data: SaveSensorMeasureRepository.Params) => Promise<SaveSensorMeasureRepository.Result>
}

export namespace SaveSensorMeasureRepository {
    export type Params = {
        sensorIdentification: string
        sensorTenantId: string
        sensorTimeStamp: string
        sensorEquipment: string
        sensorMeasureType: string
        sensorValue: string
    }
    export type Result = {
        sensorIdentification: string
        sensorTenantId: string
        sensorEquipment: string
        sensorMeasureType: string
        sensorValue: string
        sensorTimeStamp: string
    }
}
