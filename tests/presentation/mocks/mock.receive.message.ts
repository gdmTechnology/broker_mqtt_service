import { CheckDevice, PublishData } from '@/domain/usecases'
export class CheckDeviceSpy implements CheckDevice {
    params = null
    result = true
    async handle(data: CheckDevice.Params): Promise<boolean> {
        this.params = data
        return this.result
    }
}

export class PublishDataSpy implements PublishData {
    params = null
    result = true
    async handle(data: PublishData.Params): Promise<boolean> {
        this.params = data
        return this.result
    }
}
