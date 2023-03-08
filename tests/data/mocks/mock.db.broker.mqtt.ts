import { Publisher } from '@/data/protocols'

export class PublisherSpy implements Publisher {
    params: any

    async publish(params: any): Promise<void> {
        this.params = params
    }
}
