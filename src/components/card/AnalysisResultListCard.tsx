import React, { useState, useEffect, useCallback, useRef } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { Divider } from '@mui/material';

interface Props {
    analysisResultList?: any
    from?: any
}

const AnalysisResultListCard = ({ analysisResultList, from }: Props) => {
    const router = useRouter();

    const [analysisList, setAnalysisList] = useState<any>(null)

    const getBarWidth = (rate?: any) => {
        return Number(rate) * 20 + "%"
    }

    const getAnalysisDescription = (name: string) => {
        return `상품 분석은 해당 제품의 카테고리(${name})에 있는 다른 상품과 비교를 통해 산정됩니다.\n
        * 상품 데이터가 부족하여 지표가 부정확할 수 있습니다.
        * 단성비는 광고 목적으로 분석 지표를 절대 임의 조작하지 않습니다.`
    }

    const getBarColor = (rate?: any) => {
        const rateNum = Number(rate)
        let barColor = '#EBEBEB'
        if (rateNum === 5) {
            barColor = '#04ba5c'
        } else if (rateNum < 5 && rateNum >= 4) {
            barColor = '#aad66d'
        } else if (rateNum < 4 && rateNum >= 3) {
            barColor = '#FECD00'
        } else if (rateNum < 3 && rateNum >= 2) {
            barColor = '#F57C05'
        } else if (rateNum < 2 && rateNum >= 1) {
            barColor = '#E73413'
        }

        return barColor

        // let startRColor = 220
        // let startGColor = 240
        // let destRColor = 50
        // let destGColor = 123
        // let rColor = startRColor - (rateNum * (startRColor - destRColor)) / 5
        // let gColor = startGColor - (rateNum * (startGColor - destGColor)) / 5

        // return `rgb(${rColor}, ${gColor}, 255)`
    }

    useEffect(() => {
        setAnalysisList(analysisResultList)
    }, [analysisResultList])

    return (
        <>
            {
                analysisList !== undefined && analysisList !== null && analysisList.length > 0 &&
                <>
                    {
                        <>
                            <ProductAnalysisCard>
                                {
                                    (from === undefined || from !== "productDetail") &&
                                    <ProductAnalysisTopDivider />
                                }
                                <ProductAnalysisListDiv>
                                    {
                                        analysisList[0] !== undefined &&
                                        analysisList[0].perCapacityStr !== undefined &&
                                        <ProductAnalysisDescriptionDiv onClick={() => alert(getAnalysisDescription(analysisList[0].productClassificationStr))}>
                                            <ProductAnalysisDescription>
                                                {"'" + analysisList[0].productClassificationStr + "' 분류 중 " + analysisList[0].perCapacityStr + " 기준"}
                                            </ProductAnalysisDescription>
                                            <HelpOutlineRoundedIconDiv>
                                                <HelpOutlineRoundedIcon fontSize='inherit' color='inherit' />
                                            </HelpOutlineRoundedIconDiv>
                                        </ProductAnalysisDescriptionDiv>
                                    }
                                    {
                                        analysisList.map((v: any) => {
                                            if (v.name !== "단백질" && v.name !== '칼로리' && v.name !== '가격') return null
                                            return (
                                                <ProductAnalysisEachDiv>
                                                    <ProductAnalysisTitle>{v.name}</ProductAnalysisTitle>
                                                    <ProductAnalysisChart>
                                                        <ProductAnalysisChartValueBar barWidth={getBarWidth(v.rating)} color={getBarColor(v.rating)} />
                                                    </ProductAnalysisChart>
                                                    <ProductAnalysisRate>{(Math.round(v.rating * 100) / 100)}</ProductAnalysisRate>
                                                    <ProductAnalysisDivider>｜</ProductAnalysisDivider>
                                                    <ProductAnalysisDesc>{v.content}</ProductAnalysisDesc>
                                                </ProductAnalysisEachDiv>
                                            )
                                        })
                                    }
                                </ProductAnalysisListDiv>
                            </ProductAnalysisCard>
                        </>
                    }
                </>
            }
        </>
    )
};

const ProductAnalysisCard = Styled.div`
    width: calc(100% - 20px);
    margin: 10px 10px 0px 10px;
    background: #FFFFFF;
`
const ProductAnalysisListDiv = Styled.div`
`
const ProductAnalysisEachDiv = Styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 7px;
`
const ProductAnalysisTitle = Styled.div`
    width: 25%;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #666666;
    text-align: right;
`
const ProductAnalysisChart = Styled.div`
    margin: 4px 10px;
    width: calc(27% - 20px);
    height: 7px;
    border-radius: 50px;
    background-color: #EBEBEB;
`
const ProductAnalysisChartValueBar = Styled.div`
    width: ${(props: { barWidth?: string; }) => props.barWidth !== undefined ? props.barWidth : "0%"};
    background-color: ${(props: { color?: any; }) => props.color !== undefined ? props.color : "#EBEBEB"};
    height: 7px;
    border-radius: 50px;
`
const ProductAnalysisRate = Styled.div`
    width: 5%;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #666666;
`
const ProductAnalysisTopDivider = Styled.div`
    width: 100%;
    border-top: 1px dashed #EBEBEB;
    height: 10px;
`
const ProductAnalysisDivider = Styled.div`
    width: 10%;
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.4px;
    color: #bdbdbd;
`
const ProductAnalysisDesc = Styled.div`
    width: 33%;
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 14px;
    letter-spacing: 0.4px;
    text-align: left;
    color: #444444;
`
const ProductAnalysisDescriptionDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    color: #666666;
    margin-bottom: 12px;
`
const ProductAnalysisDescription = Styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    letter-spacing: 0.4px;
`
const HelpOutlineRoundedIconDiv = Styled.div`
    font-size: 14px;
    height: 14px;
    display: flex;
    align-items: center;
`

export default AnalysisResultListCard;