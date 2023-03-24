import React, { useState, useCallback, useRef, useEffect } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

import LOGO from '@/assets/images/jasoseoai_logo.png';

const Inner_TopAppBar_SignIn = () => {
    const router = useRouter();

    const onClickLogo = () => {
        router.push('/')
    }

    return (
        <WrapBox>
            <AppBarDetailDiv>
                <AppBarLeftDiv>
                    <LogoBtn alt="Logo" src={LOGO} onClick={() => onClickLogo()} />
                </AppBarLeftDiv>
                <AppBarCenterDiv>
                </AppBarCenterDiv>
                <AppBarRightDiv>
                </AppBarRightDiv>
            </AppBarDetailDiv>
        </WrapBox>
    )
};

const LogoBtn = Styled(Image)`
    margin-bottom: 10px;
    width: 120px;
    height: 40px;
`
const WrapBox = Styled.div`
    background: transparent;
    height: 80px;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
`
const AppBarDetailDiv = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    padding-right: 16px;
    padding-left: 16px;
`
const AppBarLeftDiv = Styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
`
const AppBarCenterDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const AppBarDivider = Styled.div`
    width: 20px;
`
const AppBarRightDiv = Styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
const MenuBtn = Styled.div<{ isSelected: boolean }>`
    ${props => props.isSelected === true && `background: linear-gradient(65deg, rgba(153,196,0,1) 0%, rgba(1,99,49,1) 33%, rgba(25,153,149,1) 70%, rgba(2,129,154,1) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`}
    font-size: 16px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    &:hover {
        font-size: 17px;
        font-weight: 600;
        background: linear-gradient(65deg, rgba(153,196,0,1) 0%, rgba(1,99,49,1) 33%, rgba(25,153,149,1) 70%, rgba(2,129,154,1) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`
const SignBtn = Styled.div`
    padding: 7px 20px;
    font-size: 19px;
    font-weight: 600;
    color: #428d93;
    border: 2px solid #428d93;
    border-radius: 15px;
`

export default Inner_TopAppBar_SignIn;