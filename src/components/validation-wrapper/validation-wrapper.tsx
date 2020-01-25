import React, { useEffect, useState } from 'react';
import {
    IInputState,
    IValidationResults,
    IValidatorWithPredefinedRule
} from '../../models/common';
import { createValidationResults, runValidators } from '../../helpers/validation-engine';
import { InputTextProps } from '../input-text/input-text';
import { eventEmitter } from '../../helpers/event-emitter';

type ValidationWrapperProps = InputTextProps & {
    valueHandler: (value: string, inputState: IInputState) => void,
    validByDefault?: boolean, // Валидно ли поле по умолчанию.
    validateAfterBlur?: boolean, // Валидировать поле после потери фокуса.
    validateAfterFocus?: boolean, // Валидировать каждый раз на фокус, кроме первого получения фокуса.
    validateAfterFirstFocus?: boolean, // Валидировать после первого получения фокуса.
    validateOnInputAfterFirstBlur?: boolean, // Валидировать после нажатия клавиши, если поле до этого теряло фокус хотя бы раз.
    validateOnInputBeforeFirstBlur?: boolean, // Валидировать после нажатия клавиши, до первой потери фокуса полем.
    onFirstFocus?: (value: string, inputState: IInputState) => void,
    onFirstBlur?: (value: string, inputState: IInputState) => void,
    onFocus?: (value: string, inputState: IInputState) => void,
    onBlur?: (value: string, inputState: IInputState) => void,
    onValidate?: (currValue: string, validationResults: IValidationResults) => void,
    validators?: IValidatorWithPredefinedRule[],
}

const ValidationWrapper = (InputComponent: React.FC<InputTextProps>) => {
    const WrappedComponent: React.FC<ValidationWrapperProps> = (props: ValidationWrapperProps) => {
        const [ currValue, setCurrValue ] = useState(props.value);
        const [ touchCount, setTouchCount ] = useState(0);
        const [ inputState, setInputState ] = useState({
            pristine: true,
            dirty: false,
            validated: false,
            valid: props.validByDefault || true,
            hasFocus: false,
            firstTouchIsNow: false,
            empty: props.value.length === 0,
            errorMessages: [''],
        } as IInputState);

        function updateValue(newValue: string): string {
            setCurrValue(newValue);
            props.valueHandler(newValue, inputState);
            return newValue;
        }

        function gotFocus() {
            const firstTouch = touchCount === 0;
            let validationResult: IValidationResults = createValidationResults();
            let validated = (props.validateAfterFirstFocus || props.validateAfterFocus) ? false : inputState.validated;

            setTouchCount(touchCount + 1);

            if (firstTouch && props.onFirstFocus) props.onFirstFocus(props.value, inputState);
            if (props.onFocus) props.onFocus(props.value, inputState);
            if (props.validators) {
                if (firstTouch && props.validateAfterFirstFocus) {
                    validationResult = runValidators(props.validators, currValue, inputState);
                    validated = true;
                }
                if (!firstTouch && props.validateAfterFocus) {
                    validationResult = runValidators(props.validators, currValue, inputState);
                    validated = true;
                }
                if (props.onValidate) props.onValidate(currValue, validationResult);
            }

            setInputState({
                ...inputState,
                hasFocus: true,
                firstTouchIsNow: firstTouch,
                pristine: false,
                valid: validationResult.totalValid(),
                validated: validated,
                errorMessages: validationResult.errorMessages(),
            });
        }

        function gotBlur() {
            const firstTouch = touchCount === 1;
            let validationResult: IValidationResults = createValidationResults();
            let validated = props.validateAfterBlur ? false : inputState.validated;

            if (firstTouch && props.onFirstBlur) {
                props.onFirstBlur(props.value, inputState);
                setInputState({ ...inputState, firstTouchIsNow: false, });
            }
            if (props.onBlur) props.onBlur(props.value, inputState);
            if (props.validators && props.validateAfterBlur) {
                validationResult = runValidators(props.validators, currValue, inputState);
                validated = true;
                if (props.onValidate) props.onValidate(currValue, validationResult);
            }

            setInputState({
                ...inputState,
                hasFocus: false,
                firstTouchIsNow: false,
                valid: validationResult.totalValid(),
                validated: validated,
                errorMessages: validationResult.errorMessages(),
            });
        }

        function userInput(value: string) {
            const firstTouch = inputState.firstTouchIsNow;
            let validationResult: IValidationResults = createValidationResults();
            let validated = (props.validateOnInputBeforeFirstBlur || props.validateOnInputAfterFirstBlur) ?
                false :
                inputState.validated;

            updateValue(value);

            if (props.validators) {
                if (firstTouch && props.validateOnInputBeforeFirstBlur) {
                    validationResult = runValidators(props.validators, value, inputState);
                    validated = true;
                }
                if (!firstTouch && props.validateOnInputAfterFirstBlur) {
                    validationResult = runValidators(props.validators, value, inputState);
                    validated = true;
                }
                if (props.onValidate) props.onValidate(currValue, validationResult);
            }

            setInputState({
                ...inputState,
                dirty: true,
                empty: value.length === 0,
                valid: validationResult.totalValid(),
                validated: validated,
                errorMessages: validationResult.errorMessages(),
            });
        }

        function onRunValidation() {
            if (!props.validators) return;
            const validationResult = runValidators(props.validators, currValue, inputState);
            const validated = true;
            const newState = {
                ...inputState,
                valid: validationResult.totalValid(),
                validated: validated,
                errorMessages: validationResult.errorMessages(),
            };
            if (props.onValidate) props.onValidate(currValue, validationResult);
            setInputState(newState);
        }

        useEffect(() => {
            const subscription = eventEmitter
                .subscribe('run validation for ' + props.name, () => onRunValidation());
            return subscription.unsubscribe();
        });

        return(<InputComponent
            { ...props }
            key={'input_' + props.name}
            onFocus={() => gotFocus()}
            onBlur={() => gotBlur()}
            valueHandler={(value: string) => userInput(value)}
            value={props.value}
            hasError={!inputState.valid}
            valid={inputState.valid}
            errorMessage={inputState.errorMessages.length > 0 ? inputState.errorMessages[0] : ''}
        />);
    };

    return WrappedComponent;
};

export default ValidationWrapper;
