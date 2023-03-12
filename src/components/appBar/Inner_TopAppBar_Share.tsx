import React, { useState, useCallback } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

import IconButton from '@mui/material/IconButton';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShareIcon from '@mui/icons-material/Share';

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
    productURI?: any,
    shareTitle?: any,
    props?: any,
}

const Inner_TopAppBar_Share = ({ title, onClickEvent, productURI, shareTitle, props }: Props) => {
    const router = useRouter();

    const shareURI = () => {
        let shareData = {
            title: title,
            text: '',
            url: productURI,
        }

        if (typeof navigator.share === "undefined") {
            let tempTextarea = document.createElement("textarea");
            document.body.appendChild(tempTextarea);
            tempTextarea.value = productURI;
            tempTextarea.select();
            document.execCommand("copy");
            document.body.removeChild(tempTextarea);
            alert('링크(URI)가 클립보드에 복사되었습니다.')
        } else {
            try {
                navigator.share(shareData);
            } catch (e) {
                alert("공유 실패");
            }
        }

    }

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
                        <TitleDiv>{title}</TitleDiv>
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
                            aria-label="ShareIcon"
                            onClick={() => shareURI()}
                        >
                            <ShareIcon />
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
    align-items: center;
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
    width: 200px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.98;
    letter-spacing: normal;
    color: #000;
    height: fit-content;
`

export default Inner_TopAppBar_Share;