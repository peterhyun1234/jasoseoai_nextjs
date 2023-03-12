import React from 'react';
import Styled from 'styled-components'
import Image from 'next/image'

interface Props {
    redirectURL?: any,
    title: string,
    color?: string,
    type?: string,
    style?: any
}

const Event_BottomButton = ({ redirectURL, title, color }: Props) => {
    return (
        <>
            <WrapBox>
                <a href={redirectURL}>
                    <BottomButtonDiv color={color}>
                        {title}
                    </BottomButtonDiv>
                </a>
            </WrapBox>
        </>

    )
};

const WrapBox = Styled.div`
    width: 100%;
    overflow: hidden;
    position: fixed;
    z-index: 4;
    bottom: 0;
    cursor: pointer;
    padding: 0px 5% calc(constant(safe-area-inset-bottom) + 8px);
    padding: 0px 5% calc(env(safe-area-inset-bottom) + 8px);
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: normal;
    color: #ffffff;
    background-color: #ffffff;
`
const BottomButtonDiv = Styled.div`
    width: 100%;
    padding-top: 14px;
    padding-bottom: 12px;
    border-radius: 10px;
    background-color: ${props => props.color !== undefined ? props.color : "#327bff"};
    color: #ffffff;
`

export default Event_BottomButton;
