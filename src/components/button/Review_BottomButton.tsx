import React from 'react';
import Styled from 'styled-components'
import Image from 'next/image'

import RESET from '@/assets/images/reset.png';

interface Props {
    onClickApply?: any,
    onClickReset?: any,
    title: string,
    color?: string
}

const Review_BottomButton = ({ onClickApply, onClickReset, title, color }: Props) => {
    return (
        <>
            <WrapBox>
                <BottomButtonDiv>
                    <ResetButtonDiv
                        onClick={onClickReset !== undefined ? onClickReset : undefined}
                    >
                        <ResetBtn src={RESET} alt="RESET" />
                        <ResetText>초기화</ResetText>
                    </ResetButtonDiv>
                    <BottomButton
                        color={color}
                        onClick={onClickApply !== undefined ? onClickApply : undefined}
                    >
                        {title}
                    </BottomButton>
                </BottomButtonDiv>
            </WrapBox>
        </>

    )
};

const ResetText = Styled.div`
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #000;
    margin-left: 8px;
`
const ResetButtonDiv = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const ResetBtn = Styled(Image)`
    width: 14px;
    height: 14px;
`
const BottomButtonDiv = Styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const BottomButton = Styled.div`
    width: 75%;
    padding-top: 13px;
    padding-bottom: 12px;
    border-radius: 10px;
    background-color: ${props => props.color !== undefined ? props.color : "#327bff"};
`
const WrapBox = Styled.div`
    width: 100%;
    overflow: hidden;
    position: fixed;
    z-index: 4;
    bottom: 0;
    cursor: pointer;
    padding: 8px 5% calc(constant(safe-area-inset-bottom) + 8px);
    padding: 8px 5% calc(env(safe-area-inset-bottom) + 8px);
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: normal;
    color: #ffffff;
    background-color: #ffffff;
    border-top: 1px solid #f4f4f4;
`

export default Review_BottomButton;