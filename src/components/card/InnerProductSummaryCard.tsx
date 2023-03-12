import React, { useState, useEffect, useCallback, useRef } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'

import ProductSummaryDrawerList from '@/components/drawerList/ProductSummaryDrawerList'

import { styled } from '@mui/material';
import Drawer from '@mui/material/Drawer';

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const CustomDrawer = styled(Drawer)({
    "& .MuiPaper-root": {
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    "& .MuiPaper-elevation16": {
        boxShadow: "none"
    },
});

interface Props {
    productInfo?: any
    location?: any
}

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const InnerProductSummaryCard = ({ productInfo, location }: Props) => {
    const router = useRouter()

    const [productSummaryPopupState, setProductSummaryPopupState] = useState<any>({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const CustomList = styled('div')({
        height: typeof window !== 'undefined' ? window.innerHeight * 0.75 : '75vh',
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    });

    const toggleProductSummaryDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setProductSummaryPopupState({ ...productSummaryPopupState, [anchor]: open });
    };

    const productSummaryList = (anchor: Anchor) => (
        <CustomList
            role="presentation"
            onKeyDown={toggleProductSummaryDrawer(anchor, false)}
            draggable="true"
        >
            <ProductSummaryDrawerList
                closeEvent={toggleProductSummaryDrawer}
                productInfo={productInfo}
            />
        </CustomList>
    );

    return (
        <>
            {
                productInfo.summary !== undefined && productInfo.summary.length !== 0 &&
                <ProductSummaryCard  onClick={toggleProductSummaryDrawer("bottom", true)}>
                    <ProductSummaryInfoDiv>
                        {
                            productInfo.summary.map((v: any, i: number) => {
                                return (
                                    <EachProductSummaryDiv>
                                        <ProductSummaryKey>{v.key}</ProductSummaryKey>
                                        <ProductSummaryValue>{v.value}</ProductSummaryValue>
                                    </EachProductSummaryDiv>
                                )
                            })
                        }

                    </ProductSummaryInfoDiv>
                    <ArrowDiv>
                        <KeyboardArrowDownRoundedIcon color="inherit" fontSize="inherit" />
                    </ArrowDiv>
                </ProductSummaryCard>
            }
            {
                <CustomDrawer
                    anchor={"bottom"}
                    open={productSummaryPopupState["bottom"]}
                    onClose={toggleProductSummaryDrawer("bottom", false)}
                >
                    {productSummaryList("bottom")}
                </CustomDrawer>
            }
        </>
    )
};

const ProductSummaryCard = Styled.div`
    width: calc(100% - 40px - 32px);
    background: #FFFFFF;
    border: 1px solid #999999;
    border-radius: 8px;
    margin: 20px 20px 0px 20px;
    padding: 8px 12px 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const ProductSummaryInfoDiv = Styled.div`
    width: calc(100% - 24px);
    text-align: left;
    flex-flow: row wrap;
    display: flex;
`
const ArrowDiv = Styled.div`
    width: 24px;
    height: 24px;
    font-size: 24px;
    text-align: right;
    color: #327BFF;
    margin-bottom: 4px;
`
const EachProductSummaryDiv = Styled.div`
    width: fit-content;
    display: flex;
    justify-content: flex-start;
    margin-right: 10px;
    margin-top: 3px;
    margin-bottom: 3px;
`
const ProductSummaryKey = Styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #666666;
    margin-right: 4px;
`
const ProductSummaryValue = Styled.div`
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #333333;
    background: #F5F5F5;
    border-radius: 4px;
    padding-right: 4px;
    padding-left: 4px;
`

export default InnerProductSummaryCard;