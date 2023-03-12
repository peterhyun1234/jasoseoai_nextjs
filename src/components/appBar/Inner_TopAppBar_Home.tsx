import React, { useState, useCallback, useRef, useEffect } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'
import MainPageRightDrawerList from '../drawerList/MainPageRightDrawerList'
import MainPageLeftDrawerList from '../drawerList/MainPageLeftDrawerList'
import TwoBtnPopup from '@/components/popup/TwoBtnPopup';

import LOGO from '@/assets/images/jasoseoai_logo.png';

const Inner_TopAppBar_Home = () => {
    const router = useRouter();

    const [innerWidth, setInnerWidth] = useState<any>(1000);

    const onClickLogo = () => {
        router.push('/')
    }

    const handleResize = () => {
        let curInnerWidth = window.innerWidth
        setInnerWidth(curInnerWidth)
    }

    useEffect(() => {
        setInnerWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <WrapBox>
            {
                innerWidth <= 450 ?
                    <AppBarDetailDiv>
                        <AppBarLeftDiv>
                            <LogoBtn alt="Logo" src={LOGO} onClick={() => onClickLogo()} />
                        </AppBarLeftDiv>
                        <AppBarCenterDiv>
                        </AppBarCenterDiv>
                        <AppBarRightDiv>
                        </AppBarRightDiv>
                    </AppBarDetailDiv>
                    :
                    <AppBarDetailDiv>
                        <AppBarLeftDiv>
                            <LogoBtn alt="Logo" src={LOGO} onClick={() => onClickLogo()} />
                            <AppBarDivider />
                            <MenuBtn onClick={() => router.push('/create')}>자소서 생성</MenuBtn>
                            <MenuBtn onClick={() => router.push('/write')}>자소서 작성</MenuBtn>
                            <MenuBtn onClick={() => router.push('/correct')}>자소서 첨삭</MenuBtn>
                        </AppBarLeftDiv>
                        <AppBarCenterDiv>
                        </AppBarCenterDiv>
                        <AppBarRightDiv>
                        </AppBarRightDiv>
                    </AppBarDetailDiv>
            }
        </WrapBox>
    )
};

const LogoBtn = Styled(Image)`
    margin-bottom: 10px;
    width: 100px;
    height: 40px;
`
const WrapBox = Styled.div`
    background-color: rgba(0, 0, 0, 0.8);
    height: 60px;
    width: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    z-index: 5;
`
const AppBarDetailDiv = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
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
    width: 10px;
`
const AppBarRightDiv = Styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
const MenuBtn = Styled.div`
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    &:hover {
        color: #ff6f00;
    }
`

export default Inner_TopAppBar_Home;