import { MqttBroker } from '@/domain/usecases'
import { Publisher } from '@/data/protocols'

export class DbMqttBroker implements MqttBroker {
    constructor(
        private readonly mqtt: Publisher
    ) { }

    async handle(data: MqttBroker.Params): Promise<void> {
        await this.mqtt.publish(data)
    }
}
