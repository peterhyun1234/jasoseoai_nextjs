import React from 'react';
import Styled from 'styled-components'
import Image from 'next/image'

import VerticalProductCardBase from '@/components/card/VerticalProductCardBase';

import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import DynamicFeedRoundedIcon from '@mui/icons-material/DynamicFeedRounded';

interface Props {
    productInfo?: any
    addFavoriteWith?: any,
    deleteFavoriteWith?: any,
    selectEvent?: any
}

const VerticalProductCardSelection = ({ productInfo, addFavoriteWith, deleteFavoriteWith, selectEvent }: Props) => {

    return (
        <ProductCard>
            <FlexEndInnerDivider>
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
            </FlexEndInnerDivider>
            <VerticalProductCardBase productInfo={productInfo} />
            <FlexEndInnerDivider>
                <SelectionBtnDiv
                    onClick={selectEvent !== undefined ? selectEvent : undefined}
                >
                    <SelectionBtn>
                        <SelectionIconDiv>
                            <DynamicFeedRoundedIcon color='inherit' fontSize='inherit'/>
                        </SelectionIconDiv>
                        <SelectionBtnText>다른 옵션</SelectionBtnText>
                    </SelectionBtn>
                </SelectionBtnDiv>
            </FlexEndInnerDivider>
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
const FavoriteDiv = Styled.div`
    font-size: 24px;
    height: 24px;
    color: ${(props: { color?: any; }) => props.color == undefined ? "#999999" : props.color};
    padding: 20px;
    z-index: 1;
`
const SelectionIconDiv = Styled.div`
    font-size: 16px;
    height: 16px;
    color: inherit;
    display: flex;
    align-items: center;
`
const SelectionBtnDiv = Styled.div`
    z-index: 1;
    padding: 20px;
    margin-top: -40px;
    background: #transparent;
`
const SelectionBtn = Styled.div`
    padding: 4px 8px;
    border: 1px solid #327BFF;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    gap: 5px;
    color: #327BFF;
    box-shadow: 1px 1px 1px #8cb3fa;
    height: fit-content;
`
const SelectionBtnText = Styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: inherit;
    display: flex;
    align-items: center;
`

export default VerticalProductCardSelection;