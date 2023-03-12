import React from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import Skeleton from '@mui/material/Skeleton';

const VerticalProductCardSkeleton = () => {
    return (
        <ProductCard>
            <FlexEndInnerDivider/>
            <ProductCardDiv>
                <Skeleton variant="rectangular" width={100} height={80} />
                <ProductContentDiv>
                    <Skeleton width="30%" />
                    <Skeleton width="80%" />
                    <Skeleton width="70%" />
                    <Skeleton width="60%" />
                </ProductContentDiv>
            </ProductCardDiv>
            <FlexBetweenInnerDivider />
        </ProductCard>
    )
};


const ProductCard = Styled.div`
    border-bottom: 2px solid #EBEBEB;
`
const FlexEndInnerDivider = Styled.div`
    width: 100%;
    height: 24px;
    display: flex;
    justify-content: flex-end;
`
const FlexBetweenInnerDivider = Styled.div`
    width: 100%;
    height: 24px;
    display: flex;
    justify-content: space-between;
`

const ProductPriceDiv = Styled.div`
    margin-bottom: 2px;
`
const ProductContentDiv = Styled.div`
    width: 100%;
    padding-left: 10px;
    padding-top: 5px;
`
const StarDiv = Styled.div`
    font-size: ${(props: { width?: number; }) => props.width == undefined ? "24" : props.width}px;
    color: ${(props: { color?: any; }) => props.color == undefined ? "#EBEBEB" : props.color};
`
const ReviewInfo = Styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #333333;
    margin-right: 4px;
    margin-left: 4px;
    margin-top: 1px;
`
const ProductPrice = Styled.span`
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: #B2002F;
    margin-right: 4px;
`
const ProductKind = Styled.span`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #666666;
`
const ReviewInfoDiv = Styled.div`
    display: flex;
    justify-content: flex-start;
`
const ProductTitleDiv = Styled.div`
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: #000000;
    padding-bottom: 4px;
`
const BrandNameDiv = Styled.div`
    display: flex;
    justify-content: flex-start; 
    padding-bottom: 6px;
    width: fit-content;
`
const BrandName = Styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #333333;
    font-style: normal;
    box-shadow: rgb(112 161 250 / 30%) 0px -4px 0px inset;
`
const ArrowForwardDiv = Styled.div`
    font-size: 10px;
    height: 10px;
    margin-left: 1px;
    margin-top: 3px;
    color: #333333;
`
const ProductCardDiv = Styled.div`
    padding-right: 20px;
    padding-left: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
`

export default VerticalProductCardSkeleton;