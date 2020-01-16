import React from 'react';
import styles from './header.module.scss';

type Props = {};

const Header: React.FunctionComponent<Props> = (props: Props) =>  {
    return (
        <header>
            <div className={styles['inner']}>

            </div>
        </header>
    );
};

export default Header;
