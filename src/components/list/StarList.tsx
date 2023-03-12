import React, { useState, useEffect } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'

import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

interface Props {
    value: number | string,
    width?: number | string,
}
const starMaxNum = 5;

const StarList = ({ value, width }: Props) => {

    const starList = (curStarNum: number) => {
        if (curStarNum == undefined) return
        let curSNum = curStarNum
        let result = [];
        for (let i = 0; i < starMaxNum; i++) {
            if (curSNum >= 1) {
                result.push(
                    <StarDiv color="#FFD400" width={Number(width)}>
                        <StarRoundedIcon color="inherit" fontSize="inherit" />
                    </StarDiv>)
            }
            else if (curSNum > 0 && curSNum < 1) {
                result.push(
                    <StarDiv color="#FFD400" width={Number(width)}>
                        <StarHalfRoundedIcon color="inherit" fontSize="inherit" />
                    </StarDiv>)
            }
            else {
                result.push(
                    <StarDiv color="#FFD400" width={Number(width)}>
                        <StarBorderRoundedIcon color="inherit" fontSize="inherit" />
                    </StarDiv>)
            }
            curSNum--
        }
        return result;
    };

    return (
        <WrapBox>
            {
                starList(Number(value))
            }
        </WrapBox>
    )
};

const WrapBox = Styled.div`
    display: flex;
    justify-content: left;
`
const StarDiv = Styled.div`
    font-size: ${(props: { width?: number; }) => props.width == undefined ? "24" : props.width}px;
    color: ${(props: { color?: any; }) => props.color == undefined ? "#EBEBEB" : props.color};
`

export default StarList;
