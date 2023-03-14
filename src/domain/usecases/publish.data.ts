export interface PublishData {
    handle: (data: PublishData.Params) => Promise<boolean>
}

export namespace PublishData {
    export type Params = {
        deviceIdentification: string
        actuatorIdentification?: string
        sensorIdentification?: string
        currentValue: number
        timestamp: string
    }
}
