import React, { ReactNode } from 'react';
import styles from './white-box.module.scss';

type Props = {
    children: ReactNode,
};

const WhiteBox: React.FunctionComponent<Props> = (props: Props) =>  {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['content']}>
                {props.children}
            </div>
        </div>
    );
};

export default WhiteBox;
