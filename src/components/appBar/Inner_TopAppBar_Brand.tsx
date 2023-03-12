import React, { useState, useEffect, useCallback } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

import IconButton from '@mui/material/IconButton';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

interface Props {
    disableCheck?: any
    title?: string,
    onClickEvent?: any,
    rightIconPath?: any,
}

const Inner_TopAppBar_Brand = ({ disableCheck, onClickEvent, title, rightIconPath }: Props) => {
    const router = useRouter();

    return (
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
                <AppBarCenterDiv>
                    {
                        title !== "" &&
                        <TitleDiv>{title}</TitleDiv>
                    }
                </AppBarCenterDiv>
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
                    <IconButton
                        size="medium"
                        edge="end"
                        color="inherit"
                        aria-label="SearchRoundedIcon"
                        onClick={() => {
                            router.push("/searchEntry")
                        }}
                    >
                        <SearchRoundedIcon />
                    </IconButton>
                </AppBarRightDiv>
            </AppBarDetailDiv>
        </WrapBox>
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
const AppBarCenterDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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

export default Inner_TopAppBar_Brand;