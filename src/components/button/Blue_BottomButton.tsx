import React from 'react';
import Styled from 'styled-components'
import Image from 'next/image'

interface Props {
    onClickEvent?: any,
    title: string,
    color?: string,
    type?: string,
    style?: any
}

const Blue_BottomButton = ({ onClickEvent, title, color, type, style }: Props) => {
    return (
        <>
            {
                type !== undefined && type === 'submit' ?
                    <WrapBoxSubmit
                        color={color}
                        style={style}
                        type="submit"
                    >{title}</WrapBoxSubmit>
                    :
                    <WrapBox
                        onClick={onClickEvent !== undefined ? onClickEvent : undefined}
                    >
                        <BottomButtonDiv color={color}>
                            {title}
                        </BottomButtonDiv>
                    </WrapBox>
            }
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
`
const WrapBoxSubmit = Styled.button`
    cursor: pointer;
    padding: 7px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: normal;
    color: #ffffff;
    width: 100%;
    border-radius: 10px;
    text-align: center;
    border: 0;
    background-color: ${props => props.color !== undefined ? props.color : "#327bff"};
`

export default Blue_BottomButton;
