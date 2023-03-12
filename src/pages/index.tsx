import { useEffect, useState } from 'react';
import Styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Inner_TopAppBar_Home from '@/components/appBar/Inner_TopAppBar_Home';

const Home = () => {
    const router = useRouter()

    const onClickLogo = () => {
        router.push('/')
    }

    useEffect(() => {
        console.log('location', location)
        console.log('router', router)
    }, [])

    return (
        <>
            {
                <Inner_TopAppBar_Home />
            }
            <WrapBox>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
            </WrapBox>
        </>
    )
};

const WrapBox = Styled.div`
    width: 100%;
    max-width: 1000px;
    padding-top: 60px;
`

export default Home;