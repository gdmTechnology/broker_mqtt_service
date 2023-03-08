import { MqttBroker } from '@/domain/usecases'
export class MqttBrokerSpy implements MqttBroker {
    params = null

    async handle(data: MqttBroker.Params): Promise<void> {
        this.params = data
    }
}
