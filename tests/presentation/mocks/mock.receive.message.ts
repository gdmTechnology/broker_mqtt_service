import { CheckDevice } from '@/domain/usecases'
export class CheckDeviceSpy implements CheckDevice {
    params = null

    async handle(data: CheckDevice.Params): Promise<boolean> {
        this.params = data
        return true
    }
}
