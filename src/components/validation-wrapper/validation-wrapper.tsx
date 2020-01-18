import React, { useState } from 'react';
import { IInputState, Validator } from '../../models/common';
import { InputTextProps } from '../input-text/input-text';

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
    validator?: Validator,
}

const ValidationWrapper = (InputComponent: React.FC<InputTextProps>) => {
    const WrappedComponent: React.FC<ValidationWrapperProps> = (props: ValidationWrapperProps) => {
        const [ touchCount, setTouchCount ] = useState(0);
        const [ inputState, setInputState ] = useState({
            pristine: true,
            dirty: false,
            validated: false,
            valid: props.validByDefault || false,
            hasFocus: false,
            firstTouchIsNow: false,
            empty: props.value.length === 0,
        } as IInputState);

        function updateValue(newValue: string): string {
            props.valueHandler(newValue, inputState);
            return newValue;
        }

        function gotFocus() {
            const firstTouch = touchCount === 0;
            let validationResult = {
                valid: !!props.validByDefault,
                errorType: '',
                errorText: '',
            };
            let validated = (props.validateAfterFirstFocus || props.validateAfterFocus) ? false : inputState.validated;

            setTouchCount(touchCount + 1);

            if (firstTouch && props.onFirstFocus) {
                props.onFirstFocus(props.value, inputState);
            }
            if (props.onFocus) props.onFocus(props.value, inputState);
            if (props.validator) {
                if (firstTouch && props.validateAfterFirstFocus) {
                    validationResult = props.validator(props.value, inputState);
                    validated = true;
                }
                if (!firstTouch && props.validateAfterFocus) {
                    validationResult = props.validator(props.value, inputState);
                    validated = true;
                }
            }

            setInputState({
                ...inputState,
                hasFocus: true,
                firstTouchIsNow: firstTouch,
                pristine: false,
                valid: validationResult.valid,
                validated: validated,
            });
        }

        function gotBlur() {
            const firstTouch = touchCount === 1;
            let validationResult = {
                valid: !!props.validByDefault,
                errorType: '',
                errorText: '',
            };
            let validated = props.validateAfterBlur ? false : inputState.validated;

            if (firstTouch && props.onFirstBlur) {
                props.onFirstBlur(props.value, inputState);
                setInputState({ ...inputState, firstTouchIsNow: false, });
            }
            if (props.onBlur) props.onBlur(props.value, inputState);
            if (props.validator && props.validateAfterBlur) {
                validationResult = props.validator(props.value, inputState);
                validated = true;
            }

            setInputState({
                ...inputState,
                hasFocus: false,
                valid: validationResult.valid,
                validated: validated,
            });
        }

        function userInput(value: string) {
            const firstTouch = inputState.firstTouchIsNow;
            let validationResult = {
                valid: !!props.validByDefault,
                errorType: '',
                errorText: '',
            };
            let validated = (props.validateOnInputBeforeFirstBlur || props.validateOnInputAfterFirstBlur) ?
                false :
                inputState.validated;

            updateValue(value);

            if (props.validator) {
                if (firstTouch && props.validateOnInputBeforeFirstBlur) {
                    validationResult = props.validator(value, inputState);
                    validated = true;
                }
                if (!firstTouch && props.validateOnInputAfterFirstBlur) {
                    validationResult = props.validator(value, inputState);
                    validated = true;
                }
            }

            setInputState({
                ...inputState,
                dirty: true,
                empty: value.length === 0,
                valid: validationResult.valid,
                validated: validated,
            });
        }

        return(<InputComponent
            { ...props }
            key={'input_' + props.name}
            onFocus={() => gotFocus()}
            onBlur={() => gotBlur()}
            valueHandler={(value: string) => userInput(value)}
            value={props.value}
        />);
    };

    return WrappedComponent;
};

export default ValidationWrapper;
