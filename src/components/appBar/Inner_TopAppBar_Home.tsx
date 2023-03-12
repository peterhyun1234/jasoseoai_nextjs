import React, { useState, useCallback, useRef, useEffect } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'
import MainPageRightDrawerList from '../drawerList/MainPageRightDrawerList'
import MainPageLeftDrawerList from '../drawerList/MainPageLeftDrawerList'
import TwoBtnPopup from '@/components/popup/TwoBtnPopup';

import IMG_LOGO from '@/assets/images/dsb_logo.svg';

import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

const productRankingDescription = `단성비 랭킹은 상품 조회 수, 작성 후기, 상품 분석 지표, 찜한 수를 반영한 공식에 의해 선정됩니다. 단성비는 광고 목적으로 랭킹을 절대 임의 조작하지 않습니다.`

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

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Inner_TopAppBar_Home = ({ navTitle, setBottomNavValue, onClickLogo, isSignIn, openMyPage, props }: any) => {
    const router = useRouter();

    const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
    const [innerWidth, setInnerWidth] = useState<any>(350);

    const handleSigninPopupOpen = () => {
        setIsSigninPopupOpen(true);
    };

    const handleSigninPopupClose = () => {
        setIsSigninPopupOpen(false);
    };

    const GoToSignIn = () => {
        router.push('/signIn')
        sessionStorage.setItem('prevSignInPath', router.pathname)
    };

    const CustomList = styled('div')({
        width: innerWidth * 0.70,
        maxWidth: 420
    });

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
        <CustomList
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {
                anchor == "left" &&
                <MainPageLeftDrawerList
                    closeEvent={toggleDrawer}
                    setBottomNavValue={setBottomNavValue}
                />
            }
            {
                anchor == "right" &&
                <MainPageRightDrawerList
                    closeEvent={toggleDrawer}
                    handleSigninPopupOpen={handleSigninPopupOpen}
                />
            }
        </CustomList>
    );

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
        <>
            <HideOnScroll {...props}>
                <WrapBox isHomeTab={false}>
                    {/* <WrapBox isHomeTab={navTitle == "홈" ? true : false}> */}
                    {
                        <Drawer
                            anchor={"right"}
                            open={state["right"]}
                            onClose={toggleDrawer("right", false)}>
                            {list("right")}
                        </Drawer>
                    }
                    {
                        <Drawer
                            anchor={"left"}
                            open={state["left"]}
                            onClose={toggleDrawer("left", false)}>
                            {list("left")}
                        </Drawer>
                    }
                    {
                        innerWidth <= 450 ?
                            <AppBarDetailDiv>
                                <AppBarLeftDiv>
                                    {
                                        navTitle != "홈" &&
                                        <TitleDiv>{navTitle}</TitleDiv>
                                    }
                                    {
                                        navTitle == "홈" &&
                                        <LogoBtn alt="Logo" src={IMG_LOGO} onClick={() => onClickLogo()} />
                                    }
                                    {
                                        navTitle == "랭킹" &&
                                        <IconButton
                                            size="medium"
                                            edge="start"
                                            color="inherit"
                                            aria-label="HelpOutlineIcon"
                                            onClick={() => alert(productRankingDescription)}
                                        >
                                            <HelpOutlineIcon />
                                        </IconButton>
                                    }
                                </AppBarLeftDiv>
                                <AppBarCenterDiv>
                                </AppBarCenterDiv>
                                <AppBarRightDiv>
                                    <IconButton
                                        size="medium"
                                        edge="start"
                                        color="inherit"
                                        aria-label="SearchIcon"
                                        onClick={() => router.push("/searchEntry")}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                    <AppBarDivider />
                                    <IconButton
                                        size="medium"
                                        edge="start"
                                        color="inherit"
                                        aria-label="PersonOutlineOutlinedIcon"
                                        // onClick={() => {
                                        //     if (isSignIn) {
                                        //         router.push("/favoriteProductList")
                                        //     } else {
                                        //         if (window.confirm("로그인이 필요한 기능입니다.\n 로그인 페이지로 이동하시겠습니까?")) {
                                        //             router.push('/signIn')
                                        //             sessionStorage.setItem('prevSignInPath', router.pathname)
                                        //         }
                                        //     }
                                        // }}
                                        onClick={() => openMyPage()}
                                    >
                                        <PersonOutlineOutlinedIcon />
                                    </IconButton>
                                </AppBarRightDiv>
                            </AppBarDetailDiv>
                            :
                            <AppBarDetailDiv>
                                <AppBarLeftDiv>
                                    <IconButton
                                        size="medium"
                                        edge="start"
                                        color="inherit"
                                        aria-label="MenuOutlinedIcon"
                                        onClick={toggleDrawer("left", true)}
                                    >
                                        <MenuOutlinedIcon />
                                    </IconButton>
                                </AppBarLeftDiv>
                                <AppBarCenterDiv>
                                    {
                                        navTitle == "홈" &&
                                        <LogoBtn alt="Logo" src={IMG_LOGO} onClick={() => onClickLogo()} />
                                    }
                                    {
                                        navTitle != "홈" &&
                                        <TitleDiv>{navTitle}</TitleDiv>
                                    }
                                    {
                                        navTitle == "랭킹" &&
                                        <IconButton
                                            size="medium"
                                            edge="start"
                                            color="inherit"
                                            aria-label="HelpOutlineIcon"
                                            onClick={() => alert(productRankingDescription)}
                                        >
                                            <HelpOutlineIcon />
                                        </IconButton>
                                    }
                                </AppBarCenterDiv>
                                <AppBarRightDiv>
                                    {
                                        navTitle != "홈" &&
                                        <IconButton
                                            size="medium"
                                            edge="start"
                                            color="inherit"
                                            aria-label="SearchIcon"
                                            onClick={() => router.push("/searchEntry")}
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    }
                                    <AppBarDivider />
                                    <IconButton
                                        size="medium"
                                        edge="start"
                                        color="inherit"
                                        aria-label="PersonOutlineIcon"
                                        onClick={toggleDrawer("right", true)}
                                    >
                                        <PersonOutlineIcon />
                                    </IconButton>
                                </AppBarRightDiv>
                            </AppBarDetailDiv>
                    }
                </WrapBox>
            </HideOnScroll>

            {
                <div>
                    <TwoBtnPopup
                        open={isSigninPopupOpen}
                        onClickEventFirst={handleSigninPopupClose}
                        onClickEventSecond={GoToSignIn}
                        btnTextFirst="취소"
                        btnTextSecond="로그인"
                        content="로그인이 필요한 서비스입니다. 로그인하시겠어요?"
                    />
                </div>
            }
        </>
    )
};

const LogoBtn = Styled(Image)`
    width: 72px;
    height: 30px;
`
const WrapBox = Styled.div`
    border-bottom: ${(props: { isHomeTab: any; }) => (props.isHomeTab ? 'solid 1px #ffffff' : 'solid 1px #EBEBEB')};
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
const AppBarCenterDiv = Styled.div`
    display: flex;
    justify-content: center;
`
const AppBarDivider = Styled.div`
    width: 10px;
`
const AppBarRightDiv = Styled.div`
    display: flex;
    justify-content: flex-end;
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

export default Inner_TopAppBar_Home;