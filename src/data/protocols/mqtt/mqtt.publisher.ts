export interface Publisher {
    publish: (data: Publisher.Params) => Promise<void>
}
export namespace Publisher {
    export type Params = {
        deviceIdentification: string
        actuatorIdentification: string
        actuatorCurrentValue: number
    }
}
