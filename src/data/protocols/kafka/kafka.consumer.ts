export interface Consumer {
    consumer: (mqttClient) => Promise<void>
}
