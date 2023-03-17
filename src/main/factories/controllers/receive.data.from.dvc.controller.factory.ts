import { ReceiveDataFromDeviceController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator, makeSendCommandValidation, makeDbCheckDevice, makeDbPublishData } from '@/main/factories'

export const makeReceiveDataController = (): Controller => {
    const controller = new ReceiveDataFromDeviceController(makeSendCommandValidation(), makeDbCheckDevice(), makeDbPublishData())
    return makeLogControllerDecorator(controller)
}
