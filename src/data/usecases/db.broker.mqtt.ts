import { MqttBroker } from '@/domain/usecases'

export class DbMqttBroker implements MqttBroker {
    async handle(message: MqttBroker.Params, mqttClient): Promise<boolean> {
        try {
            if (mqttClient) {
                await mqttClient.publish(`command/${message.deviceIdentification}`, message)
                return true
            }
            return false
        } catch (error) {
            console.log('MQTT Error: ', error)
            return false
        }
    }
}
