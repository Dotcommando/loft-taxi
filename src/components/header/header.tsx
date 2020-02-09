import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/loft-taxi-logo-grey.png';
import classNames from 'classnames/bind';
import styles from './header.module.scss';

const cx = classNames.bind(styles);

export interface IHeaderProps {
    logOut: () => void,
    email?: string,
}

const Header: React.FunctionComponent<IHeaderProps> = (props: IHeaderProps) =>  {
    const location = useLocation();

    return (
        <header>
            <div className={styles['inner']}>
                <Link to="/map">
                    <img className={styles['logo']} src={logo} alt="Loft Taxi" />
                </Link>
                {
                    props.email
                    ? <div className={styles['email']}>
                        { props.email }
                    </div>
                    : null
                }
                <div className={styles['menu']}>
                    <ul className={styles['menu__ul']}>
                        <li className={cx({
                            'menu__li': true,
                            'menu__li_current': location.pathname === '/map'
                        })}>
                            <Link to="/map">Карта</Link>
                        </li>
                        <li className={cx({
                            'menu__li': true,
                            'menu__li_current': location.pathname === '/profile'
                        })}>
                            <Link to="/profile">Профиль</Link>
                        </li>
                        <li className={cx({
                            'menu__li': true,
                            'menu__li_current': location.pathname === '/'
                        })}>
                            <div
                                className={cx({
                                    'link': true,
                                    'logout': true
                                })}
                                onClick={ () => props.logOut() }
                            >Выйти</div>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
