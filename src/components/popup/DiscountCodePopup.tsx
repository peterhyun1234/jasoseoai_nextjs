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
    onClickEmptySpace?: any,
    btnTextFirst?: any,
}

const DiscountCodePopup = ({ open, onClickEventFirst, onClickEmptySpace, btnTextFirst }: Props) => {

    return (
        <div>
            <CustomDialog
                open={open}
                onClose={onClickEmptySpace}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogBoxDiv>
                    <DialogContentDiv>
                        <DialogContentTitle>할인코드 복사 완료</DialogContentTitle>
                        <DialogContentGuide>결제 시 할인코드를 붙여넣기 해주세요</DialogContentGuide>
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
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.3;
    letter-spacing: -0.2px;
    text-align: left;
    color: #0b0b0b;
    margin-bottom: 11px;
`
const DialogContentGuide = Styled.div`
    width: 120px;
    font-size: 11px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.45;
    letter-spacing: -0.11px;
    text-align: left;
    color: #0075ff;
    margin-bottom: 28px;
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

export default DiscountCodePopup