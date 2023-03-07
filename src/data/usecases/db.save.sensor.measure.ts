import { SaveSensorMeasure } from '@/domain/usecases'
import { LoadSensorRepository } from '@/data/protocols'

export class DbSaveSensorMeasure implements SaveSensorMeasure {
    constructor(
        private readonly loadSensorRepository: LoadSensorRepository
    ) { }

    async handle(data: SaveSensorMeasure.Request): Promise<void> {
        const sensor = await this.loadSensorRepository.load(data.sensorIdentification)
        if (sensor) {
            const params = {
                ...data,
                sensorTenantId: sensor.sensorTenantId,
                sensorEquipment: sensor.sensorEquipment,
                sensorMeasureType: sensor.sensorMeasureType
            }
            // publicar no broker mqtt
        }
    }
}
