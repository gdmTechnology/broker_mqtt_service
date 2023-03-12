import mqtt from 'mqtt'

let client = null

const options = {
    clientId: process.env.MQTT_PUBLISHER_CLIENTID
}

export const MqttSetup = {
    async connect() {
        if (!client) {
            client = mqtt.connect(`mqtt://mosquitto:${process.env.MQTT_BROKER_PORT}`, options)

            client.on('connect', async function () {
                console.log(`Is connected ? ${client.connected}`)
            })

            client.on('error', (error) => {
                console.log(`Unable to connect: ${error}`)
            })

            return client
        }
    }
}
