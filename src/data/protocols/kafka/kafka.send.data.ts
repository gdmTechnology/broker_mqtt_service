export interface KafkaSendData {
    send: (message: KafkaSendData.Request) => Promise<boolean>
}

export namespace KafkaSendData {
    export type Request = {
        deviceIdentification: string
        actuatorIdentification?: string
        sensorIdentification?: string
        currentValue: number
        timestamp: string
    }
}
