import React from 'react';
import Styled from 'styled-components';
import Image from 'next/image';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

const CustomDialog = styled(Dialog)({
    "& .MuiPaper-rounded": {
        borderRadius: 10
    },
    "& .MuiDialog-paperWidthSm": {
        width: "100%"
    }
});

interface Props {
    open?: any,
    onClickEventFirst?: any,
    btnTextFirst?: any,
    deliveryCondition?: any,
    distributor?: any,
}

const DeliveryConditionPopup = ({ open, onClickEventFirst, btnTextFirst, deliveryCondition, distributor }: Props) => {

    return (
        <div>
            <CustomDialog
                open={open}
                onClose={onClickEventFirst}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogBoxDiv>
                    <DialogContentDiv>
                        <DialogContentTitle>{distributor} 배송 조건 <PriceSpan>{deliveryCondition}</PriceSpan> 이상 구매시 무료 배송</DialogContentTitle>
                    </DialogContentDiv>
                    <DialogBtnDiv>
                        <DialogBtn
                            onClick={onClickEventFirst !== undefined ? onClickEventFirst : undefined}
                            textColor={"#286ef1"}
                        >{btnTextFirst}</DialogBtn>
                    </DialogBtnDiv>
                </DialogBoxDiv>
            </CustomDialog>
        </div>
    )
}

const DialogContentTitle = Styled.div`
    width: 176px;
    text-shadow: 0 0 6px rgba(0, 0, 0, 0.16);
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.3;
    letter-spacing: -0.2px;
    text-align: left;
    color: #fff;
`
const PriceSpan = Styled.span`
    color: #fddf1e;
`
const DialogBoxDiv = Styled.div`
    width: 100%;
    border-radius: 10px;
`
const DialogContentDiv = Styled.div`
    word-break: keep-all;
    padding: 36px 28px 0px;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 200%;
    letter-spacing: normal;
    text-align: center;
    color: #000;
    height: 250px;
    background-color: #2464ef;
`
const DialogBtnDiv = Styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.63;
    letter-spacing: -0.16px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
`
const DialogBtn = Styled.div`
    text-align: center;
    width: 100%;
    padding-top: 17px;
    padding-bottom: 17px;
    color: ${(props: { textColor?: any; }) => props.textColor !== undefined ? props.textColor : "#286ef1"};
`

export default DeliveryConditionPopup