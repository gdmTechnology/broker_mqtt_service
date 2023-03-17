import { Kafka } from 'kafkajs'
import env from '@/main/config/env'
import { KafkaConsumer, KafkaSendMsg } from '@/infra/kafka'

export const setupKafka = async (mqttClient): Promise<any> => {
    const kafkaServer = new Kafka({
        clientId: env.kafkaClientId,
        brokers: [`${env.kafkaBrokerHost}: ${env.kafkaBrokerPort}`]
    })
    const kafkaConsumer = new KafkaConsumer(kafkaServer)
    await kafkaConsumer.consumer(mqttClient)
    const kafkaProducer = new KafkaSendMsg()
    return kafkaProducer
}
