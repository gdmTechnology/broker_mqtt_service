import { ReceiveMessage } from '@/domain/usecases'
export class ReceiveMessageSpy implements ReceiveMessage {
    params = null

    async handle(data: ReceiveMessage.Params): Promise<boolean> {
        this.params = data
        return true
    }
}
