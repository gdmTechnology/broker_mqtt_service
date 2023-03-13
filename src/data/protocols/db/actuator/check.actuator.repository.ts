export interface CheckActuatorRepository {
    check: (actuatorIdentification: string, deviceIdentification: string) => Promise<CheckActuatorRepository.Result>
}

export namespace CheckActuatorRepository {
    export type Result = boolean
}
