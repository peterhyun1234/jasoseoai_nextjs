import React from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

import VerticalProductCardBase from '@/components/card/VerticalProductCardBase';
import InnerProductSummaryCard from '@/components/card/InnerProductSummaryCard';
import AnalysisResultListCard from '@/components/card/AnalysisResultListCard';

import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

interface Props {
    productInfo?: any
    addFavorite?: any,
    addFavoriteWith?: any,
    deleteFavoriteWith?: any,
    idx: number,
    from?: string,
}

const VerticalProductCardAddSummary = ({ productInfo, addFavorite, addFavoriteWith, deleteFavoriteWith, idx, from }: Props) => {
    return (
        <ProductCard>
            <FlexEndInnerDivider>
                {/* {
                    addFavorite !== false &&
                    <>
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
                    </>
                } */}
            </FlexEndInnerDivider>
            <VerticalProductCardBase productInfo={productInfo} from={from} />
            {
                productInfo.analysisResultList !== undefined && productInfo.analysisResultList.length > 0 &&
                <AnalysisResultListCard analysisResultList={productInfo.analysisResultList} />
            }
            {
                productInfo.oneLineComment !== undefined && productInfo.oneLineComment.length > 0 &&
                <OneLineCommentDiv>
                    <OneLineCommentDescDiv>단성비 한줄평</OneLineCommentDescDiv>
                    <p>{productInfo.oneLineComment}</p>
                </OneLineCommentDiv>
            }
            {/* {
                productInfo.reviewSummary !== undefined && productInfo.reviewSummary.length > 0 &&
                <InnerProductSummaryCard productInfo={productInfo}/>
            } */}
            <FlexBetweenInnerDivider />
        </ProductCard>
    )
};


const ProductCard = Styled.div`
    border-bottom: 2px solid #e0e0e0;
`
const FlexEndInnerDivider = Styled.div`
    width: 100%;
    height: 10px;
    display: flex;
    justify-content: flex-end;
`
const FlexBetweenInnerDivider = Styled.div`
    width: 100%;
    height: 10px;
    display: flex;
    justify-content: space-between;
`
const FavoriteDiv = Styled.div`
    font-size: 10px;
    height: 10px;
    color: ${(props: { color?: any; }) => props.color == undefined ? "#999999" : props.color};
    padding: 20px;
    z-index: 1;
`
const OneLineCommentDescDiv = Styled.div`
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: #327BFF;
    margin-bottom: 5px;
`
const OneLineCommentDiv = Styled.div`
    background: #F1F6FF;
    border-radius: 8px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: #000000;
    text-align: center;
    padding: 10px 15px;
    margin: 20px 15px 10px 15px;
    word-break: keep-all;
    white-space: break-spaces;
`

export default VerticalProductCardAddSummary;