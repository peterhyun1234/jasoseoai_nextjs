import React, { useState, useEffect } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'
import MyProfileContainer from '@/containers/home/MyProfileContainer';

import NonSignInUserContainer from '@/containers/home/NonSignInUserContainer';
import LineListButton from '@/components/button/LineListButton';
import { getToken, removeToken } from '@/utils/token';
import { signCheck } from '@/utils/APIRequest';
import Skeleton from '@mui/material/Skeleton';

import ICO_BASKET from '@/assets/images/ico_basket.png';
import ICO_PEN from '@/assets/images/ico_pen.png';
import ICO_REQ from '@/assets/images/ico_request.png';
import ICO_SIGNIN from '@/assets/images/ico_signin.png';

interface Props {
    closeEvent: any,
    handleSigninPopupOpen: any
}

const MainPageRightDrawerList = ({ closeEvent, handleSigninPopupOpen }: Props) => {
    const router = useRouter();

    const [isSignIn, setIsSignIn] = useState<boolean | null>(null);
    const [dat, setDat] = useState<string>("");

    useEffect(() => {
        const curToken = getToken()
        if (curToken === '') {
            setIsSignIn(false)
            setDat("")
        }
        signCheck(curToken).then((isSignIn) => {
            if (isSignIn) {
                setIsSignIn(true)
                setDat(getToken())
            } else {
                setIsSignIn(false)
                setDat("")
            }
        });
    }, [])

    return (
        <>
            {
                <FullBox>
                    {
                        isSignIn !== null ?
                            <>
                                {
                                    isSignIn ?
                                        <MenuBox>
                                            {
                                                dat !== undefined && dat !== "" &&
                                                <MyProfileContainer dat={dat} />
                                            }
                                            <ListStartLine />
                                            <LineListButton title={"개인정보수정"} onClickEvent={() => {  router.push('/myProfile') }} />
                                            <LineListButton title={"찜한 목록"} onClickEvent={() => {  router.push('/favoriteProductList') }} />
                                            <a href='https://bit.ly/3YSreeE'>
                                                <LineListButton title={"문의하기"} />
                                            </a>
                                            <LineListButton title={"계정관리"} onClickEvent={() => {  router.push('/profileManagement') }} />
                                            <ListEndLine />
                                        </MenuBox>
                                        :
                                        <MenuBox>
                                            <NonSignInUserContainer />
                                            <ListStartLine />
                                            <LineListButton title={"찜한 목록"} onClickEvent={() => {
                                                if (window.confirm("로그인이 필요한 기능입니다.\n 로그인 페이지로 이동하시겠습니까?")) {
                                                    router.push('/signIn')
                                                    sessionStorage.setItem('prevSignInPath', router.pathname)
                                                }
                                             }} />
                                            <a href='https://bit.ly/3YSreeE'>
                                                <LineListButton title={"문의하기"} />
                                            </a>
                                            {/* <LineListButton title={"계정관리"} onClickEvent={() => {
                                                router.push('/authTest')
                                            }} /> */}
                                            <ListEndLine />
                                        </MenuBox>
                                }
                            </>
                            :
                            <MenuBox>
                                <SkeletonPaddingDiv>
                                    <Skeleton variant="rectangular" width="100%" height={100} />
                                </SkeletonPaddingDiv>
                                <ListStartLine />
                                <SkeletonPaddingDiv>
                                    <Skeleton width="80%" />
                                </SkeletonPaddingDiv>
                                <SkeletonPaddingDiv>
                                    <Skeleton width="80%" />
                                </SkeletonPaddingDiv>
                                <SkeletonPaddingDiv>
                                    <Skeleton width="80%" />
                                </SkeletonPaddingDiv>
                                <SkeletonPaddingDiv>
                                    <Skeleton width="80%" />
                                </SkeletonPaddingDiv>
                            </MenuBox>
                    }
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
const SkeletonPaddingDiv = Styled.div`
    padding: 10px;
`


export default MainPageRightDrawerList;