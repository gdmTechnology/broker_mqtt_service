export interface SaveActuatorRepository {
    save: (data: SaveActuatorRepository.Params) => Promise<SaveActuatorRepository.Result>
}

export namespace SaveActuatorRepository {
    export type Params = CreateActuator.Params & { actuatorIdentification: string }
    export type Result = CreateActuator.Result | null
}

export namespace CreateActuator {
    export type Params = {
        accountId: string
        deviceIdentification: string
        actuatorIdentification: string
        actuatorTenantId: string
        actuatorName: string
        actuatorCurrentValue: number
        actuatorTimeStamp: string
    }

    export type Result = {
        accountId: string
        deviceIdentification: string
        actuatorIdentification: string
        actuatorTenantId: string
        actuatorName: string
        actuatorCurrentValue: number
        actuatorTimeStamp: string
        createdAt: Date
        updatedAt: Date
    }
}
