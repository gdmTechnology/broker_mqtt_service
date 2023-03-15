import { CheckSensorRepository, CheckActuatorRepository, KafkaSendData } from '@/data/protocols'

export class CheckSensorRepositorySpy implements CheckSensorRepository {
    params: any
    result: any = true

    async check(sensorIdentification: string, deviceIdentification: string): Promise<CheckSensorRepository.Result> {
        this.params = { sensorIdentification, deviceIdentification }
        return this.result
    }
}

export class CheckActuatorRepositorySpy implements CheckActuatorRepository {
    params: any
    result: any = true

    async check(actuatorIdentification: string, deviceIdentification: string): Promise<CheckActuatorRepository.Result> {
        this.params = { actuatorIdentification, deviceIdentification }
        return this.result
    }
}

export class KafkaSendDataSpy implements KafkaSendData {
    params: any
    result: any = true

    async send(data: KafkaSendData.Request): Promise<boolean> {
        this.params = data
        return this.result
    }
}
