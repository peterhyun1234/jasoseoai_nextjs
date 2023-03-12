import React, { useState, useEffect } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

import ProductBoxDivider from '@/components/divider/ProductBoxDivider';

import IconButton from '@mui/material/IconButton';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const dummyAnalysisResultList = [
    {
        name: "단성비",
        rating: 3.5,
        description: "1g 당 3,823,412원",
    },
    {
        name: "단백질 함량",
        rating: 4.5,
        description: "1회 제공량 당 2.8kg",
    },
    {
        name: "칼로리",
        rating: 2.7,
        description: "1팩당 13cal",
    },
    {
        name: "가격",
        rating: 5.0,
        description: "1팩당 2억 3천만원",
    },
    {
        name: "맛",
        rating: 1.5,
        description: "매우 맛없는 편",
    },
]

const dummyReviewSummaryList = [
    {
        key: "맛",
        value: "매우 좋은 편이에요",
        reviewInfoList: [
            {
                key: "매우 좋은 편이에요",
                ratio: 55,
                isMaxRatio: true,
            },
            {
                key: "좋은 편이에요",
                ratio: 10,
                isMaxRatio: false,
            },
            {
                key: "보통이에요",
                ratio: 2,
                isMaxRatio: false,
            },
            {
                key: "안좋은 편이에요",
                ratio: 6,
                isMaxRatio: false,
            },
            {
                key: "매우 안좋은 편이에요",
                ratio: 27,
                isMaxRatio: false,
            },
        ],
    },
    {
        key: "부작용",
        value: "보통이에요",
        reviewInfoList: [
            {
                key: "아예 없는 편이에요",
                ratio: 20,
                isMaxRatio: false,
            },
            {
                key: "거의 없는 편이에요",
                ratio: 2,
                isMaxRatio: false,
            },
            {
                key: "보통이에요",
                ratio: 35,
                isMaxRatio: true,
            },
            {
                key: "많은 편이에요",
                ratio: 16,
                isMaxRatio: false,
            },
            {
                key: "매우 많은 편이에요",
                ratio: 27,
                isMaxRatio: false,
            },
        ],
    },
    {
        key: "재구매 의사",
        value: "높은 편이에요",
        reviewInfoList: [
            {
                key: "매우 높은 편이에요",
                ratio: 20,
                isMaxRatio: false,
            },
            {
                key: "높은 편이에요",
                ratio: 35,
                isMaxRatio: true,
            },
            {
                key: "보통이에요",
                ratio: 2,
                isMaxRatio: false,
            },
            {
                key: "낮은 편이에요",
                ratio: 16,
                isMaxRatio: false,
            },
            {
                key: "매우 낮은 편이에요",
                ratio: 27,
                isMaxRatio: false,
            },
        ],
    },
]

interface Props {
    closeEvent: any,
    productInfo: any,
}

const ProductSummaryDrawerList = ({ closeEvent, productInfo }: Props) => {
    const router = useRouter();
    const [analysisResultList, setAnalysisResultList] = useState<any>([]);
    const [reviewSummaryList, setReviewSummaryList] = useState<any>([]);

    const getBarWidthRating = (rate?: any) => {
        return Number(rate) * 20 + "%"
    }
    
    const getBarColorRating = (rate?: any) => {
        const rateNum = Number(rate)
        let startRColor = 220
        let startGColor = 240
        let destRColor = 50
        let destGColor = 123
        let rColor = startRColor - (rateNum * (startRColor - destRColor)) / 5
        let gColor = startGColor - (rateNum * (startGColor - destGColor)) / 5

        return `rgb(${rColor}, ${gColor}, 255)`
    }

    const getBarWidthRatio = (ratio?: any) => {
        return Number(ratio) + "%"
    }
    
    const getBarColorRatio = (isMaxRatio: boolean) => {
        return isMaxRatio === true ? "#327BFF" : "#BDBDBD"
    }

    useEffect(() => {
        //productInfo 기반으로 데이터 불러와야함
        setAnalysisResultList(dummyAnalysisResultList)
        setReviewSummaryList(dummyReviewSummaryList)
    }, [])

    return (
        <>
            {
                <WrapBox>
                    <PopupDiscriptionDiv>
                        <Inner_TopAppBar_Popup>
                            <AppbarTitle>
                                <ProductNameTitle>{productInfo.parentProductName}</ProductNameTitle>
                                <span>{" 요약"}</span>
                            </AppbarTitle>
                            <CloseRoundedIconDiv onClick={closeEvent("bottom", false)}>
                                <CloseRoundedIcon color="inherit" fontSize="inherit" />
                            </CloseRoundedIconDiv>
                        </Inner_TopAppBar_Popup>
                    </PopupDiscriptionDiv>
                    <PopupContentListDiv>
                        {
                            analysisResultList !== undefined && analysisResultList.length !== 0 &&
                            <>
                                <PopupContentLDiv>
                                    <ContentTitleDiv>
                                        <ContentTitleText>상품분석 결과</ContentTitleText>
                                        <IconButtonDiv>
                                            <IconButton
                                                size="small"
                                                edge="start"
                                                color="inherit"
                                                aria-label="HelpOutlineOutlinedIcon"
                                            >
                                                <HelpOutlineOutlinedIcon fontSize="small" />
                                            </IconButton>
                                        </IconButtonDiv>
                                    </ContentTitleDiv>
                                    <ProductAnalysisListDiv>
                                        {
                                            analysisResultList.map((v: any, i: number) => {
                                                return (
                                                    <ProductAnalysisEachDiv>
                                                        <ProductAnalysisTitle>{v.name}</ProductAnalysisTitle>
                                                        <ProductAnalysisChart>
                                                            <ProductAnalysisChartValueBar 
                                                                barWidth={getBarWidthRating(v.rating)} 
                                                                color={getBarColorRating(v.rating)}
                                                            />
                                                        </ProductAnalysisChart>
                                                        <ProductAnalysisRate>{v.rating}</ProductAnalysisRate>
                                                        <ProductAnalysisDivider>｜</ProductAnalysisDivider>
                                                        <ProductAnalysisDesc>{v.description}</ProductAnalysisDesc>
                                                    </ProductAnalysisEachDiv>
                                                )
                                            })
                                        }
                                    </ProductAnalysisListDiv>
                                </PopupContentLDiv>
                                <ProductBoxDivider />
                            </>
                        }
                        {
                            reviewSummaryList !== undefined && reviewSummaryList.length !== 0 &&
                            <>
                                <PopupContentLDiv>
                                    <ContentTitleDiv>
                                        <ContentTitleText>고객 리뷰 요약</ContentTitleText>
                                        <IconButtonDiv>
                                            <IconButton
                                                size="small"
                                                edge="start"
                                                color="inherit"
                                                aria-label="ArrowForwardIosRoundedIcon"
                                            >
                                                <ArrowForwardIosRoundedIcon fontSize="small" />
                                            </IconButton>
                                        </IconButtonDiv>
                                    </ContentTitleDiv>
                                    <ReviewSummaryListDiv>
                                        {
                                            reviewSummaryList.map((v: any, i: number) => {
                                                return (
                                                    <ReviewSummaryEachDiv>
                                                        <ReviewSummaryTitleDiv>
                                                            <ReviewSummaryEachKey>{v.key}</ReviewSummaryEachKey>
                                                            <ReviewSummaryEachValue>{v.value}</ReviewSummaryEachValue>
                                                        </ReviewSummaryTitleDiv>
                                                        {
                                                            v.reviewInfoList.map((v: any, i: number) => {
                                                                return (
                                                                    <ReviewInfoEachDiv>
                                                                        <ReviewInfoTitle>{v.key}</ReviewInfoTitle>
                                                                        <ReviewInfoRate isMaxRatio={v.isMaxRatio}>{v.ratio + "%"}</ReviewInfoRate>
                                                                        <ReviewInfoChart>
                                                                            <ReviewInfoChartValueBar 
                                                                                barWidth={getBarWidthRatio(v.ratio)} 
                                                                                color={getBarColorRatio(v.isMaxRatio)}
                                                                            />
                                                                        </ReviewInfoChart>
                                                                    </ReviewInfoEachDiv>
                                                                )
                                                            })
                                                        }
                                                    </ReviewSummaryEachDiv>
                                                )
                                            })
                                        }
                                    </ReviewSummaryListDiv>
                                </PopupContentLDiv>
                            </>
                        }
                    </PopupContentListDiv>
                </WrapBox>
            }
        </>
    )
};

const WrapBox = Styled.div`
    overflow: unset;
`
const Inner_TopAppBar_Popup = Styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #EBEBEB;
    padding-top: 15px;
    padding-bottom: 15px;
`
const PopupDiscriptionDiv = Styled.div`
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
	top: 0px;
    left: 0px;
    background-color: #ffffff;
    z-index: 30;
`
const AppbarTitle = Styled.div`
    text-align: left;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #666666;
    margin-left: 20px;
`
const ProductNameTitle = Styled.span`
    color: #333333;
    box-shadow: rgb(180 255 185) 0px -5px 0px inset;
`
const CloseRoundedIconDiv = Styled.div`
    font-size: 24px;
    height: 24px;
    color: #333333;
    margin-right: 20px;
`
const PopupContentListDiv = Styled.div`
    background-color: #ffffff;
    overflow: auto;
    z-index: 29;
`
const PopupContentLDiv = Styled.div`
    text-align: center;
    padding: 20px;
`
const ProductAnalysisListDiv = Styled.div`
    margin-top: 35px;
    margin-bottom: 15px;
`
const ProductAnalysisEachDiv = Styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 9px;
`
const ProductAnalysisTitle = Styled.div`
    width: 25%;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #000000;
    text-align: right;
`
const ProductAnalysisChart = Styled.div`
    margin: 4px 10px;
    width: calc(24% - 20px);
    height: 9px;
    border-radius: 50px;
    background-color: #EBEBEB;
`
const ProductAnalysisChartValueBar = Styled.div`
    width: ${(props: { barWidth?: string; }) => props.barWidth !== undefined ? props.barWidth : "0%"};
    background-color: ${(props: { color?: any; }) => props.color !== undefined ? props.color : "#EBEBEB"};
    height: 9px;
    border-radius: 50px;
`
const ProductAnalysisRate = Styled.div`
    width: 6%;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #666666;
`
const ProductAnalysisDivider = Styled.div`
    width: 9%;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.4px;
    color: #666666;
`
const ProductAnalysisDesc = Styled.div`
    width: 36%;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.4px;
    text-align: left;
    color: #000000;
`
const ContentTitleDiv = Styled.div`
    display: flex;
    justify-content: space-between;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #000000;
    text-align: left;
    margin-bottom: 16px;
`
const IconButtonDiv = Styled.div`
    display: flex;
    justify-content: flex-end;
`
const ContentTitleText = Styled.div`
    color: ${(props: { color?: any; }) => props.color == undefined ? "#000000" : props.color};
    margin-right: 5px;
`

const ReviewSummaryListDiv = Styled.div`
    text-align: left;
    margin-top: 35px;
    margin-bottom: 15px;
`
const ReviewSummaryEachDiv = Styled.div`
    margin-bottom: 30px;
`
const ReviewSummaryTitleDiv = Styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
`
const ReviewSummaryEachKey = Styled.div`
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: #000000;
    margin-right: 8px;
`
const ReviewSummaryEachValue = Styled.div`
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: #333333;
    padding: 0px 8px;
    background: #F5F5F5;
    border-radius: 4px;
`
const ReviewInfoEachDiv = Styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
`
const ReviewInfoTitle = Styled.div`
    width: 40%;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #666666;
`
const ReviewInfoRate = Styled.div`
    width: 10%;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: ${(props: { isMaxRatio?: any; }) => props.isMaxRatio === true ? "#327BFF" : "#666666"};
`
const ReviewInfoChart = Styled.div`
    margin: 4px 10px;
    width: calc(50% - 20px);
    height: 12px;
    border-radius: 3px;
    background-color: #F5F5F5;
`
const ReviewInfoChartValueBar = Styled.div`
    width: ${(props: { barWidth?: string; }) => props.barWidth !== undefined ? props.barWidth : "0%"};
    background-color: ${(props: { color?: any; }) => props.color !== undefined ? props.color : "#EBEBEB"};
    height: 12px;
    border-radius: 3px;
`

export default ProductSummaryDrawerList;