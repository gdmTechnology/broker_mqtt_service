export interface MqttBroker {
    handle: (data: MqttBroker.Params, mqttClient) => Promise<boolean>
}

export namespace MqttBroker {
    export type Params = {
        deviceIdentification: string
        actuatorIdentification: string
        actuatorCurrentValue: number
    }
}
