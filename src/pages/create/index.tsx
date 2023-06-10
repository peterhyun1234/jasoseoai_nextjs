import { useEffect, useState } from 'react';
import Styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Inner_TopAppBar_Home from '@/components/appBar/Inner_TopAppBar_Home';
import LoadingPopup from '@/components/popup/LoadingPopup';

import temp_intro from '@/assets/images/temp_introduction.gif'

const Create = () => {
    const router = useRouter()

    const [step, setStep] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        console.log('location', location)
        console.log('router', router)
    }, [])

    return (
        <div style={{
            backgroundImage: `url(images/bg_common.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
        }}>
            {isLoading && <LoadingPopup loadingText='AI가 자기소개서를 생성중입니다.' />}
            {
                <Inner_TopAppBar_Home />
            }
            <WrapBox>
                {
                    step !== undefined && step !== null &&
                    <>
                    </>
                }
                {
                    step === 0 &&
                    <Box>
                        <IntroImgDiv>
                            <IntroImg src={temp_intro} alt="IntroImg" />
                        </IntroImgDiv>
                        <IntroBox alignDirection='left'>
                            <IntroTitleTag>자소서 생성</IntroTitleTag>
                            <IntroTitle>AI가 당신의 자소서를 완성해드립니다</IntroTitle>
                            <IntroDescription>회사에 대한 정보와 개인의 특성을 분석하여, AI가 최적화된 자기소개서를 작성합니다. 입력한 정보의 정확성과 자세함이 AI의 성능에 직결되니, 가능한 많이 공유해주시는 것이 좋습니다.</IntroDescription>
                            <IntroButton
                                onClick={() => {
                                    setStep(step + 1)
                                }
                                }
                            >
                                자기소개서 작성 시작
                            </IntroButton>
                        </IntroBox>
                    </Box>
                }
                {
                    step === 1 &&
                    <CommonBox>
                        <button onClick={() => {
                            setStep(step - 1)
                        }}>뒤로가기</button>
                        <h1>Page 2</h1>
                        <h1>회사 정보 입력</h1>
                        <h1>회사 이름 *</h1>
                        <h1>회사 설명 * (짧게)</h1>
                        <h1>지원하는 직무 내용 *(3줄까지 추가 가능)</h1>
                        <CommonButton
                            isReady={true}
                            onClick={() => {
                                setStep(step + 1)
                            }
                            }
                        >
                            다음
                        </CommonButton>
                    </CommonBox>
                }
                {
                    step === 2 &&
                    <CommonBox>
                        <button onClick={() => {
                            setStep(step - 1)
                        }}>회사 정보 수정</button>
                        <h1>Page 3</h1>
                        <h1>개인 정보 입력</h1>
                        <h1>이름 *</h1>
                        <h1>학력 *(~학교*, ~과 이거 추가할 수 있도록 ㄱㄱ)</h1>
                        <h1>경력사항</h1>
                        <h1>자격증</h1>
                        <h1>주요 프로젝트</h1>
                        <h1>성격의 장단점</h1>
                        <h1>기타: 본인의 전문 기술, 언어 능력, 컴퓨터 능력, 봉사 활동, 취미, 특별한 경험 등의 추가 정보를 고려할 수 있습니다.</h1>

                        <button onClick={() => {
                            setStep(step + 1)
                        }}>다음</button>
                    </CommonBox>
                }
                {
                    step === 3 &&
                    <CommonBox>
                        <button onClick={() => {
                            setStep(step - 1)
                        }}>개인 정보 수정</button>
                        <h1>Page 4</h1>
                        <h1>자기소개서 양식</h1>
                        <h1>자소서 항목(질문) - 글자 제한</h1>
                        <h1>자소서 항목(질문) - 글자 제한</h1>
                        <h1>자소서 항목(질문) - 글자 제한</h1>
                        <h1>자소서 항목(질문) - 글자 제한</h1>
                        <button onClick={() => {
                            setStep(step + 1)
                        }}>자기소개서 생성</button>
                    </CommonBox>
                }
                {
                    step === 4 &&
                    <CommonBox>
                        <button onClick={() => {
                            setStep(step - 1)
                        }}>자기소개서 양식 수정</button>
                        <h1>Page 5</h1>
                        <h1>생성된 자소서</h1>

                    </CommonBox>
                }
            </WrapBox>
        </div>
    )
};

const WrapBox = Styled.div`
    width: 100%;
    display: inline-block;
    max-width: 1000px;
    padding-top: calc(80px + 100px);
    padding-bottom: 100px;
    min-height: 100vh;
`
const Box = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 30px;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`
const IntroImgDiv = Styled.div`
    flex: 1;
    -webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px; 
    box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
    border-radius: 10px;
    @media (max-width: 768px) {
    width: 100%;
    }
`
const IntroImg = Styled(Image)`
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
`
const IntroBox = Styled.div<{ alignDirection: string }>`
    display: flex;
    flex-direction: column;
    justify-content: ${(props) => (props.alignDirection === 'left' ? 'flex-start' : 'flex-end')};
    align-items: ${(props) => (props.alignDirection === 'left' ? 'flex-start' : 'flex-end')};
    text-align: ${(props) => (props.alignDirection === 'left' ? 'left' : 'right')};
    flex: 1;
    padding: 1em;
    @media (max-width: 768px) {
        justify-content: center;
        align-items: center;
    }
`
const IntroTitleTag = Styled.div`
    color: #14c2ad;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
`
const IntroTitle = Styled.div`
    font-size: 40px;
    line-height: 40px;
    font-weight: bold;
    margin-bottom: 32px;
`
const IntroDescription = Styled.div`
    font-size: 20px;
    color: #4a4a4a;
    line-height: 28px;
    margin-bottom: 32px;
`
const IntroButton = Styled.button`
    height: 50px;
    border-radius: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #007BFF;
    color: #FFF;
    font-size: 16px;
    font-weight: 700;
    padding: 0 16px;
    transition: background-color .3s ease, color .3s ease;
    cursor: pointer;
    &:hover {
    color: #007BFF;
        background-color: #ffffff;
        border: 1px solid #007BFF;
    }
`
const CommonBox = Styled.div`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px; 
    box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
`
const CommonButton = Styled.div<{ isReady: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: ${props => props.isReady ? '#428d93' : '#ccc'};
    color: #fff;
    font-size: 17px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: ${props => props.isReady ? '#428d93' : '#ccc'};
        -webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px; 
        box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
    }
`

export default Create;