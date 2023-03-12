import React from 'react';
import Styled from 'styled-components'
import Image from 'next/image'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { getNutriScoreImagePath } from '@/utils/common';

interface Props {
    closeEvent: any,
    nutriScore: any,
}

const NutriScoreResultDrawerList = ({ closeEvent, nutriScore }: Props) => {
    const getNutriScoreColor = (score: string) => {
        let nutriScoreColor = '50, 50, 50'
        if (score === 'A') {
            nutriScoreColor = '0, 148, 68'
        } else if (score === 'B') {
            nutriScoreColor = '141, 198, 64'
        } else if (score === 'C') {
            nutriScoreColor = '255, 190, 23'
        } else if (score === 'D') {
            nutriScoreColor = '242, 101, 34'
        } else if (score === 'E') {
            nutriScoreColor = '237, 28, 36'
        }
        return nutriScoreColor
    }

    const getNutriScoreDescription = (score: string) => {
        let nutriScoreDescription = '뉴트리스코어 준비중'
        if (score === 'A') {
            nutriScoreDescription = '매우 좋은 영양 품질'
        } else if (score === 'B') {
            nutriScoreDescription = '좋은 영양 품질'
        } else if (score === 'C') {
            nutriScoreDescription = '보통 영양 품질'
        } else if (score === 'D') {
            nutriScoreDescription = '안 좋은 영양 품질'
        } else if (score === 'E') {
            nutriScoreDescription = '매우 안 좋은 영양 품질'
        }
        return nutriScoreDescription
    }

    return (
        <>
            {
                <WrapBox>
                    <PopupDiscriptionDiv>
                        <Inner_TopAppBar_Popup>
                            <AppbarTitle>
                                <ProductNameTitle>{"영양 품질 평가 결과"}</ProductNameTitle>
                            </AppbarTitle>
                            <CloseRoundedIconDiv onClick={closeEvent("bottom", false)}>
                                <CloseRoundedIcon color="inherit" fontSize="inherit" />
                            </CloseRoundedIconDiv>
                        </Inner_TopAppBar_Popup>
                    </PopupDiscriptionDiv>
                    <PopupContentListDiv>
                        {
                            nutriScore !== null &&
                            nutriScore !== undefined &&
                            <>
                                <NutriScoreDiv
                                    color={getNutriScoreColor(nutriScore.nutriScore)}
                                >
                                    <NutriScoreImg src={getNutriScoreImagePath(nutriScore.nutriScore)} alt="NutriScoreImg"/>
                                    <NutriScoreDescription>{getNutriScoreDescription(nutriScore.nutriScore)}</NutriScoreDescription>
                                    <NutriScoreAddBtnDiv>
                                    </NutriScoreAddBtnDiv>
                                </NutriScoreDiv>
                                <NutriScoreResultDescDiv>{"권장 영양소 점수가 높고, 제한 영양소 점수가 낮을수록 좋은 영양 품질로 평가됩니다."}</NutriScoreResultDescDiv>
                                <NutriScoreResultContentDiv>
                                    <NutriScoreResultKeyDiv>
                                        <CircleDiv color={"green"} />
                                        <TitleKeyDiv>권장 영양소 점수:</TitleKeyDiv>
                                        <TitleValueDiv>{nutriScore.proteinPoint + nutriScore.fiberPoint}</TitleValueDiv>
                                    </NutriScoreResultKeyDiv>
                                    <NutriScoreResultValueDiv>
                                        <PointValueDiv color={"green"}>✔ 단백질:</PointValueDiv>
                                        <PointKeyDiv>{nutriScore.proteinPoint + '/5'}</PointKeyDiv>
                                    </NutriScoreResultValueDiv>
                                    <NutriScoreResultValueDiv>
                                        <PointValueDiv color={"green"}>✔ 식이섬유:</PointValueDiv>
                                        <PointKeyDiv>{nutriScore.fiberPoint + '/5'}</PointKeyDiv>
                                    </NutriScoreResultValueDiv>
                                </NutriScoreResultContentDiv>
                                <NutriScoreResultContentDiv>
                                    <NutriScoreResultKeyDiv>
                                        <CircleDiv color={"red"} />
                                        <TitleKeyDiv>제한 영양소 점수:</TitleKeyDiv>
                                        <TitleValueDiv>{nutriScore.energyPoint + nutriScore.sugarsPoint + nutriScore.sodiumPoint + nutriScore.saturatedFatPoint}</TitleValueDiv>
                                    </NutriScoreResultKeyDiv>
                                    <NutriScoreResultValueDiv>
                                        <PointValueDiv color={"red"}>✔ 칼로리:</PointValueDiv>
                                        <PointKeyDiv>{nutriScore.energyPoint + '/10'}</PointKeyDiv>
                                    </NutriScoreResultValueDiv>
                                    <NutriScoreResultValueDiv>
                                        <PointValueDiv color={"red"}>✔ 당류:</PointValueDiv>
                                        <PointKeyDiv>{nutriScore.sugarsPoint + '/10'}</PointKeyDiv>
                                    </NutriScoreResultValueDiv>
                                    <NutriScoreResultValueDiv>
                                        <PointValueDiv color={"red"}>✔ 포화지방:</PointValueDiv>
                                        <PointKeyDiv>{nutriScore.saturatedFatPoint + '/10'}</PointKeyDiv>
                                    </NutriScoreResultValueDiv>
                                    <NutriScoreResultValueDiv>
                                        <PointValueDiv color={"red"}>✔ 나트륨:</PointValueDiv>
                                        <PointKeyDiv>{nutriScore.sodiumPoint + '/10'}</PointKeyDiv>
                                    </NutriScoreResultValueDiv>
                                </NutriScoreResultContentDiv>
                                <NutriScoreResultAddDiv>{"단백질에 대한 점수는 제한 영양소 점수가 11점보다 크거나 같을 때 계산되지 않습니다."}</NutriScoreResultAddDiv>
                                <a href='https://kr.openfoodfacts.org/nutriscore'>
                                    <NutriScoreResultAddBtnDiv>{"뉴트리스코어 자세히 보기"}</NutriScoreResultAddBtnDiv>
                                </a>
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
    width: 100%;
    padding: 15px;
`
const NutriScoreDiv = Styled.div`
    border: 2px solid ${(props: { color?: any; }) => props.color === undefined ? "rgb(50, 50, 50)" : "rgb(" + props.color + ")"};
    color: ${(props: { color?: any; }) => props.color === undefined ? "rgb(50, 50, 50)" : "rgb(" + props.color + ")"};
    background: ${(props: { color?: any; }) => props.color === undefined ? "rgb(50, 50, 50, 0.4)" : "rgb(" + props.color + ", 0.2)"};
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const NutriScoreImg = Styled(Image)`
    width: 75px;
    height: auto;
`
const NutriScoreDescription = Styled.div`
    color: inherit;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
`
const NutriScoreAddBtnDiv = Styled.div`
    color: inherit;
    font-size: 16px;
`
const NutriScoreResultDescDiv = Styled.div`
    color: #666666;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.5px;
    text-align: left;
    margin-top: 10px;
`
const NutriScoreResultContentDiv = Styled.div`
    padding: 15px;
`
const NutriScoreResultKeyDiv = Styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    color: #000000;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
`
const CircleDiv = Styled.div`
    width: 15px;
    height: 15px;
    background: ${(props: { color?: any; }) => props.color === undefined ? "#f4f4f4" : props.color};
    border-radius: 50%;
`
const TitleKeyDiv = Styled.div`
`
const TitleValueDiv = Styled.div`
`
const NutriScoreResultValueDiv = Styled.div`
    margin-left: 20px;    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    color: #000000;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.5px;
`
const PointValueDiv = Styled.div`
    text-decoration: underline ${(props: { color?: any; }) => props.color === undefined ? "#f4f4f4" : props.color};
`
const PointKeyDiv = Styled.div`
`
const NutriScoreResultAddDiv = Styled.div`
    color: #666666;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.5px;
    text-align: left;
    margin-top: 10px;
`
const NutriScoreResultAddBtnDiv = Styled.div`
    color: #666666;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.5px;
    text-align: left;
    margin-top: 10px;
    text-decoration: underline #666666;
`

export default NutriScoreResultDrawerList;