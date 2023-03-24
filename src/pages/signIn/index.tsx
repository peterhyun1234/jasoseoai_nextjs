import { useEffect, useState } from 'react';
import Styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Inner_TopAppBar_SignIn from '@/components/appBar/Inner_TopAppBar_SignIn';

const SignIn = () => {
    const router = useRouter()

    useEffect(() => {
        console.log('location', location)
        console.log('router', router)
    }, [])

    return (
        <div style={{
            backgroundImage: `url(images/bg_common.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
        }}>
            {
                <Inner_TopAppBar_SignIn />
            }
            <WrapBox>
                <h1>SignIn</h1>
                <h1>준비중</h1>
                <h1>준비중</h1>
                <h1>준비중</h1>
                <h1>준비중</h1>
                <h1>준비중</h1>
                <h1>준비중</h1>
                <h1>준비중</h1>
                <h1>준비중</h1>
                <h1>준비중</h1>
            </WrapBox>
        </div>
    )
};

const WrapBox = Styled.div`
    width: 100%;
    display: inline-block;
    max-width: 1000px;
    padding-top: 80px;
`

export default SignIn;