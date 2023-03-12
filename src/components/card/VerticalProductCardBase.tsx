import React, { useState, useEffect, useCallback, useRef } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { getNutriScoreImagePath } from '@/utils/common'

import NutriScoreDescriptionPopup from '@/components/popup/NutriScoreDescriptionPopup';

import StarRoundedIcon from '@mui/icons-material/StarRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

interface Props {
    productInfo?: any,
    from?: string,
}

const VerticalProductCardBase = ({ productInfo, from }: Props) => {
    const router = useRouter();

    const [isNutriScoreDescriptionPopupOpen, setIsNutriScoreDescriptionPopupOpen] = useState(false);

    const handleNutriScoreDescriptionPopupOpen = () => {
        setIsNutriScoreDescriptionPopupOpen(true);
    };

    const handleNutriScoreDescriptionPopupClose = () => {
        setIsNutriScoreDescriptionPopupOpen(false);
    };

    const directToBrandWith = (brand: string) => {
        router.push(`/brand?brandName=${brand}`)
    }

    const directToProductWith = (psn: string) => {
        const path = '/productDetail?productSerialNumber=' + psn + (from !== undefined ? ('&from=' + from) : '')
        router.push(path)
    }

    return (
        <>
        <ProductCardDiv>
            <ProductImg src={productInfo.imagePath} width={90} height={90} alt="ProductImg" onClick={() => directToProductWith(productInfo.productSerialNumber)} />
            <ProductContentDiv onClick={() => directToProductWith(productInfo.productSerialNumber)}>
                <BrandNameDiv
                    onClick={(e) => {
                        e.stopPropagation();
                        directToBrandWith(productInfo.parentProductBrand)
                    }}
                >
                    <BrandName>{productInfo.parentProductBrand}</BrandName>
                    <ArrowForwardDiv>
                        <ArrowForwardIosRoundedIcon color="inherit" fontSize="inherit" />
                    </ArrowForwardDiv>
                </BrandNameDiv>
                <ProductTitleDiv>{`${productInfo.parentProductName}, ${productInfo.flavorStr}, ${productInfo.capacityStr}`}</ProductTitleDiv>
                <ProductScoreDiv>
                    <ProductDSBScoreDiv>
                        <ProductPriceDiv>
                            <ProductPrice>{productInfo.price === undefined || productInfo.price === 0 ? "가격 없음" : productInfo.price.toLocaleString() + "원"}</ProductPrice>
                            <ProductKind>{`(${productInfo.amount}개 기준)`}</ProductKind>
                        </ProductPriceDiv>
                        {/* <ReviewInfoDiv>
                            <StarDiv color="#FFD400" width={15}>
                                <StarRoundedIcon color="inherit" fontSize="inherit" />
                            </StarDiv>
                            <ReviewInfo>{`${productInfo.reviewAverageRating} (${productInfo.reviewTotalCount})` + ` · 찜 ${productInfo.favoriteTotalCount === undefined ? "0" : productInfo.favoriteTotalCount}`}</ReviewInfo>
                        </ReviewInfoDiv> */}
                    </ProductDSBScoreDiv>
                    {/* <NutriScoreDiv
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNutriScoreDescriptionPopupOpen()
                        }}
                    >
                        <NutriScoreImg src={getNutriScoreImagePath(productInfo.nutriScoreStr)}/>
                    </NutriScoreDiv> */}
                </ProductScoreDiv>
            </ProductContentDiv>
        </ProductCardDiv>
        {
            <div>
                <NutriScoreDescriptionPopup
                    open={isNutriScoreDescriptionPopupOpen}
                    onClickEventFirst={handleNutriScoreDescriptionPopupClose}
                />
            </div>
        }
        </>
    )
};

const ProductCardDiv = Styled.div`
    padding-right: 20px;
    padding-left: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: left;
`
const ProductPriceDiv = Styled.div`
    margin-bottom: 2px;
`
const ProductContentDiv = Styled.div`
    width: 100%;
    padding-left: 10px;
    padding-top: 5px;
`
const ProductImg = Styled(Image)`
    height: 90px;
    width: 90px;
    border-radius: 4px;
    border: 1px solid #EBEBEB;
    cursor: pointer;
    display: inline-block;
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
const ProductScoreDiv = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`
const ProductDSBScoreDiv = Styled.div`
`
const NutriScoreDiv = Styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 5px;
`
const NutriScoreImg = Styled(Image)`
    width: 80px;
`

export default VerticalProductCardBase;