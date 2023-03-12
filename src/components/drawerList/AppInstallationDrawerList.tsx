import React, { useState, useEffect } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'

import dsb_text_logo from '@/assets/images/dsb_text_logo.png';
import wonderring_danbee from '@/assets/images/wonderring_danbee.png';

interface Props {
    closeEvent: any,
}

const AppInstallationDrawerList = ({ closeEvent }: Props) => {
    useEffect(() => {
    }, [])

    return (
        <>
            {
                <WrapBox>
                    <a href={'https://bit.ly/3fp6GrV'}>
                        <DSBAppImageDiv >
                            <DSBAppImage src={dsb_text_logo} alt="DSBAppImage" />
                        </DSBAppImageDiv>
                    </a>
                    <AppInstallationDesc>
                        <p>단성비 앱에서 쉽고 편리하게!</p>
                        <p>다양한 기능을 이용해보세요.</p>
                    </AppInstallationDesc>
                    <AppInstallationButton>
                        <a href={'https://bit.ly/3fp6GrV'}>
                            <AppInstallationButtonText>
                                앱에서 보기
                            </AppInstallationButtonText>
                        </a>
                    </AppInstallationButton>
                    <AppInstallationCloseButton onClick={closeEvent("bottom", false)}>오늘은 그냥 볼게요.</AppInstallationCloseButton>
                </WrapBox>
            }
        </>
    )
};

const WrapBox = Styled.div`
    overflow: unset;
    padding: 20px 25px 25px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const DSBAppImageDiv = Styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 10px;
    margin-bottom: 15px;
`
const DSBAppImage = Styled(Image)`
    width: 80px;
    height: 80px;
    border-radius: 15px;
    border: solid 2px #ebebeb;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
`
const AppInstallationDesc = Styled.div`
    margin-bottom: 15px;
    font-size: 19px;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    font-weight: 500;
    color: #000;
`
const AppInstallationButton = Styled.div`
    margin-bottom: 10px;
    width: 100%;
    font-size: 19px;
    padding-top: 10px;
    padding-bottom: 10px;
    background: #327BFF;
    border-radius: 12px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
`
const AppInstallationButtonText = Styled.div`
    color: #FFFFFF;
`
const AppInstallationCloseButton = Styled.div`
    font-size: 17px;
    width: 100%;
    color: #327BFF;
`

export default AppInstallationDrawerList;