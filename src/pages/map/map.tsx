import React from 'react';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import styles from './map.module.scss';

type Props = {}

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
