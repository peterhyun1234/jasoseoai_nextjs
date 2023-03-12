import React from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

interface Props {
    info?: any,
    isTarget?: any
}

const HorizontalProductComparisonCard = ({ info, isTarget }: Props) => {
    const router = useRouter();

    return (
        <WrapBox
            bgColor={isTarget ? "#F7F7F7" : "#FFFFFF"}
        >
            <ProductProfileDiv
                onClick={() => {
                    router.push(`/productDetail?productSerialNumber=${info.productSerialNumber}`)
                }}>
                <ProductImageDiv imagePath={info.imagePath}></ProductImageDiv>
                <ProductName>{`${info.parentProductName}, ${info.flavorStr}, ${info.capacityStr}`}</ProductName>
                <ProductPriceDiv>
                    <ProductPrice>{info.price === undefined || info.price === 0 ? "가격 없음" : info.price.toLocaleString() + "원"}</ProductPrice>
                    <ProductKind>{`(${info.amount}개 기준)`}</ProductKind>
                </ProductPriceDiv>
                <StarInfoDiv>
                    <StarDiv color="#FFD400" >
                        <StarOutlinedIcon
                            fontSize="inherit"
                            color="inherit"
                        />
                    </StarDiv>
                    <StarNum>{info.reviewAverageRating}</StarNum>
                    <ReviewNum>({info.reviewTotalCount})</ReviewNum>
                </StarInfoDiv>
            </ProductProfileDiv>
            {
                info.nutrient !== undefined &&
                <ComparisonElementListDiv>
                    <ComparisonElementDiv>
                        <ComparisonDescriptionDiv
                            color={isTarget ? "#9e9e9e" : "#FFFFFF"}
                        >브랜드</ComparisonDescriptionDiv>
                        <ComparisonValueDiv>{info.parentProductBrand}</ComparisonValueDiv>
                    </ComparisonElementDiv>
                    <ComparisonElementDiv>
                        <ComparisonDescriptionDiv
                            color={isTarget ? "#9e9e9e" : "#FFFFFF"}
                        >칼로리</ComparisonDescriptionDiv>
                        <ComparisonValueDiv>{(info.nutrient.calory !== null && info.nutrient.calory !== undefined) ? info.nutrient.calory + 'kcal' : '준비중'}</ComparisonValueDiv>
                    </ComparisonElementDiv>
                    <ComparisonElementDiv>
                        <ComparisonDescriptionDiv
                            color={isTarget ? "#9e9e9e" : "#FFFFFF"}
                        >단백질</ComparisonDescriptionDiv>
                        <ComparisonValueDiv>{(info.nutrient.protein !== null && info.nutrient.protein !== undefined) ? info.nutrient.protein + 'g' : '준비중'}</ComparisonValueDiv>
                    </ComparisonElementDiv>
                    <ComparisonElementDiv>
                        <ComparisonDescriptionDiv
                            color={isTarget ? "#9e9e9e" : "#FFFFFF"}
                        >탄수화물</ComparisonDescriptionDiv>
                        <ComparisonValueDiv>{(info.nutrient.carbohydrate !== null && info.nutrient.carbohydrate !== undefined) ? info.nutrient.carbohydrate + 'g' : '준비중'}</ComparisonValueDiv>
                    </ComparisonElementDiv>
                    <ComparisonElementDiv>
                        <ComparisonDescriptionDiv
                            color={isTarget ? "#9e9e9e" : "#FFFFFF"}
                        >지방</ComparisonDescriptionDiv>
                        <ComparisonValueDiv>{(info.nutrient.fat !== null && info.nutrient.fat !== undefined) ? info.nutrient.fat + 'g' : '준비중'}</ComparisonValueDiv>
                    </ComparisonElementDiv>
                    <ComparisonElementDiv>
                        <ComparisonDescriptionDiv
                            color={isTarget ? "#9e9e9e" : "#FFFFFF"}
                        >나트륨</ComparisonDescriptionDiv>
                        <ComparisonValueDiv>{(info.nutrient.sodium !== null && info.nutrient.sodium !== undefined) ? info.nutrient.sodium + 'mg' : '준비중'}</ComparisonValueDiv>
                    </ComparisonElementDiv>
                </ComparisonElementListDiv>
            }
        </WrapBox>
    )
};

const WrapBox = Styled.div`
    display: inline-grid;
    width: 130px;
    padding: 5px;
    text-align: center;
    background-color: ${(props: { bgColor: any; }) => props.bgColor !== undefined ? props.bgColor : "#FFFFFF"};
    border: solid 1px #EBEBEB;
`
const ProductProfileDiv = Styled.div`
`
const ProductImageDiv = Styled.div`
    width: 120px;
    height: 120px;
    border-radius: 5pt;
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    background-image: url(${(props: { imagePath: any; }) => (props.imagePath !== undefined ? props.imagePath : "https://user-images.githubusercontent.com/46476398/177967097-b35bd274-58f7-46b1-9c06-bc6e9e05179f.png")});
    background-size: cover;
`
const ProductName = Styled.div`
    height: 55px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #000;
    margin-bottom: 3px;
    white-space: break-spaces;
`
const StarInfoDiv = Styled.div`
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
`
const StarDiv = Styled.div`
    color: ${(props: { color?: any; }) => props.color == undefined ? "#EBEBEB" : props.color};
    font-size: 14px;
`
const StarNum = Styled.div`
    margin-right: 4px;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #FFD400;
`
const ReviewNum = Styled.div`
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #9e9e9e;
`
const ProductPriceDiv = Styled.div`
    margin-bottom: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
`
const ProductPrice = Styled.span`
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.25px;
    color: #B2002F;
    margin-right: 4px;
`
const ProductKind = Styled.span`
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    letter-spacing: 0.4px;
    color: #666666;
`
const ComparisonElementListDiv = Styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: solid 1px #EBEBEB;
`
const ComparisonElementDiv = Styled.div`
    height: 35px;
    margin-bottom: 10px;
`
const ComparisonDescriptionDiv = Styled.div`
    width: 120px;
    color: ${(props: { color: any; }) => props.color !== undefined ? props.color : "#FFFFFF"};
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
`
const ComparisonValueDiv = Styled.div`
    width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 700;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #474747;
`

export default HorizontalProductComparisonCard;