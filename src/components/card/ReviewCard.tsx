import React, { useState, useEffect, useCallback } from 'react';

import { isMobile } from '@/utils/common'

import Styled from 'styled-components'
import Image from 'next/image'
import StarList from '@/components/list/StarList';

import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Props {
    review: any,
    userId?: number,
    setModifyingReview?: any,
    addFavoriteWith?: any,
    deleteFavoriteWith?: any,
}

const ReviewCard = ({ review, userId, setModifyingReview, addFavoriteWith, deleteFavoriteWith }: Props) => {
    return (
        <>
            {
                <EachReviewDiv>
                    {
                        review.user !== undefined &&
                        <ReviewProfileDiv>
                            <UserInfoDiv>
                                <ProfileImg 
                                    width={56}
                                    height={56}
                                    src={review.user.imagePath} 
                                    alt={review.user.imagePath} 
                                />
                                {
                                    review.user.nickname === '온라인상 리뷰' ?
                                    <UserInfoDetailDiv>
                                        <TempNicknameDiv>{'온라인상에서 가져온 리뷰'}</TempNicknameDiv>
                                        <StarList value={review.rating} width={16} />
                                    </UserInfoDetailDiv>
                                    :
                                    <UserInfoDetailDiv>
                                        <ReviewModifyDiv>
                                            <NickNameDiv>{review.user.nickname}</NickNameDiv>
                                        </ReviewModifyDiv>
                                        <UserInfoText>{review.user.ageRange + "/" + review.user.gender}</UserInfoText>
                                        <StarList value={review.rating} width={16} />
                                    </UserInfoDetailDiv>
                                }
                            </UserInfoDiv>
                            {
                                userId !== null && userId !== undefined && review.user.userId === userId &&
                                review.reviewId !== undefined &&
                                review.productSerialNumber !== undefined &&
                                <ModifyButtonDiv onClick={() => {
                                    if (setModifyingReview !== undefined) {
                                        setModifyingReview({
                                            reviewId: review.reviewId,
                                            productSerialNumber: review.productSerialNumber,
                                        })
                                    } else {
                                        alert('리뷰 수정은 "리뷰 전체 보기"에서 이용해주세요 :)')
                                    }
                                }}>
                                    <MoreVertIcon fontSize='inherit' color='inherit'/>
                                </ModifyButtonDiv>
                            }
                        </ReviewProfileDiv>
                    }
                    {
                        review.flavorStr !== undefined &&
                        review.capacityStr !== undefined &&
                        <SelectedProductDiv>
                            {"옵션: " + review.flavorStr + "ㆍ" + review.capacityStr}
                        </SelectedProductDiv>
                    }
                    {
                        review.reviewMapList !== undefined &&
                        review.reviewMapList.length > 1 &&
                        <ReviewTagListDiv>
                            <ReviewTagCarousel isMobile={isMobile()}>
                                {
                                    review.reviewMapList.map((v: any) => {
                                        return (
                                            <ReviewTagDiv>
                                                <ReviewTagKey>{v.reviewTagName}</ReviewTagKey>
                                                <ReviewTagValue>{v.reviewTagOptionStr}</ReviewTagValue>
                                            </ReviewTagDiv>
                                        )
                                    })
                                }
                            </ReviewTagCarousel>
                        </ReviewTagListDiv>
                    }
                    <ReviewContentListDiv>
                        {
                            review.goodComment !== undefined &&
                            review.goodComment.length > 0 &&
                            <ReviewContentDiv>
                                <ReviewContentKeyDiv color="rgba(50, 123, 255, 0.8)">
                                    <ReviewContentKeyIconDiv>
                                        <ThumbUpRoundedIcon color="inherit" fontSize="small" />
                                    </ReviewContentKeyIconDiv>
                                </ReviewContentKeyDiv>
                                <ReviewContentValueDiv>
                                    <ReviewContentValue>{review.goodComment}</ReviewContentValue>
                                </ReviewContentValueDiv>
                            </ReviewContentDiv>
                        }
                        {
                            review.badComment !== undefined &&
                            review.badComment.length > 0 &&
                            <ReviewContentDiv>
                                <ReviewContentKeyDiv color="rgba(130, 130, 130, 0.8)">
                                    <ReviewContentKeyIconDiv>
                                        <ThumbDownRoundedIcon color="inherit" fontSize="small" />
                                    </ReviewContentKeyIconDiv>
                                </ReviewContentKeyDiv>
                                <ReviewContentValueDiv>
                                    <ReviewContentValue>{review.badComment}</ReviewContentValue>
                                </ReviewContentValueDiv>
                            </ReviewContentDiv>
                        }

                        {
                            review.tipComment !== undefined &&
                            review.tipComment.length > 0 &&
                            <ReviewContentDiv>
                                <ReviewContentKeyDiv color="rgba(237, 138, 38, 0.8)">
                                    <ReviewContentKeyIconDiv>
                                        <RestaurantRoundedIcon color="inherit" fontSize="small" />
                                    </ReviewContentKeyIconDiv>
                                </ReviewContentKeyDiv>
                                <ReviewContentValueDiv>
                                    <ReviewContentValue>{review.tipComment}</ReviewContentValue>
                                </ReviewContentValueDiv>
                            </ReviewContentDiv>
                        }
                        <ReviewInfoDetailDiv>
                            <ReviewUpdatedTime>{review.createdAt}</ReviewUpdatedTime>
                            {
                                review.isFavorite === true ?
                                <ReviewLikeNumDiv
                                    onClick={(e) => {
                                        if (deleteFavoriteWith !== undefined) {
                                            deleteFavoriteWith(review.reviewId)
                                        }
                                    }}
                                >
                                    <ReviewLikeIconDiv
                                        color="#F2335C"
                                    >
                                        <FavoriteBorderRoundedIcon color="inherit" fontSize="inherit" />
                                    </ReviewLikeIconDiv>
                                    <LikeNum>{review.favoriteTotalCount}</LikeNum>
                                </ReviewLikeNumDiv>
                                :
                                <ReviewLikeNumDiv
                                    onClick={(e) => {
                                        if (addFavoriteWith !== undefined) {
                                            addFavoriteWith(review.reviewId)
                                        }
                                    }}
                                >
                                    <ReviewLikeIconDiv
                                        color="#999999"
                                    >
                                        <FavoriteBorderRoundedIcon color="inherit" fontSize="inherit" />
                                    </ReviewLikeIconDiv>
                                    <LikeNum>{review.favoriteTotalCount}</LikeNum>
                                </ReviewLikeNumDiv>
                            }
                        </ReviewInfoDetailDiv>
                    </ReviewContentListDiv>
                    <InnerDivider />
                </EachReviewDiv>
            }
        </>

    )
};

const EachReviewDiv = Styled.div`
    margin-top: 20px;
`
const ReviewProfileDiv = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`
const ModifyButtonDiv = Styled.div`
    font-size: 35px;
    color: #999999;
`
const UserInfoDiv = Styled.div`
    margin-bottom: 6px;
    width: 100%;
`
const UserInfoDetailDiv = Styled.div`
    text-align: left;
`
const SelectedProductDiv = Styled.div`
    text-align: left;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #000000;
    margin-bottom: 16px;
`
const ReviewTagListDiv = Styled.div`
    overflow: hidden;
`
const ReviewTagCarousel = Styled.div`
    overflow-x: scroll;
    white-space: nowrap;
    margin-bottom: 20px;
    ${(props: { isMobile: any; }) => (props.isMobile ? "-ms-overflow-style: none;scrollbar-width: none;&::-webkit-scrollbar {display: none;}" : "")}
`
const ReviewTagDiv = Styled.div`
    display: inline-flex;
    margin-right: 8px;
    width: fit-content;
    background: #EBEEFF;
    border: 1px solid #EBEEFF;
    border-radius: 8px;
    padding: 6px 12px;
`
const ReviewTagKey = Styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #666666;
`
const ReviewTagValue = Styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #000000;
    margin-left: 4px;
`
const ProfileImg = Styled(Image)`
    margin-top: 3px;
    float: left;
    width: 56px;
    height: 56px;
    border: solid 1px #ebebeb;
    display: inline-block;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`
const ReviewContentListDiv = Styled.div`
    margin-bottom: 20px;
    text-align: left;
`
const ReviewContentDiv = Styled.div`
    width: 100%;
    margin-bottom: 25px;
    display: flex;
    justify-content: flex-start;
`
const ReviewContentKeyDiv = Styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: start;
    margin-right: 10px;
    width: 20px;
    color: ${(props: { color?: string; }) => props.color !== undefined ? props.color : "#666666"};
`
const ReviewContentValueDiv = Styled.div`
    width: calc(100% - 30px);
`
const ReviewContentKeyIconDiv = Styled.div`
    color: inherit;
    font-size: 14px;
    height: 20px;
    margin-top: 2px;
`
const ReviewContentValue = Styled.p`
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.54;
    letter-spacing: -0.26px;
    color: #333333;
    word-break: keep-all;
    white-space: break-spaces;
`
const NickNameDiv = Styled.div`
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #000000;
    margin-bottom: 2px;
`
const ReviewModifyDiv = Styled.div`
    display: flex;
    justify-content: space-between;
`
const UserInfoText = Styled.div`
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #8d8d8d;
    margin-bottom: 2px;
`
const TempNicknameDiv = Styled.div`
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #8d8d8d;
    margin-top: 15px;
    margin-bottom: 2px;
`
const ReviewUpdatedTime = Styled.div`
    text-align: left;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #666666;
    margin-top: 6px;
`
const ReviewLikeNumDiv = Styled.div`
    display: flex;
    justify-content: center;
    padding: 6px 12px;
    background: #FFFFFF;
    border: 1px solid #666666;
    border-radius: 8px;
`
const ReviewLikeIconDiv = Styled.div`
    color: ${(props: { color?: any; }) => props.color == undefined ? "#999999" : props.color};
    height: 16px;
`
const LikeNum = Styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #666666;
    margin-left: 4px;
`
const ReviewInfoDetailDiv = Styled.div`
    display: flex;
    justify-content: space-between;
`
const InnerDivider = Styled.div`
    height: 0px;
    border-top: solid 1px #f5f5f5;
    background-color: #f5f5f5;
    margin-bottom: 8px;
`

export default ReviewCard;