import React from 'react';
import classNames from 'classnames/bind';
import styles from './input-button.module.scss';

const cx = classNames.bind(styles);

type Props = {
    mode: 'primary' | 'secondary' | 'info',
    children: React.ReactNode,
    onClick?: { (e: React.MouseEvent<HTMLButtonElement>): void }
}

const InputButton: React.FC<Props> = (props: Props) => {

    function onClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (props.onClick) { props.onClick(e); }
    }

    return(
        <div className={cx({
            'input-button': true,
            ['input-button_' + props.mode]: true
        })}>
            <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => onClick(e)}>
                {props.children}
            </button>
        </div>
    );
};

export default InputButton;
