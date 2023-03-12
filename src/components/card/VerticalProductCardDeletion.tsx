import React from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

import VerticalProductCardBase from '@/components/card/VerticalProductCardBase';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

interface Props {
    productInfo?: any
    idx: number
    deleteWith: any
}

const VerticalProductCardDeletion = ({ productInfo, idx, deleteWith }: Props) => {
    const router = useRouter();

    return (
        <ProductCard>
            <FlexEndInnerDivider />
            <VerticalProductCardBase productInfo={productInfo} />
            <DeletionDiv>
                <DeletionBtnDiv
                    onClick={(e) => {
                        deleteWith(productInfo.childProductId)
                    }}
                >
                    <DeletionBtn>
                        <DeletionIconDiv>
                            <DeleteForeverRoundedIcon color='inherit' fontSize='inherit'/>
                        </DeletionIconDiv>
                        <DeletionBtnText>삭제</DeletionBtnText>
                    </DeletionBtn>
                </DeletionBtnDiv>
            </DeletionDiv>
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
const DeletionDiv = Styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`
const DeletionIconDiv = Styled.div`
    font-size: 16px;
    height: 16px;
    color: inherit;
    display: flex;
    align-items: center;
`
const DeletionBtnDiv = Styled.div`
    z-index: 1;
    padding: 10px;
    background: #transparent;
`
const DeletionBtn = Styled.div`
    padding: 4px 8px;
    border: 1px solid #cc123b;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    gap: 5px;
    color: #cc123b;
    box-shadow: 1px 1px 1px #c26579;
    height: fit-content;
`
const DeletionBtnText = Styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: inherit;
    display: flex;
    align-items: center;
`

export default VerticalProductCardDeletion;