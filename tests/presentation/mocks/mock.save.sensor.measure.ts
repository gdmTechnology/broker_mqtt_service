import { SaveSensorMeasure } from '@/domain/usecases'
export class SaveSensorMeasureSpy implements SaveSensorMeasure {
    params = null

    async handle(data: SaveSensorMeasure.Request): Promise<void> {
        this.params = data
    }
}
