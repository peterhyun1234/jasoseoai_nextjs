import React from 'react';
import Styled from 'styled-components'
import Image from 'next/image'

interface Props {
    info: any,
    cardColor: any,
    type?: any,
    idx?: number,
}

const HorizontalCard = ({ info, cardColor, type, idx }: Props) => {
    return (
        <WrapBox>
            <CardDiv bgColor={cardColor}>
                <CardImgDiv>
                    <CardImg
                        width={30}
                        height={30} 
                        src={info.imagePath} 
                        alt={info.imagePath}
                    />
                </CardImgDiv>
                <CardTitle>{info.name}</CardTitle>
                {
                    type === "addDescription" && info.capacityStr !== undefined &&
                    <CardSubTitle>{info.capacityStr}</CardSubTitle>
                }
            </CardDiv>
        </WrapBox>
    )
};

const WrapBox = Styled.div`
    display: inline-grid;
    margin-right: 12px;
    margin-top: 2px;
    margin-bottom: 2px;
    margin-left: 2px;
`
const CardDiv = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 12px;
    gap: 8px;
    text-align: center;
    background-color: ${(props: { bgColor: any; }) => props.bgColor !== undefined ? props.bgColor : "#EBEBEB"};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
`
const CardImgDiv = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
`
const CardImg = Styled(Image)`
    width: 30px;
    height: 30px;
`
const CardTitle = Styled.div`
    width: 60px;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #000000;
    word-break: keep-all;
    white-space: break-spaces;
`
const CardSubTitle = Styled.div`
    width: 60px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: #666666;
    word-break: keep-all;
    white-space: break-spaces;
`

export default HorizontalCard;