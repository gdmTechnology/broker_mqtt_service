export interface MqttBroker {
    handle: (data: MqttBroker.Params) => Promise<void>
}

export namespace MqttBroker {
    export type Params = {
        deviceIdentification: string
        actuatorIdentification: string
        actuatorCurrentValue: number
    }
}
