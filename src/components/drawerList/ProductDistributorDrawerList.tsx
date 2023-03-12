import React, { useState, useEffect } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { getRequest } from '@/utils/APIRequest';


function valuetext(value: number) {
    return `${value.toLocaleString()}원`;
}

interface Props {
    closeEvent: any,
    productSerialNumber: any,
}

const ProductDistributorDrawerList = ({ closeEvent, productSerialNumber }: Props) => {
    const router = useRouter();
    const [distributorList, setDistributorList] = useState<any>([]);

    const getDistributorList = async (psn: string) => {
        if (psn === undefined || psn === null) return
        const res = await getRequest(`/distributors/${psn}`)
        if (res !== null) {
            if (res.status === 200) {
                setDistributorList([...res.data])
            } else if (res.status === 204) {
                setDistributorList([])
            }
        }
        return
    }

    useEffect(() => {
        if (productSerialNumber === undefined || productSerialNumber === null) return
        getDistributorList(productSerialNumber)
    }, [productSerialNumber])

    return (
        <>
            {
                <WrapBox>
                    <PopupDiscriptionDiv>
                        <Inner_TopAppBar_Popup>
                            <AppbarTitle>
                                <ProductNameTitle>{"판매처"}</ProductNameTitle>
                            </AppbarTitle>
                            <CloseRoundedIconDiv onClick={closeEvent("bottom", false)}>
                                <CloseRoundedIcon color="inherit" fontSize="inherit" />
                            </CloseRoundedIconDiv>
                        </Inner_TopAppBar_Popup>
                    </PopupDiscriptionDiv>
                    <PopupContentListDiv>
                        {
                            distributorList !== undefined && distributorList.length > 0 &&
                            <>
                            {
                                distributorList.map((v: any) => {
                                    return (
                                        <a href={(v.encodedProductLink !== undefined && v.encodedProductLink !== null && v.encodedProductLink.length > 0) ? v.encodedProductLink : v.productLink}>
                                            <DistributorDiv>
                                                <DistributorName>{v.distributor.name}</DistributorName>
                                                <DistributorPricingDiv>
                                                    <PriceDiv>{valuetext(v.price) + " (" + v.amount + "개)"}</PriceDiv>
                                                    <PriceDescDiv>
                                                        {
                                                            ((v.price > v.distributor.freeDeliveryCondition) ? "무료배송" : valuetext(v.distributor.deliveryFee))
                                                        }
                                                    </PriceDescDiv>
                                                </DistributorPricingDiv>
                                            </DistributorDiv>
                                        </a>
                                    )
                                })
                            }
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
`
const DistributorDiv = Styled.div`
    width: 100%;
    padding: 25px;
    border-bottom: solid 2px #F4F4F4;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const DistributorName = Styled.div`
    width: fit-content;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #444444;
    font-style: normal;
    box-shadow: rgb(112 161 250 / 30%) 0px -4px 0px inset;
`
const DistributorPricingDiv = Styled.div`
    width: fit-content;
`
const PriceDiv = Styled.div`
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    color: #666666;
    font-style: normal;
`
const PriceDescDiv = Styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #999999;
    font-style: normal;
`

export default ProductDistributorDrawerList;