import { MqttBroker } from '@/domain/usecases'
import { DbMqttBroker } from '@/data/usecases'

export const makeDbSendCommand = (): MqttBroker => {
    return new DbMqttBroker()
}
