import React, { useState, useEffect, useCallback } from 'react'
import Styled from 'styled-components';
import Image from 'next/image';
import { getToken } from '@/utils/token';

import Review_BottomButton from '@/components/button/Review_BottomButton';
import Collapse from '@mui/material/Collapse';

import RADIO_CHECKED from '@/assets/images/radio_checked.png';
import RADIO_UNCHECKED from '@/assets/images/radio_unchecked.png';
import BOX_CHECKED from '@/assets/images/box_checked.png';
import BOX_UNCHECKED from '@/assets/images/box_unchecked.png';

import ARROW_UP from '@/assets/images/dropdown_up.png';
import ARROW_DOWN from '@/assets/images/dropdown_down.png';

interface Props {
    onDrawerDown?: any,
    onClickApply?: any,
    selectedFilteringElements?: any,
    selectableFlavorList?: any,
    isSignIn?: boolean,
}

const ReviewDrawerList = ({ onDrawerDown, onClickApply, selectedFilteringElements, selectableFlavorList, isSignIn }: Props) => {

    const [isOrderFilterOpen, setIsOrderFilterOpen] = useState<any>(false);
    const [isFlavorFilterOpen, setIsFlavorFilterOpen] = useState<any>(false);
    const [isTempFilterOpen, setIsTempFilterOpen] = useState<any>(false);
    const [orderBy, setOrderBy] = useState<any>("LIKE");
    const [flavorIdList, setFlavorIdList] = useState<any>([]);
    const [isMine, setIsMine] = useState<any>(false);

    const resetFilteringElements = () => {
        setOrderBy("LIKE")
        setFlavorIdList([])
        setIsMine(false)
        setIsTempFilterOpen(!isTempFilterOpen)
    }

    const isSeletedFlavor = (flavorId?: number) => {
        if (flavorId === undefined || flavorId < 0) return
        if (flavorIdList === undefined || flavorIdList.length <= 0) return

        for (let i = 0; i < flavorIdList.length; i++) {
            if (flavorIdList[i] === flavorId) return true
        }
        return false
    }

    const controlFlavor = (flavorId?: any) => {
        if (flavorId === undefined || flavorId < 0) return
        let curList = flavorIdList
        if (isSeletedFlavor(flavorId)) {
            curList = flavorIdList.filter((v: any) => v !== flavorId)
        } else {
            curList.push(flavorId)
        }

        setFlavorIdList([...curList])
        setIsTempFilterOpen(!isTempFilterOpen)
    }

    useEffect(() => {
        setOrderBy(selectedFilteringElements.orderBy)
        setFlavorIdList(selectedFilteringElements.flavorIdList)
        setIsMine(selectedFilteringElements.isMine)
    }, [])

    return (
        <WrapBox>
            <PopupDiscriptionDiv>
                <Inner_TopAppBar_Popup>
                    <CancelBtnDiv>
                    </CancelBtnDiv>
                    <PopupTitleDiv>필터</PopupTitleDiv>
                    <AdditionalFuncDiv></AdditionalFuncDiv>
                </Inner_TopAppBar_Popup>
                <GrayLineWOMargin />
            </PopupDiscriptionDiv>
            <PopupContentDiv>
                {
                    isSignIn &&
                    <>
                        <FilterCategoryDiv
                            onClick={() => { setIsMine(!isMine) }}
                        >
                            <>내가 쓴 리뷰</>
                            <ElementCheckBtn
                                src={isMine === true ? BOX_CHECKED : BOX_UNCHECKED}
                                alt="ElementCheckBtn"
                            />
                        </FilterCategoryDiv>
                        <GrayLineWOMargin />
                    </>
                }
                <FilterCategoryDiv
                    onClick={() => { setIsOrderFilterOpen(!isOrderFilterOpen) }}
                >
                    <>정렬</>
                    <FilterOpenBtn src={isOrderFilterOpen ? ARROW_UP : ARROW_DOWN} alt={isOrderFilterOpen ? "ARROW_UP" : "ARROW_DOWN"} />
                </FilterCategoryDiv>
                <Collapse in={isOrderFilterOpen} timeout="auto" unmountOnExit>
                    <FilterElementsDiv>
                        <EachFilterElementDiv
                            onClick={() => { setOrderBy("LIKE") }}
                        >
                            <ElementCheckBtn
                                src={orderBy === "LIKE" ? RADIO_CHECKED : RADIO_UNCHECKED}
                                alt="ElementCheckBtn"
                            />
                            <ElementText
                                textColor={orderBy === "LIKE" ? "#327bff" : "#000"}
                            >도움순</ElementText>
                        </EachFilterElementDiv>
                        <EachFilterElementDiv
                            onClick={() => { setOrderBy("LATEST") }}
                        >
                            <ElementCheckBtn
                                src={orderBy === "LATEST" ? RADIO_CHECKED : RADIO_UNCHECKED}
                                alt="ElementCheckBtn"
                            />
                            <ElementText
                                textColor={orderBy === "LATEST" ? "#327bff" : "#000"}
                            >최신순</ElementText>
                        </EachFilterElementDiv>
                    </FilterElementsDiv>
                </Collapse>
                <GrayLineWOMargin />
                <FilterCategoryDiv
                    onClick={() => { setIsFlavorFilterOpen(!isFlavorFilterOpen) }}
                >
                    <>맛</>
                    <FilterOpenBtn src={isFlavorFilterOpen ? ARROW_UP : ARROW_DOWN} alt={isFlavorFilterOpen ? "ARROW_UP" : "ARROW_DOWN"} />
                </FilterCategoryDiv>
                <Collapse in={isFlavorFilterOpen} timeout="auto" unmountOnExit>
                    <FilterElementsDiv>
                        {
                            selectableFlavorList !== undefined && selectableFlavorList.length > 0 &&
                            <>
                                {
                                    selectableFlavorList.map((v: any, i: number) => {
                                        return (
                                            <EachFilterElementDiv
                                                onClick={() => { controlFlavor(v.flavorId) }}
                                            >
                                                <ElementCheckBtn
                                                    src={isSeletedFlavor(v.flavorId) ? BOX_CHECKED : BOX_UNCHECKED}
                                                    alt="ElementCheckBtn"
                                                />
                                                <ElementText
                                                    textColor={isSeletedFlavor(v.flavorId) ? "#327bff" : "#000"}
                                                >{v.name}</ElementText>
                                            </EachFilterElementDiv>
                                        )
                                    })
                                }
                            </>
                        }
                    </FilterElementsDiv>
                </Collapse>
                <GrayLineWOMargin />
                <TempFilterDiv>
                    <FilterCategoryDiv
                        onClick={() => { setIsTempFilterOpen(!isTempFilterOpen) }}
                    >
                        <>맛</>
                        <FilterOpenBtn src={isTempFilterOpen ? ARROW_UP : ARROW_DOWN} alt={isTempFilterOpen ? "ARROW_UP" : "ARROW_DOWN"} />
                    </FilterCategoryDiv>
                    <Collapse in={isTempFilterOpen} timeout="auto" unmountOnExit>
                        <FilterElementsDiv>
                            <h2>asdasd</h2>
                        </FilterElementsDiv>
                    </Collapse>
                    <GrayLineWOMargin />
                </TempFilterDiv>
            </PopupContentDiv>
            <Review_BottomButton
                title={'적용하기'}
                onClickApply={() => {
                    onClickApply({
                        orderBy: orderBy,
                        flavorIdList: flavorIdList,
                        isMine: isMine,
                    })
                    onDrawerDown()
                }}
                onClickReset={() => {
                    resetFilteringElements()
                }}
            />
        </WrapBox>
    )
}
const WrapBox = Styled.div`
    overflow: unset;
`
const TempFilterDiv = Styled.div`
    display: none;
`
const ElementCheckBtn = Styled(Image)`
    width: 16px;
    height: 16px;
`
const ElementText = Styled.div`
    margin-left: 12px;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${(props: { textColor?: any; }) => props.textColor !== undefined ? props.textColor : "#000"};
`
const EachFilterElementDiv = Styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 12px;
    margin-bottom: 12px;
`
const FilterElementsDiv = Styled.div`
    margin-top: 12px;
    margin-bottom: 12px;
    margin-left: 10px;
`
const FilterOpenBtn = Styled(Image)`
    width: 10px;
    height: 6px;
`
const FilterCategoryDiv = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    padding-bottom: 16px;
    font-size: 14px;
    font-weight: 550;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000;
`
const Inner_TopAppBar_Popup = Styled.div`
    padding-right: 10px;
    margin-bottom: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const PopupDiscriptionDiv = Styled.div`
    width: calc(100% - 40px);
    height: 37px;
    margin-left: 20px;
    margin-right: 20px;
    position: -webkit-sticky;
    position: sticky;
	top: 0px;
    left: 0px;
    background-color: #ffffff;
    margin-top: 14px;
    z-index: 30;
`
const PopupContentDiv = Styled.div`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #ffffff;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 61px;
    text-align: left;
    overflow: auto;
    z-index: 29;
`
const CancelBtnDiv = Styled.div`
    width: 10px;
    height: 10px;
`
const PopupTitleDiv = Styled.div`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    color: #000000;
`
const AdditionalFuncDiv = Styled.div`
`
const GrayLineWOMargin = Styled.div`
    height: 0px;
    border-top: solid 1px #f5f5f5;
    background-color: #f5f5f5;
`

export default ReviewDrawerList