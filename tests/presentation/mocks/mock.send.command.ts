import { MqttBroker } from '@/domain/usecases'
export class MqttBrokerSpy implements MqttBroker {
    params = null

    async handle(data: MqttBroker.Params, mqttClient): Promise<boolean> {
        this.params = data
        return true
    }
}
