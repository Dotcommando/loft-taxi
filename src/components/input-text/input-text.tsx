import React, { FormEvent, useState } from 'react';
import styles from './input-text.module.scss';

type Props = {
    type: 'text' | 'password',
    name: string,
    value: string,
    placeholder?: string,
    valueHandler: (value: string) => any,
};

const defaultValues: Props = {
    type: 'text',
    name: 'rand_' + Math.round((100000 * Math.random())).toString(),
    placeholder: '',
    value: '',
    valueHandler: (value: string) => ''
};

const InputText: React.FunctionComponent<Props> = (props: Props = defaultValues) => {
    const [ value, setValue ] = useState(props.value);

    function updateValue(newValue: string) {
        setValue(newValue);
        props.valueHandler(newValue);
    }

    return(
        <div className={styles['input-text']}>
            <div className={styles['input-text__container']}>
                <input
                    id={props.name}
                    type={props.type}
                    name={props.name}
                    value={props.value}
                    onChange={(e: FormEvent<HTMLInputElement>) => updateValue((e.target as HTMLInputElement).value)}
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
