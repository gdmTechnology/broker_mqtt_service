import { SendCommandController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator, makeSendCommandValidation, makeDbSendCommand } from '@/main/factories'

export const makeSendCommandController = (): Controller => {
    const controller = new SendCommandController(makeSendCommandValidation(), makeDbSendCommand())
    return makeLogControllerDecorator(controller)
}
