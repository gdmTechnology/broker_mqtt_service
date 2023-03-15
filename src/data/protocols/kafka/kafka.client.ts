import { Producer } from 'kafkajs'

export interface KafkaClient {
    kafkaProducer: () => Promise<Producer>
}
