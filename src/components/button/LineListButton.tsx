import React from 'react';
import IMG_ARROW from '@/assets/images/go.png';
import Styled from 'styled-components'
import Image from 'next/image'

import NAV_BOTTOM_HOME_CLICKED from '@/assets/images/navdown_home_blue.png';
import NAV_BOTTOM_CATEGORY_CLICKED from '@/assets/images/navdown_category_blue.png';
import NAV_BOTTOM_EVENT_CLICKED from '@/assets/images/navdown_event_blue.png';

import ICO_BASKET from '@/assets/images/ico_basket.png';
import ICO_PEN from '@/assets/images/ico_pen.png';
import ICO_REQ from '@/assets/images/ico_request.png';
import ICO_SIGNIN from '@/assets/images/ico_signin.png';

interface Props {
    onClickEvent?: any,
    title: string,
    link?: string,
}
const LineListButton = ({ onClickEvent, title }: Props) => {
    const getImagePath = (title: string) => {
        if (title === '홈') return NAV_BOTTOM_HOME_CLICKED;
        if (title === '카테고리') return NAV_BOTTOM_CATEGORY_CLICKED;
        if (title === '커뮤니티') return NAV_BOTTOM_EVENT_CLICKED;
        if (title === '개인정보수정') return ICO_PEN;
        if (title === '찜한 목록') return ICO_BASKET;
        if (title === '문의하기') return ICO_REQ;
        if (title === '계정관리') return ICO_SIGNIN;

        return NAV_BOTTOM_HOME_CLICKED;
    }

    return (
        <WrapBox
            onClick={onClickEvent !== undefined ? onClickEvent : undefined}>
            <MenuImg src={getImagePath(title)} alt='MenuImg'/>
            <InnerText>
                {title}
            </InnerText>
        </WrapBox>
    )
};

const WrapBox = Styled.div`
    text-align: left;
    cursor: pointer;
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 19px;
    padding-left: 18px;
    border-top: solid 1px #f4f4f4;
    display: flex;
    justify-content: flex-start;
    color: #000000;
`
const InnerText = Styled.div`
	vertical-align: middle;
    font-size: 16px;
    box-sizing: border-box;
	margin-left: 15px;
`
const MenuImg = Styled(Image)`
    vertical-align: middle;
    height: 17px;
    width: 17px;
    margin-top: 3px;
`

export default LineListButton;