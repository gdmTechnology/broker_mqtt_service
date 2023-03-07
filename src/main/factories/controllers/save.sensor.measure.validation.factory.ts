import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeSaveSensorMeasuresValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['sensorIdentification', 'sensorValue', 'sensorTimeStamp']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
