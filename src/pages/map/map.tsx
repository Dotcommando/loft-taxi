import React from 'react';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import styles from './map.module.scss';

type Props = {}

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWxwaGFyZWQiLCJhIjoiY2s1bmJoOXVxMTUyNjNrcWs1OXY5ZWFrOCJ9.qjvziEv-CFPN-2ONSC5OiQ';

const Map: React.FunctionComponent<Props> = () => {
    return(
        <>
            <Header />
            <Main>
                123
            </Main>
        </>
    );
};

export default Map;
