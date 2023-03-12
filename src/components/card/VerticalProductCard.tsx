import React from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

import VerticalProductCardBase from '@/components/card/VerticalProductCardBase';

import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

interface Props {
    productInfo?: any,
    addFavorite?: boolean,
    addFavoriteWith?: any,
    deleteFavoriteWith?: any,
    idx?: number
}

const VerticalProductCard = ({ productInfo, addFavorite, addFavoriteWith, deleteFavoriteWith, idx }: Props) => {
    const router = useRouter();

    return (
        <ProductCard>
            <FlexEndInnerDivider>
                {
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
                }
            </FlexEndInnerDivider>
            <VerticalProductCardBase productInfo={productInfo} />
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
const FavoriteDiv = Styled.div`
    font-size: 24px;
    height: 24px;
    color: ${(props: { color?: any; }) => props.color == undefined ? "#999999" : props.color};
    padding: 20px;
    z-index: 1;
`

export default VerticalProductCard;