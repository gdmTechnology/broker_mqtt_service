export interface CheckSensorRepository {
    check: (sensorIdentification: string, deviceIdentification: string) => Promise<CheckSensorRepository.Result>
}

export namespace CheckSensorRepository {
    export type Result = boolean
}
