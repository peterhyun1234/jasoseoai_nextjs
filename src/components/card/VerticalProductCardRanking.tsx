import React from 'react';
import Styled from 'styled-components'
import Image from 'next/image'

import VerticalProductCardBase from '@/components/card/VerticalProductCardBase';
import InnerProductSummaryCard from '@/components/card/InnerProductSummaryCard';
import AnalysisResultListCard from '@/components/card/AnalysisResultListCard';

import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

interface Props {
    productInfo?: any
    addFavoriteWith?: any,
    deleteFavoriteWith?: any,
    idx: number
}

const VerticalProductCardRanking = ({ productInfo, addFavoriteWith, deleteFavoriteWith, idx }: Props) => {
    const getRankColor = (rank: number) => {
        if(rank === 1) return "#D6AF36"
        if(rank === 2) return "#D7D7D7"
        if(rank === 3) return "#824A02"

        return "#666666"
    }

    return (
        <ProductCard>
            <FlexBetweenInnerDivider>
                <RankDiv bgColor={getRankColor(idx + 1)}>
                    <Rank>{idx + 1}</Rank>
                </RankDiv>
                {
                    productInfo.isFavorite === true ?
                    <FavoriteDiv 
                        color="#F2335C"
                        onClick={(e) => {
                            if (deleteFavoriteWith !== undefined) {
                                deleteFavoriteWith(productInfo.childProductId)
                            }
                        }}
                    >
                        <FavoriteRoundedIcon color="inherit" fontSize="inherit" />
                    </FavoriteDiv>
                    :
                    <FavoriteDiv 
                        color="#999999"
                        onClick={(e) => {
                            if (addFavoriteWith !== undefined) {
                                addFavoriteWith(productInfo.childProductId)
                            }
                        }}
                    >
                        <FavoriteBorderRoundedIcon color="inherit" fontSize="inherit" />
                    </FavoriteDiv>
                }
            </FlexBetweenInnerDivider>
            <VerticalProductCardBase productInfo={productInfo} />
            {
                productInfo.analysisResultList !== undefined && productInfo.analysisResultList.length > 0 &&
                <AnalysisResultListCard analysisResultList={productInfo.analysisResultList}/>
            }
            {
                productInfo.reviewSummary !== undefined && productInfo.reviewSummary.length > 0 &&
                <InnerProductSummaryCard productInfo={productInfo}/>
            }
            <FlexBetweenInnerDivider />
        </ProductCard>
    )
};


const ProductCard = Styled.div`
    border-bottom: 2px solid #EBEBEB;
`
const FlexBetweenInnerDivider = Styled.div`
    width: 100%;
    height: 24px;
    display: flex;
    justify-content: space-between;
`
const RankDiv = Styled.div`
    width: 24px;
    height: 24px;
    text-align: center;
    color: #FFFFFF;
    background: ${(props: { bgColor?: any; }) => props.bgColor === undefined ? "#666666" : props.bgColor};
`
const Rank = Styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    margin-top: 1px;
`
const FavoriteDiv = Styled.div`
    font-size: 24px;
    height: 24px;
    color: ${(props: { color?: any; }) => props.color === undefined ? "#999999" : props.color};
    padding: 20px;
    z-index: 1;
`

export default VerticalProductCardRanking;