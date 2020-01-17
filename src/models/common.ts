export type IInputState = {
    pristine: boolean,
    dirty: boolean,
    validated: boolean,
    valid: boolean,
    hasFocus: boolean,
    firstTouchIsNow: boolean,
    empty: boolean,
};

export type Validator = (value: string, inputState: IInputState) => IValidationResult;

export interface IValidationResult {
    valid: boolean,
    errorType: string,
    errorText: string,
}
