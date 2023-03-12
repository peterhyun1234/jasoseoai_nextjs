import React, { useState, useCallback } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

import IconButton from '@mui/material/IconButton';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchIcon from '@mui/icons-material/Search';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';

import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

interface HideOnScrollProps {
    window?: () => Window;
    children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

interface Props {
    title?: any,
    onClickEvent?: any,
    shareTitle?: any,
    isSignIn?: any,
    props?: any,
}

const Inner_TopAppBar_Product = ({ title, onClickEvent, isSignIn, props }: Props) => {
    const router = useRouter();

    return (
        <HideOnScroll {...props}>
            <WrapBox>
                <AppBarDetailDiv>
                    <AppBarLeftDiv>
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            aria-label="ArrowBackIosRoundedIcon"
                            onClick={onClickEvent !== undefined ? onClickEvent : undefined}
                        >
                            <ArrowBackIosRoundedIcon />
                        </IconButton>
                    </AppBarLeftDiv>
                    <AppBarRightDiv>
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            aria-label="HomeRoundedIcon"
                            onClick={() => router.push("/")}
                        >
                            <HomeRoundedIcon />
                        </IconButton>
                        <AppBarDivider />
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            aria-label="LoyaltyOutlinedIcon"
                            onClick={() => {
                                if (isSignIn) {
                                    router.push("/favoriteProductList")
                                } else {
                                    if (window.confirm("로그인이 필요한 기능입니다.\n 로그인 페이지로 이동하시겠습니까?")) {
                                        router.push('/signIn')
                                        sessionStorage.setItem('prevSignInPath', router.pathname)
                                    }
                                }
                            }}
                        >
                            <LoyaltyOutlinedIcon />
                        </IconButton>
                    </AppBarRightDiv>
                </AppBarDetailDiv>
            </WrapBox>
        </HideOnScroll>
    )
};

const WrapBox = Styled.div`
    border-bottom: 1px solid #EBEBEB;
    background-color: #ffffff;
    height: 60px;
    display: table;
    width: 100%;
    position: fixed;
    overflow: hidden;
    z-index: 5;
`
const AppBarDetailDiv = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 32px);
    margin-top: 9px;
    margin-right: 16px;
    margin-left: 16px;
`
const AppBarLeftDiv = Styled.div`
    display: flex;
    justify-content: flex-start;
`
const AppBarDivider = Styled.div`
    width: 10px;
`
const AppBarRightDiv = Styled.div`
    display: flex;
    justify-content: flex-end;
`
const AppBarCenterDiv = Styled.div`
    display: flex;
    justify-content: center;
`
const TitleDiv = Styled.div`
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.98;
    letter-spacing: normal;
    color: #000;
`

export default Inner_TopAppBar_Product;