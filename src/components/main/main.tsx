import React, { ReactNode } from 'react';
import styles from './main.module.scss';

type Props = {
    children: ReactNode,
};

const Main: React.FunctionComponent<Props> = (props: Props) =>  {
    return (
        <section className={styles['main']}>
            <div className={styles['inner']}>
                {props.children}
            </div>
        </section>
    );
};

export default Main;
