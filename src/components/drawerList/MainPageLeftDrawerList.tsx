import React, { useState, useEffect } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'
import LineListButton from '@/components/button/LineListButton';

import IMG_SEARCH from '@/assets/images/search_gray.png';
import IMG_LOGO from '@/assets/images/dsb_logo.svg';

interface Props {
    closeEvent: any,
    setBottomNavValue: any
}

const MainPageLeftDrawerList = ({ closeEvent, setBottomNavValue }: Props) => {
    const router = useRouter();

    return (
        <>
            {
                <FullBox>
                    <MenuBox>
                        <DSBIconDiv>
                            <DSBIcon
                                alt="IMG_LOGO" src={IMG_LOGO}
                                onClick={() => { router.push('/') }} />
                        </DSBIconDiv>
                        <SearchDiv onClick={() => { router.push('/searchEntry') }}>
                            <SearchIcon alt="Search" src={IMG_SEARCH} />
                            <SearchGuide>검색어를 입력해주세요</SearchGuide>
                        </SearchDiv>
                        <LineListButton title={"홈"} onClickEvent={() => router.push('/')} />
                        {/* <LineListButton title={"카테고리"} onClickEvent={() => setBottomNavValue("1") } />
                        <LineListButton title={"커뮤니티"} onClickEvent={() => setBottomNavValue("2") } /> */}
                        <ListEndLine />
                    </MenuBox>
                </FullBox>
            }
        </>
    )
};

const FullBox = Styled.div`
    background-color: white;
`
const MenuBox = Styled.div`
    margin-top: 25px;
    &>div{
        &:last-child{
            &>p{
                border-bottom: solid 1px #f4f4f4;
            }
        }
    }
`
const DSBIconDiv = Styled.div`
    margin: 40px 20px;
    text-align: left;
`
const DSBIcon = Styled(Image)`
    width: 120px;
    height: auto;
`
const SearchDiv = Styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    border-radius: 3px;
    background-color: #f4f4f4;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 15px;
`
const SearchIcon = Styled(Image)`
    width: 13px;
    height: 13px;
    margin-top: 3px;
    margin-right: 10px;
`
const SearchGuide = Styled.div`
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.14px;
    color: #bcbcbc;
`
const ListStartLine = Styled.hr`
    border: solid 1px #f4f4f4;
    margin: 0px;
    padding: 0px;
`

const ListEndLine = Styled.hr`
    border: solid 1px #f4f4f4;
    margin: 0px;
    padding: 0px;
`

export default MainPageLeftDrawerList;