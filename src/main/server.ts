import 'module-alias/register'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db/mongodb'
import { setupKafka } from '@/main/config/kafka'
import { MqttSetup } from '@/main/config/mqtt'

MongoHelper.connect(env.mongoUrl)
    .then(async () => {
        const mqttClient = await MqttSetup.connect()
        const kafkaProducer = await setupKafka(mqttClient)

        mqttClient.on('up/measure', function (topic: string, message) {
            console.log('Topic:: ', topic)
            console.log('Message:: ', message)
            kafkaProducer.send(message)
        })
        const { setupApp } = await import('./config/app')
        const app = await setupApp()
        app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
    })
    .catch(console.error)
