import React, { FormEvent, useState } from 'react';
import { IInputState, Validator } from '../../models/common';
import styles from './input-text.module.scss';

type Props = {
    type: 'text' | 'password',
    name: string,
    value: string,
    placeholder?: string,
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
};

const defaultValues: Props = {
    type: 'text',
    name: 'rand_' + Math.round((100000 * Math.random())).toString(),
    placeholder: '',
    value: '',
    valueHandler: (value: string, inputState: IInputState) => {},
};

const InputText: React.FunctionComponent<Props> = (props: Props = defaultValues) => {
    const [ value, setValue ] = useState(props.value);
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
        setValue(newValue);
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
            props.onFirstFocus(value, inputState);
        }
        if (props.onFocus) props.onFocus(value, inputState);
        if (props.validator) {
            if (firstTouch && props.validateAfterFirstFocus) {
                validationResult = props.validator(value, inputState);
                validated = true;
            }
            if (!firstTouch && props.validateAfterFocus) {
                validationResult = props.validator(value, inputState);
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
            props.onFirstBlur(value, inputState);
            setInputState({ ...inputState, firstTouchIsNow: false, });
        }
        if (props.onBlur) props.onBlur(value, inputState);
        if (props.validator && props.validateAfterBlur) {
            validationResult = props.validator(value, inputState);
            validated = true;
        }

        setInputState({
            ...inputState,
            hasFocus: false,
            valid: validationResult.valid,
            validated: validated,
        });
    }

    function userInput(e: FormEvent<HTMLInputElement>) {
        const firstTouch = inputState.firstTouchIsNow;
        let validationResult = {
            valid: !!props.validByDefault,
            errorType: '',
            errorText: '',
        };
        let validated = (props.validateOnInputBeforeFirstBlur || props.validateOnInputAfterFirstBlur) ?
            false :
            inputState.validated;

        updateValue((e.target as HTMLInputElement).value);

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

    return(
        <div className={styles['input-text']}>
            <div className={styles['input-text__container']}>
                <input
                    id={props.name}
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    onChange={(e: FormEvent<HTMLInputElement>) => userInput(e)}
                    onFocus={() => gotFocus()}
                    onBlur={() => gotBlur()}
                />
                <div className={styles['input-text__bottom-line']} />
                <label
                    htmlFor={props.name}
                    className={styles['input-text__placeholder']}
                >
                    {props.placeholder}
                </label>
            </div>
        </div>
    );
};

export default InputText;
