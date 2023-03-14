export class DeviceNotFoundError extends Error {
  constructor() {
    super('Not found device')
    this.name = 'NotFoundError'
  }
}
