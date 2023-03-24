import { useEffect, useState } from 'react';
import Styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Inner_TopAppBar_Home from '@/components/appBar/Inner_TopAppBar_Home';

const Correct = () => {
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
                <Inner_TopAppBar_Home />
            }
            <WrapBox>
                <h1>Correct</h1>
                <h1>잘 쓴 부분</h1>
                <h1>고쳐야 할 부분</h1>
                <h1>맞춤법 검사(Beta)</h1>
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

export default Correct;