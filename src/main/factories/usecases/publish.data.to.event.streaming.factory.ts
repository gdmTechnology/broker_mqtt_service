import { PublishData } from '@/domain/usecases'
import { DbPublishData } from '@/data/usecases'
import { KafkaSendMsg } from '@/infra/kafka'

export const makeDbPublishData = (): PublishData => {
    const kafkaSendMsg = new KafkaSendMsg()
    return new DbPublishData(kafkaSendMsg)
}
