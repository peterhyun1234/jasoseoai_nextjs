import React, { useState, useEffect, useCallback } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const DSBFooter = () => {
    const router = useRouter();

    const [isLegalNoticeOpen, setIsLegalNoticeOpen] = useState<boolean>(false);
    const [isCompanyInfoOpen, setIsCompanyInfoOpen] = useState<boolean>(false);
    const [isServiceCenterOpen, setIsServiceCenterOpen] = useState<boolean>(false);

    return (
        <WrapBox>
            <EachContentDiv>
                <ContentTitleDiv onClick={()=>setIsLegalNoticeOpen(!isLegalNoticeOpen)}>
                    <ContentTitle>법적고지 안내</ContentTitle>
                    {
                        isLegalNoticeOpen &&
                        <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="ArrowDropUpIcon"
                        >
                            <ArrowDropUpIcon fontSize="small" />
                        </IconButton>
                    }
                    {
                        !isLegalNoticeOpen &&
                        <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="ArrowDropDownIcon"
                        >
                            <ArrowDropDownIcon fontSize="small" />
                        </IconButton>
                    }
                </ContentTitleDiv>
                <Collapse in={isLegalNoticeOpen} timeout="auto" unmountOnExit>
                    <Content>
                        ·자소서 AI 데이터는 최신 정보가 아니거나 오류가 있을 수 있습니다. <br />
                        ·구매 전 제조판매업자가 표기한 전성분표를 확인하시길 권장드립니다. <br />
                        ·상품 구매를 위한 참고 정보이며, 상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다. <br />
                        ·자소서 AI 통신판매 중개자이며, 통신판매의 당사자가 아닙니다. <br />
                        ·자소서 AI 데이터를 허가없이 상업적으로 활용할 시 법적 조치를 받을 수 있습니다. <br />
                        ·본 포스팅은 파트너스 활동의 일환으로 일정액의 수수료를 제공받을 수 있음을 알려드립니다. <br />
                    </Content>
                </Collapse>
            </EachContentDiv>
            <EachContentDiv>
                <ContentTitleDiv onClick={()=>setIsCompanyInfoOpen(!isCompanyInfoOpen)}>
                    <ContentTitle>회사 정보</ContentTitle>
                    {
                        isCompanyInfoOpen &&
                        <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="ArrowDropUpIcon"
                        >
                            <ArrowDropUpIcon fontSize="small" />
                        </IconButton>
                    }
                    {
                        !isCompanyInfoOpen &&
                        <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="ArrowDropDownIcon"
                        >
                            <ArrowDropDownIcon fontSize="small" />
                        </IconButton>
                    }
                </ContentTitleDiv>
                <Collapse in={isCompanyInfoOpen} timeout="auto" unmountOnExit>
                    <Content>
                        회사명 : 포트밸류 <br />
                        대표이사 : 조현욱｜서비스명 : 자소서 AI <br />
                        사업자등록번호 : 295-54-00746 <br />
                        주소 : 경기도 용인시 수지구 죽전로 152, 단국대학교 글로컬산학협력관 207호 <br />
                    </Content>
                </Collapse>
            </EachContentDiv>
            <EachContentDiv>
                <ContentTitleDiv onClick={()=>setIsServiceCenterOpen(!isServiceCenterOpen)}>
                    <ContentTitle>고객 센터</ContentTitle>
                    {
                        isServiceCenterOpen &&
                        <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="ArrowDropUpIcon"
                        >
                            <ArrowDropUpIcon fontSize="small" />
                        </IconButton>
                    }
                    {
                        !isServiceCenterOpen &&
                        <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="ArrowDropDownIcon"
                        >
                            <ArrowDropDownIcon fontSize="small" />
                        </IconButton>
                    }
                </ContentTitleDiv>
                <Collapse in={isServiceCenterOpen} timeout="auto" unmountOnExit>
                    <Content>
                        제휴 / 제안 / 문의 <br />
                        cs@portvalue.co.kr <br />
                    </Content>
                </Collapse>
            </EachContentDiv>
            <FooterRouterDiv>
                <a href={"https://portvalue.notion.site/PortValue-1dfd54bcde7f417cb04a460528190c9b"}>
                    <FooterRouter>회사소개</FooterRouter>
                </a>
                <FooterRouterDivider>｜</FooterRouterDivider>
                {/* <FooterRouter onClick={()=>router.push("terms")}>공지사항</FooterRouter>
                <FooterRouterDivider>｜</FooterRouterDivider> */}
                <FooterRouter onClick={()=>router.push("terms")}>개인정보처리방침</FooterRouter>
                <FooterRouterDivider>｜</FooterRouterDivider>
                <FooterRouter onClick={()=>router.push("terms")}>이용약관</FooterRouter>
            </FooterRouterDiv>
            <CopyrightTitle>© PORTVALUE All right reserved</CopyrightTitle>
            <CopyrightSubTitle>포트밸류는 통신판매중개자일 뿐이므로, 제품 구매에 따른 규정은 제휴 판매처의 약관이나 규정에 따르고, 포트밸류는 이에 대해 아무런 책임을 지지 않습니다.</CopyrightSubTitle>
        </WrapBox>
    )
};

const WrapBox = Styled.div`
    margin-left: 20px;
    margin-right: 20px;
    padding-bottom: 180px;
    background-color: #FFFFFF;
`
const Content = Styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #666666;
    text-align: left;
    margin-bottom: 15px;
`
const EachContentDiv = Styled.div`
    border-bottom: 1px solid #EBEBEB;
    margin-top: 15px;
    margin-bottom: 15px;
`
const ContentTitleDiv = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    color: #000000;
`
const ContentTitle = Styled.div`
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
`
const FooterRouterDiv = Styled.div`
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
`
const FooterRouter = Styled.div`
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #000000;
`
const FooterRouterDivider = Styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #666666;
    margin-right: 5px;
    margin-left: 5px;
`
const CopyrightTitle = Styled.div`
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #666666;
    text-align: left;
    margin-bottom: 8px;
`
const CopyrightSubTitle = Styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    text-align: left;
    color: #666666;
`

export default DSBFooter;