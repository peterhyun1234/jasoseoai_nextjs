import React from 'react';
import Styled from 'styled-components';
import Image from 'next/image';

import sfa_entry from '@/assets/images/sfa_entry.png';

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
}

const NutriScoreDescriptionPopup = ({ open, onClickEventFirst }: Props) => {

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
                        <SearchForAnalysisImg src={sfa_entry} alt='SearchForAnalysisImg' layout="responsive" width={1000} height={1200} />
                    </DialogContentDiv>
                    <GrayLine />
                    <DialogBtnDiv>
                        <DialogBtn
                            onClick={onClickEventFirst !== undefined ? onClickEventFirst : undefined}
                            textColor={"#327bff"}
                        >확인</DialogBtn>
                    </DialogBtnDiv>
                </DialogBoxDiv>
            </CustomDialog>
        </div>
    )
}

const DialogBoxDiv = Styled.div`
    width: 100%;
    border-radius: 10px;
`
const DialogContentDiv = Styled.div`
    word-break: keep-all;
    padding: 23px 20px;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 200%;
    letter-spacing: normal;
    text-align: center;
    color: #000;
`
const GrayLine = Styled.div`
    height: 0px;
    border-top: solid 1px #e9e9e9;
    background-color: #e9e9e9;
`
const DialogBtnDiv = Styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.98;
    letter-spacing: normal;
`
const DialogBtn = Styled.div`
    text-align: center;
    width: 100%;
    padding-top: 17px;
    padding-bottom: 17px;
    color: ${(props: { textColor?: any; }) => props.textColor !== undefined ? props.textColor : "#9e9e9e"};
`
const SearchForAnalysisImg = Styled(Image)`
`

export default NutriScoreDescriptionPopup