import React from 'react';
import logo from '../../images/loft-taxi-logo.png';
import classNames from 'classnames/bind';
import styles from './logo.module.scss';

const cx = classNames.bind(styles);

type Props = {};

const Logo: React.FunctionComponent<Props> = () =>  {
    return (
        <div className={cx({ logo: true, logo_positioning: true })}>
            <img src={ logo } alt="Loft Taxi" />
        </div>
    );
};

export default Logo;
