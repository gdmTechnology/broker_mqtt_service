export interface CheckDevice {
    handle: (data: CheckDevice.Params) => Promise<boolean>
}

export namespace CheckDevice {
    export type Params = {
        deviceIdentification: string
        actuatorIdentification?: string
        sensorIdentification?: string
        currentValue: number
        timestamp: string
    }
}
