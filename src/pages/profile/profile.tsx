import React from 'react';
import Header from '../../components/header/header';
import Main from '../../components/main/main';
import styles from './map.module.scss';

type Props = {
    logOut: () => void
}

const Profile: React.FunctionComponent<Props> = (props: Props) => {
    return(
        <>
            <Header logOut={ props.logOut } />
            <Main>
                456
            </Main>
        </>
    );
};

export default Profile;
