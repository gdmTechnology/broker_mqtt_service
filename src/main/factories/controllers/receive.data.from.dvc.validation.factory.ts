import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

export const makeReceiveDataFromDvcValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for (const field of ['deviceIdentification', 'currentValue', 'timestamp']) {
        validations.push(new RequiredFieldValidation(field))
    }
    return new ValidationComposite(validations)
}
