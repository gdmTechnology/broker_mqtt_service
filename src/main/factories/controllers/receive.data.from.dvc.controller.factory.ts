import { ReceiveDataFromDeviceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator, makeReceiveDataFromDvcValidation, makeDbCheckDevice, makeDbPublishData } from '@/main/factories'

export const makeReceiveDataController = (): Controller => {
    const controller = new ReceiveDataFromDeviceController(makeReceiveDataFromDvcValidation(), makeDbCheckDevice(), makeDbPublishData())
    return makeLogControllerDecorator(controller)
}
