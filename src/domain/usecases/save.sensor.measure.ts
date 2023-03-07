export interface SaveSensorMeasure {
    handle: (data: SaveSensorMeasure.Request) => Promise<void>
}

export namespace SaveSensorMeasure {
    export type Request = {
        sensorIdentification: string
        sensorValue: string
        sensorTimeStamp: string
    }
}
