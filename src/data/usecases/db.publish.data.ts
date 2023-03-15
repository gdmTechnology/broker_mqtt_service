import { PublishData } from '@/domain/usecases'
import { KafkaSendData } from '@/data/protocols'

export class DbPublishData implements PublishData {
    constructor(
        private readonly publish: KafkaSendData
    ) { }

    async handle(message: PublishData.Params): Promise<boolean> {
        try {
            await this.publish.send(message)
            return true
        } catch (error) {
            return false
        }
    }
}
