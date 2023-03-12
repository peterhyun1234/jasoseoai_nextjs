import React from 'react';
import Styled from 'styled-components';
import Image from 'next/image';

const CommunityBoxDivider = () => {

    return (
        <WrapBox/>
    )
};
const WrapBox = Styled.div`
    width: 100%;
    height: 8px;
    background-color: #F5F5F5;
    border-top: solid 1px #C4C4C4;
`

export default CommunityBoxDivider;