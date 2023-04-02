import React, { useState } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Inner_TopAppBar from '@/components/appBar/Inner_TopAppBar'

import { RULES_1, RULES_2 } from '@/assets/docs/rules';

const Terms = ({ }: any) => {
    const router = useRouter();

    const controlGoBack = () => {
        router.back()
        return
    }

    return (
        <>
            <Inner_TopAppBar
                onClickEvent={() => { controlGoBack() }}
                title={"이용약관"}
            />
            <WrapBox>
                <FullBox>
                    <EactDiv>
                        <TitleDiv>
                            <Title>이용약관</Title>
                        </TitleDiv>
                        <ContentDiv>
                            <Content>
                                <pre>{RULES_1}</pre>
                            </Content>
                        </ContentDiv>
                    </EactDiv>
                    <EactDiv>
                        <TitleDiv>
                            <Title>개인정보 방침</Title>
                        </TitleDiv>
                        <ContentDiv>
                            <Content>
                                <pre>{RULES_2}</pre>
                            </Content>
                        </ContentDiv>
                    </EactDiv>
                </FullBox>
            </WrapBox>
        </>
    )
};

const EactDiv = Styled.div`
    margin-bottom: 20px;
    text-align: left;
`
const TitleDiv = Styled.div`
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.11;
    letter-spacing: normal;
    color: #000;
`
const Title = Styled.span`
`
const TitleHighlight = Styled.span`
    margin-right: 10px;
`
const Content = Styled.div`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    pre{
        white-space: pre-wrap;
    }
`
const ContentDiv = Styled.div`
    border: 1px solid #327bff;
    border-radius: 4px;
    height: 200px;
    padding-left: 7px;
    padding-right: 7px;
    font-size: 10px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.3;
    letter-spacing: normal;
`
const WrapBox = Styled.div`
    margin-top: 60px;
    width: 100%;
    display: inline-block;
`
const FullBox = Styled.div`
    background-color: white;
    margin: 20px;
    padding-bottom: 55px;
`

export default Terms;
