import React, { useState, useEffect } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

interface Props {
    closeEvent: any,
    allergyList: any,
    selectedAllergyList: any,
    setSelectedAllergyList: any,
}

const AllergySelectionDrawerList = ({ closeEvent, allergyList, selectedAllergyList, setSelectedAllergyList }: Props) => {

    const selectAllergyWith = (id: number) => {
        const curID = id
        let curList = selectedAllergyList

        if (isSelectedAllergy(curID))
            curList = selectedAllergyList.filter((v: any) => v !== curID)
        else
            curList.push(curID)

        setSelectedAllergyList([...curList])
    }

    const isSelectedAllergy = (id: number) => {
        let isSelected = false

        for (let i = 0; i < allergyList.length; i++)
            if (selectedAllergyList[i] === id)
                isSelected = true

        return isSelected
    }

    useEffect(() => {
    }, [])

    return (
        <>
            {
                <WrapBox>
                    <PopupDiscriptionDiv>
                        <Inner_TopAppBar_Popup>
                            <AppbarTitle>
                                <ProductNameTitle>{"알레르기 선택"}</ProductNameTitle>
                            </AppbarTitle>
                            <CompleteButton onClick={closeEvent("bottom", false)}>
                                완료
                            </CompleteButton>
                        </Inner_TopAppBar_Popup>
                    </PopupDiscriptionDiv>
                    <PopupContentListDiv>
                        <PopupContentDescriptionDiv>
                            식품 알레르기를 선택해주세요.
                        </PopupContentDescriptionDiv>
                        <AllergyListDiv>
                            {
                                allergyList.map((v: any) => {
                                    return (
                                       <AllergyDiv onClick={()=> {
                                            selectAllergyWith(v.allergyId)
                                       }}>
                                           <AllergyImageDiv imagePath={v.imagePath}>
                                               <AllergyImageSelectDiv isSelected={isSelectedAllergy(v.allergyId)}>
                                                    <CheckRoundedIconDiv>
                                                        <CheckRoundedIcon color="inherit" fontSize="inherit" />
                                                    </CheckRoundedIconDiv>
                                               </AllergyImageSelectDiv>
                                            </AllergyImageDiv>
                                            <AllergyName>{v.name}</AllergyName>
                                       </AllergyDiv>
                                    )
                                })
                            }
                        </AllergyListDiv>
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
const CompleteButton = Styled.div`
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #999999;
    margin-right: 20px;
`
const PopupContentListDiv = Styled.div`
    background-color: #ffffff;
    overflow: auto;
    z-index: 29;
`
const PopupContentDescriptionDiv = Styled.div`
    text-align: center;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #666666;
    margin-top: 20px;
    margin-bottom: 20px;
`
const AllergyListDiv = Styled.div`
    width: calc(100% - 40px);
    margin: 0px 20px;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
`
const AllergyDiv = Styled.div`
    width: 20%;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;
`
const AllergyImageDiv = Styled.div`
    width: 50px;
    border: dashed 1px #EBEBEB;
    border-radius: 50%;
    height: 50px;
    background-image: url(${(props: { imagePath: any; }) => (props.imagePath !== undefined ? props.imagePath : null)});
    background-size: cover;
    margin-bottom: 2px;
`
const AllergyImageSelectDiv = Styled.div`
    display: ${(props: { isSelected: any; }) => (props.isSelected === true ? "flex" : "none")};
    width: 50px;
    height: 50px;
    align-items: center;
    justify-content: center;
    background: rgba(100, 153, 100, .6);
    border-radius: 50%;
`
const CheckRoundedIconDiv = Styled.div`
    align-items: center;
    display: flex;
    font-size: 30px;
    height: 30px;
    color: #ffffff;
`
const AllergyName = Styled.div`
    text-align: center;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    letter-spacing: 0.5px;
`


export default AllergySelectionDrawerList;