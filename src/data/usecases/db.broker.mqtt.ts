import { MqttBroker } from '@/domain/usecases'

export class DbMqttBroker implements MqttBroker {
    async handle(data: MqttBroker.Params, mqttClient): Promise<boolean> {
        try {
            if (mqttClient) {
                await mqttClient.publish(`command/${data.deviceIdentification}`, data)
                return true
            }
            return false
        } catch (error) {
            console.log('MQTT Error: ', error)
            return false
        }
    }
}
