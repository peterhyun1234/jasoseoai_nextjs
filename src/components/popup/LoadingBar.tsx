import React from 'react';
import Styled from 'styled-components';
import Image from 'next/image';

import LOADING from '@/assets/images/page_loading.svg';

const LoadingBar = () => {
    return (
        <Loading>
            <div>
                <LoadingImg src={LOADING} alt="LOADING"/>
            </div>
        </Loading>
    )
}

const Loading = Styled.div`
    z-index: 99;
    position: fixed;
    width: 100%;
    height: 100%;
    min-width: 100vw;
    min-height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.1);
    &>div{
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        left: 50%;
        text-align: left;
    }
`;
const LoadingImg = Styled(Image)`
    width: 70px;
    height: 70px;
`

export default LoadingBar
