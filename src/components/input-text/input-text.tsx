import React, { FormEvent } from 'react';
import classNames from 'classnames/bind';
import styles from './input-text.module.scss';

const cx = classNames.bind(styles);

export type InputTextProps = {
    type: 'text' | 'password',
    name: string,
    value: string,
    placeholder?: string,
    hasError?: boolean,
    valid?: boolean,
    errorMessage?: string,
    valueHandler: (value: string) => void,
    onFocus?: (value: string) => void,
    onBlur?: (value: string) => void,
};

const defaultValues: InputTextProps = {
    type: 'text',
    name: 'default-name',
    placeholder: '',
    value: '',
    valueHandler: (value: string) => {},
    errorMessage: '',
};

const InputText: React.FC<InputTextProps> = (props: InputTextProps = defaultValues) => {

    function updateValue(newValue: string): string {
        props.valueHandler(newValue);
        return newValue;
    }

    function userInput(e: FormEvent<HTMLInputElement>) {
        updateValue((e.target as HTMLInputElement).value);
    }

    return(
        <div className={styles['input-text']}>
            <div className={cx({
                'input-text__container': true,
                'has-error': props.hasError,
                'not-empty': props.value.length > 0
            })}>
                <input
                    id={props.name}
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    onChange={(e: FormEvent<HTMLInputElement>) => userInput(e)}
                    onFocus={() => props.onFocus ? props.onFocus(props.value) : null}
                    onBlur={() => props.onBlur ? props.onBlur(props.value) : null}
                />
                <div className={styles['input-text__bottom-line']} />
                <label
                    htmlFor={props.name}
                    className={styles['input-text__placeholder']}
                >
                    {props.placeholder}
                </label>
                { props.hasError ? <div className={styles['input-text__error']}>{props.errorMessage}</div> : null }
            </div>
        </div>
    );
};

export default InputText;
