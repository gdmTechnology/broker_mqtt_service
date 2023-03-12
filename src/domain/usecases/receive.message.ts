export interface ReceiveMessage {
    handle: (data: ReceiveMessage.Params) => Promise<boolean>
}

export namespace ReceiveMessage {
    export type Params = {
        deviceIdentification: string
        actuatorIdentification?: string
        sensorIdentification?: string
        currentValue: number
        timestamp: string
    }
}
