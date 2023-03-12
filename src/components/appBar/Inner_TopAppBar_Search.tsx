import React, { useState, useEffect, useCallback } from 'react';
import Styled from 'styled-components'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { postRequestWithToken, getRequest, getRequestWithToken, signCheck } from '@/utils/APIRequest';
import { getToken } from '@/utils/token'

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

interface Props {
    onClickEvent?: any,
    insertedQuery?: any,
    from?: any,
}

const CustomSearchTextField = React.memo(styled(TextField)({
    height: "35px",
    marginTop: "2px",
    '& .MuiOutlinedInput-root': {
        color: "#666666",
        backgroundColor: "#F5F5F5",
        '& fieldset': {
            borderColor: '#F5F5F5',
        },
        '&:hover fieldset': {
            borderColor: '#F5F5F5',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#F5F5F5',
        },
    },
    "& .MuiFormLabel-root": {
        color: "#666666",
        fontSize: "15px",
    },
}));

const Inner_TopAppBar_Search = ({ onClickEvent, insertedQuery, from }: Props) => {
    const router = useRouter()

    const [placeholder, setPlaceholder] = useState<string>(from === 'AnalysisSearchEntry' ? '상품명을 입력해주세요.' : '검색어를 입력해주세요.');
    const [isSignIn, setIsSignIn] = useState<boolean>(false);
    const [dat, setDat] = useState<string>("");

    const [isMouseInTextField, setIsMouseInTextField] = useState<boolean>(false)

    const [searchingQuery, setSearchingQuery] = useState<string>('')
    const [relatedQueryList, setRelatedQueryList] = useState<any>([]);

    const handleSearchTextFieldKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            gotoSearchResultPageWith(searchingQuery)
        }
    }

    const handleSearchingQueryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSearchingQuery(event.target.value as string);
    }

    const getRelatedQueryList = async () => {
        if (searchingQuery === undefined || searchingQuery === '') return
        const res = await getRequest("/search/relatedQueryList?query=" + searchingQuery)
        if (res !== null) {
            if (res.status === 200) {
                setRelatedQueryList([...res.data])
            } else if (res.status === 204) {
                setRelatedQueryList([])
            }
        }
        return
    }

    const gotoSearchResultPageWith = (query: string) => {
        if (query.length < 2) {
            alert("검색어는 최소 두 자 이상 입력해주세요 :)")
            return
        }
        if (query.length > 20) {
            alert("검색어는 20자 이하로 입력해주세요 :)")
            return
        }
        //TODO: 로그인 한 유저에 대한 기능 필요
        if (!isSignIn) {
            let curSearchQuries = JSON.parse(localStorage.getItem('searchedQueryList') || '[]')
            curSearchQuries.unshift(query)
            curSearchQuries = curSearchQuries.filter((item: any, index: any) => curSearchQuries.indexOf(item) === index);
            localStorage.setItem('searchedQueryList', JSON.stringify(curSearchQuries))
        } else {
            let curSearchQuries = JSON.parse(localStorage.getItem('searchedQueryList') || '[]')
            curSearchQuries.unshift(query)
            curSearchQuries = curSearchQuries.filter((item: any, index: any) => curSearchQuries.indexOf(item) === index);
            localStorage.setItem('searchedQueryList', JSON.stringify(curSearchQuries))
        }


        const destURIPath = (from === 'AnalysisSearchEntry' ? '/analysisSearchResult' : '/searchResult') + '?query=' + query
        router.push(destURIPath)
    }

    const getEachRelatedQuery = (query: string) => {
        if (searchingQuery !== '' && query.includes(searchingQuery)) {
            const parts = query.split(new RegExp(`(${searchingQuery})`, 'gi'));

            return (
                <>
                    {parts.map((part, index) =>
                        part.toLowerCase() === searchingQuery.toLowerCase() ? (
                            <RelatedQuery key={index}>{part}</RelatedQuery>
                        ) : (
                            part
                        ),
                    )}
                </>
            );
        }

        return query;
    }

    const searchingQueryInit = () => {
        setSearchingQuery("")
    }

    useEffect(() => {
        if (isMouseInTextField == undefined || !isMouseInTextField) {
            document.body.style.overflow = "auto";
            return
        }
        if (searchingQuery == undefined || searchingQuery == "") {
            document.body.style.overflow = "auto";
            return
        }

        document.body.style.overflow = "hidden";

    }, [isMouseInTextField, searchingQuery])

    useEffect(() => {
        if (searchingQuery === undefined || searchingQuery === "") return
        getRelatedQueryList()
    }, [searchingQuery])

    useEffect(() => {
        if (insertedQuery !== undefined && insertedQuery !== "")
            setSearchingQuery(insertedQuery)

    }, [insertedQuery])

    useEffect(() => {
        searchingQueryInit()
        const curToken = getToken()
        if (curToken === '') {
            setIsSignIn(false)
            setDat("")
        }
        signCheck(curToken).then((isSignIn) => {
            if (isSignIn) {
                setIsSignIn(true)
                setDat(curToken)
            } else {
                setIsSignIn(false)
                setDat("")
            }
        });
    }, [])

    return (
        <>
            <WrapBox>
                <AppBarDetailDiv>
                    <AppBarLeftDiv>
                        <IconButton
                            size="medium"
                            edge="start"
                            color="inherit"
                            aria-label="ArrowBackIosRoundedIcon"
                            onClick={onClickEvent !== undefined ? onClickEvent : undefined}
                        >
                            <ArrowBackIosRoundedIcon />
                        </IconButton>
                    </AppBarLeftDiv>
                    <AppBarRightDiv>
                        <SearchDetailTextFieldDiv
                            onClick={() => setIsMouseInTextField(true)}
                        >
                            <SearchIconDiv>
                                <SearchRoundedIcon
                                    color="inherit"
                                    fontSize="inherit"
                                />
                            </SearchIconDiv>
                            <SearchTextFieldDiv>
                                <CustomSearchTextField
                                    id="searchingQuery"
                                    placeholder={placeholder}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    color="primary"
                                    value={searchingQuery}
                                    onChange={handleSearchingQueryChange}
                                    onKeyPress={handleSearchTextFieldKeyPress}
                                />
                            </SearchTextFieldDiv>
                            <CancelIconDiv>
                                {
                                    searchingQuery !== undefined && searchingQuery !== "" &&
                                    <CancelRoundedIcon
                                        color="inherit"
                                        fontSize="inherit"
                                        onClick={() => searchingQueryInit()}
                                    />
                                }
                            </CancelIconDiv>
                        </SearchDetailTextFieldDiv>
                    </AppBarRightDiv>
                </AppBarDetailDiv>
            </WrapBox>
            {
                isMouseInTextField && searchingQuery !== undefined && searchingQuery !== "" &&
                <FixedAreaDiv
                    onClick={() => setIsMouseInTextField(false)}
                >
                    <RelatedSearchDiv>
                        <RelatedSearchBoxDiv>
                            {
                                relatedQueryList.map((v: { query: string; }) => {
                                    return (
                                        // eslint-disable-next-line react/jsx-key
                                        <SearchQueryDiv onClick={() => gotoSearchResultPageWith(v.query)}>
                                            <RelatedSearchIconDiv>
                                                <SearchRoundedIcon
                                                    color="inherit"
                                                    fontSize="inherit"
                                                />
                                            </RelatedSearchIconDiv>
                                            <QueryDiv>
                                                {getEachRelatedQuery(v.query)}
                                            </QueryDiv>
                                        </SearchQueryDiv>
                                    )
                                })
                            }
                        </RelatedSearchBoxDiv>
                    </RelatedSearchDiv>
                </FixedAreaDiv>
            }
        </>
    )
};

const WrapBox = Styled.div`
    background-color: #ffffff;
    height: 60px;
    display: table;
    width: 100%;
    position: fixed;
    overflow: hidden;
    z-index: 5;
`
const AppBarDetailDiv = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 32px);
    margin-top: 9px;
    margin-right: 16px;
    margin-left: 16px;
`
const AppBarLeftDiv = Styled.div`
    display: flex;
    justify-content: flex-start;
    width: 50px;
`
const AppBarDivider = Styled.div`
    width: 10px;
`
const AppBarRightDiv = Styled.div`
    display: flex;
    justify-content: flex-end;
    width: calc(100% - 50px);
    margin-top: 3px;
`
const AppBarCenterDiv = Styled.div`
    display: flex;
    justify-content: center;
`
const SearchDetailTextFieldDiv = Styled.div`
    display: flex;
    justify-content: space-between;
    width: calc(100% - 20px);
    background-color: #F5F5F5;
    color: #666666;
    padding-right: 10px;
    padding-left: 10px;
    border-radius: 12px;
`
const SearchIconDiv = Styled.div`
    background-color: inherit;
    color: inherit;
    font-size: 23px;
    margin-top: 9px;
    width: 10%;
`
const SearchTextFieldDiv = Styled.div`
    width: 80%;
`
const CancelIconDiv = Styled.div`
    background-color: inherit;
    color: inherit;
    font-size: 23px;
    margin-top: 9px;
    width: 10%;
`
const FixedAreaDiv = Styled.div`
    z-index: 99;
    position: fixed;
    width: 100%;
    height: 100%;
    min-width: 100vw;
    min-height: 100vh;
    top: 59px;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
`
const RelatedSearchDiv = Styled.div`
    height: 100%;
    overflow: auto;
`
const RelatedSearchBoxDiv = Styled.div`
    background-color: white;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
`
const SearchQueryDiv = Styled.div`
    color: #000000;
    padding-top: 15px;
    padding-bottom: 15px;
    text-align: left;
    white-space: nowrap;
    display: flex;
    justify-content: flex-start;
`
const QueryDiv = Styled.div`
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.29;
    letter-spacing: normal;
    margin-left: 5px;
    margin-top: 1px;
`
const RelatedSearchIconDiv = Styled.div`
    color: #C4C4C4;
    font-size: 21px;
`
const RelatedQuery = Styled.mark`
    background-color: transparent;
    color: #327bff;
`

export default Inner_TopAppBar_Search;
