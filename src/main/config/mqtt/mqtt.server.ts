import mqtt from 'mqtt'
// import { KafkaProducer } from '@/infra/kafka'
import env from '@/main/config/env'

let client = null
// let kafkaProducer = null

const options = {
    clientId: env.mqttPublisherClientId
}

export const MqttSetup = {
    async connect() {
        if (!client) {
            client = mqtt.connect(`mqtt://mosquitto:${env.mqttBrokerPort}`, options)

            client.on('connect', async function () {
                console.log(`Is connected ? ${client.connected}`)
                client.subscribe('measure')
                client.subscribe('actuator')
                client.subscribe('keepalive')
            })

            client.on('error', (error) => {
                console.log(`Unable to connect: ${error}`)
            })

            client.on('message', function (topic: string, message) {
                console.log('Topic:: ', topic)
                console.log('Message:: ', message)
            })

            return client
        }
    }
}
