import { CheckSensorRepository, CheckActuatorRepository } from '@/data/protocols/db'

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
