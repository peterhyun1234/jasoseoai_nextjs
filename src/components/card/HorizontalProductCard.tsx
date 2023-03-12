import React from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

import StarOutlinedIcon from '@mui/icons-material/StarOutlined';

interface Props {
    info?: any,
    type?: any,
    idx?: number,
}

const HorizontalProductCard = ({ info, type, idx }: Props) => {
    const router = useRouter();

    const getRankColor = (rank: number) => {
        if (rank === 1) return "#D6AF36"
        if (rank === 2) return "#D7D7D7"
        if (rank === 3) return "#824A02"

        return "#666666"
    }

    return (
        <WrapBox
            onClick={() => {
                router.push(`/productDetail?productSerialNumber=${info.productSerialNumber}`)
            }}
        >
            <ProductImageDiv imagePath={info.imagePath}>
                {
                    type === "ranking" && idx !== undefined &&
                    <RankDiv bgColor={getRankColor(idx + 1)}>
                        <Rank>{idx + 1}</Rank>
                    </RankDiv>
                }
            </ProductImageDiv>
            <BrandName>{info.parentProductBrand}</BrandName>
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
        </WrapBox>
    )
};

const WrapBox = Styled.div`
    display: inline-grid;
    width: 120px;
    margin-right: 10px;
    text-align: left;
`
const RankDiv = Styled.div`
    width: 24px;
    height: 24px;
    border-radius: 5pt;
    text-align: center;
    color: #FFFFFF;
    background: ${(props: { bgColor?: any; }) => props.bgColor == undefined ? "#666666" : props.bgColor};
`
const Rank = Styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    margin-top: 1px;
`
const ProductImageDiv = Styled.div`
    width: 100px;
    height: 100px;
    border-radius: 5pt;
    display: flex;
    margin-bottom: 10px;
    align-items: start;
    background-image: url(${(props: { imagePath: any; }) => (props.imagePath !== undefined ? props.imagePath : "https://user-images.githubusercontent.com/46476398/177967097-b35bd274-58f7-46b1-9c06-bc6e9e05179f.png")});
    background-size: cover;
`
const BrandName = Styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #9e9e9e;
    margin-bottom: 2px;
`
const ProductName = Styled.div`
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
    justify-content: flex-start;
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

export default HorizontalProductCard;