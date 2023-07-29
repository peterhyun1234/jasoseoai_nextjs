import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCopyToClipboard } from 'react-use';
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";

import axios from 'axios';

import Inner_TopAppBar_Home from '@/components/appBar/Inner_TopAppBar_Home';
import LoadingPopup from '@/components/popup/LoadingPopup';

import temp_intro from '@/assets/images/temp_introduction.gif'

import TextField from '@mui/material/TextField';

const resumePlaceholder = `1. 길동전자를 지원한 이유와 입사 후 회사에서 이루고 싶은 꿈을 기술하십시오. (500자 이내)
길동전자는 품질과 혁신에 대한 끊임없는 추구로 인해 업계에서 높은 존경을 받고 있는 기업입니다. 제 개인적으로는 이런 문화에서 깊은 인상을 받았고, 이는 제가 프론트엔드 개발자로서 능력을 최대한 발휘하고 싶어하는 바람과도 잘 어울립니다. 이전에 진행했던 프로젝트들에서 React, Vue.js, Node.js 등 다양한 기술을 사용하여 실질적인 비즈니스 로직을 구현하는 경험을 했습니다. 이런 경험들을 바탕으로 길동전자에서는 사용자 경험을 향상시키는 인터페이스를 개발하고, 그 이면에 있는 복잡한 기술적 문제를 해결하는 데 기여하고 싶습니다. 또한, 차후에는 제 팀을 이끌며, 길동전자의 혁신적인 기업 문화를 지속적으로 발전시키는 데 기여하고 싶습니다.

2. 본인의 성장과정을 간략히 기술하되 현재의 자신에게 가장 큰 영향을 끼친 사건, 인물 등을 포함하며 기술하시기 바랍니다. (500자 이내)
제 프론트엔드 개발자로서의 여정은 길동대학교에서 '당신을 위한 계산기'라는 프로젝트를 진행하면서 시작되었습니다. 이 프로젝트에서는 React와 GraphQL을 활용하여 개발하였고, 이를 통해 사용자 중심의 인터페이스 개발에 대한 이해를 높이고, 복잡한 문제를 해결하는 능력을 향상시킬 수 있었습니다. 이러한 경험은 저에게 개발자로서의 핵심 역량을 쌓을 수 있는 기회를 제공했고, 이는 나중에 (주)홍길동스토어와 (주)김철수스토어에서 인턴으로 일하면서도 큰 도움이 되었습니다. 특히, 길동 CMS 프로젝트에서는 Vue.js와 REST API를 활용한 실질적인 비즈니스 로직을 구현하는 데 성공했고, 이를 통해 프론트엔드 개발에 대한 전반적인 이해를 높였습니다. 마지막으로 길동코드 프로젝트에서는 Full-stack 개발에 참여하였고, 이를 통해 전체 웹 애플리케이션의 아키텍처를 이해하고 관리하는 능력을 향상시켰습니다. 이런 경험들은 저를 더 나은 개발자로 성장시키는 데 큰 도움을 주었습니다.
`

const Correct = () => {
  const { data: session } = useSession();
  const router = useRouter()

    const [user, setUser] = useState<any>(session?.user || null);

    const [step, setStep] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // step 1
    const [resume, setResume] = useState<string>('')

    // result
    const [correction, setCorrection] = useState<string>('')
    const [isCopied, copyToClipboard] = useCopyToClipboard()

    const handleCopyClick = () => {
        copyToClipboard(correction);
        if (isCopied) {
            alert('자기소개서 첨삭 결과가 복사되었습니다.')
        }
    }

    const handleResumeChange = (e: any) => {
        setResume(e.target.value)
    }

    const getCorrection = async (curResume: string) => {
        if (curResume === null || curResume === undefined || curResume.length < 30) return
        setIsLoading(true)

        //TODO: nestjs로 변경 + gpt 4로 변경
        try {
            const prompt = `아래 자기소개서를 첨삭해줘. 
            - 결과는 Markdown 형태로
            - 잘 쓴점, 개선할 점, 추천 문장 등 사용자가 원할만한 데이터를 줘
            - 충분히 잘썼다면 첨삭을 하지않아도 괜찮아
            - 자기소개서 내용: ${curResume}
          `;

            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [{ role: "system", content: prompt }],
                max_tokens: 2000,
                n: 1,
                stop: null,
                temperature: 0.3,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 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`,
                },
            });
            const recvCorrection = response.data.choices[0].message.content.trim();
            if (recvCorrection !== null && recvCorrection !== undefined && recvCorrection.length > 0) {
                setCorrection(recvCorrection)
            } else {
                alert('자기소개서 첨삭 결과를 불러오는데 실패했습니다.')
            }
        } catch (error) {
            console.error(error);
        }
        setStep(step + 1)
        setIsLoading(false)
    }

    useEffect(() => {
        const { query } = router;
        const stepValue = query.step;

        if (stepValue === '1') {
            setStep(1)
        } else {
            setStep(0)
        }
    }, [router])

    useEffect(() => {
      if (session !== undefined && session === null) {
        if (confirm('로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?')){
          router.push('/auth/signin');
        } else {
          router.push('/');
        }
      }
      if (!session) return;
      if (!session.user) return;
      setUser(session?.user);
    }, [session]);

    return (
        <div style={{
            backgroundImage: `url(images/bg_common.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
        }}>
            {isLoading && <LoadingPopup loadingText='AI가 자기소개서를 첨삭중입니다.(최대 2분)' />}
            {<Inner_TopAppBar_Home isSignIn={Boolean(user)} />}
            <WrapBox>
                {
                    step === 0 &&
                    <Box>
                        <IntroImgDiv>
                            <IntroImg src={temp_intro} alt="IntroImg" />
                        </IntroImgDiv>
                        <IntroBox alignDirection='left'>
                            <IntroTitleTag>자소서 첨삭</IntroTitleTag>
                            <IntroTitle>당신의 자소서를 자세하게 첨삭해드립니다</IntroTitle>
                            <IntroDescription>자소서 AI는 당신의 자소서에 대한 맞춤법 검사, 잘 쓴 점, 그리고 개선할 점을 상세하게 알려줍니다. 이를 통해 자신이 놓치기 쉬운 부분을 확인하고, 자기소개서를 보다 완성도 높게 다듬을 수 있습니다.</IntroDescription>
                            <IntroButton
                                onClick={() => {
                                    setStep(step + 1)
                                }
                                }
                            >
                                자기소개서 첨삭 시작
                            </IntroButton>
                        </IntroBox>
                    </Box>
                }
                {
                    step === 1 &&
                    <CommonBox>
                        <WritingBox>
                            <WritingBoxTitle>{"🧾 첨삭받을 자기소개서를 입력해주세요.(50자 이상)"}</WritingBoxTitle>
                            <ResumeDiv>
                                <TextField
                                    id="resume"
                                    fullWidth
                                    multiline
                                    placeholder={resumePlaceholder}
                                    rows={30}
                                    variant="outlined"
                                    value={resume}
                                    onChange={handleResumeChange}
                                />
                            </ResumeDiv>
                        </WritingBox>
                        <WritingBoxDivider />
                        <CommonButton
                            isReady={resume !== '' && resume.length >= 50 ? true : false}
                            onClick={() => {
                                if (resume !== '' && resume.length >= 50) {
                                    getCorrection(resume)
                                }
                            }
                            }
                        >
                            자기소개서 첨삭 시작
                        </CommonButton>
                    </CommonBox>
                }
                {
                    step === 2 &&
                    <CommonBox>
                        <CommonButton
                            isReady={true}
                            onClick={() => {
                                setStep(step - 1)
                            }
                            }
                        >
                            자소서 수정 후 다시 첨삭받기
                        </CommonButton>
                        <WritingBoxDivider />
                        {
                            correction !== '' &&
                            <WritingBox>
                                <WritingBoxTitle>{"🧾 "}<WritingBoxTitleHighlightSpan>{"자소서AI"}</WritingBoxTitleHighlightSpan>{"의 첨삭 결과입니다."}</WritingBoxTitle>
                                <CorrectionDiv>
                                    <ReactMarkdown
                                        // eslint-disable-next-line react/no-children-prop
                                        children={correction}
                                        // eslint-disable-next-line @next/next/no-img-element
                                        components={{ img: ({ node, ...props }) => <img style={{ maxWidth: '100%' }}{...props} alt="" /> }}
                                        remarkPlugins={[remarkGfm]}
                                    />
                                </CorrectionDiv>
                                <CopyButton onClick={handleCopyClick}>자소서 첨삭 내용 복사</CopyButton>
                            </WritingBox>
                        }
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
    background: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
    gap: 30px;
    padding: 20px;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`
const IntroImgDiv = Styled.div`
    flex: 1;
    align-items: center;
    display: flex;
    @media (max-width: 768px) {
        width: 100%;
        order: 1;
    }
`
const IntroImg = Styled(Image)`
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    -webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px; 
    box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
    border-radius: 10px;
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
        order: 2;
    }
`
const IntroTitleTag = Styled.div`
    color: #14c2ad;
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 20px;
`
const IntroTitle = Styled.div`
    font-size: 40px;
    line-height: 40px;
    font-weight: bold;
    margin-bottom: 32px;
    word-break: keep-all;
    white-space: break-spaces;
`
const IntroDescription = Styled.div`
    font-size: 20px;
    color: #4a4a4a;
    line-height: 28px;
    margin-bottom: 32px;
    word-break: keep-all;
    white-space: break-spaces;
`
const IntroButton = Styled.div`
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
    -webkit-box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 15px 3px; 
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 15px 3px;
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
const WritingDiv = Styled.div`
    margin-bottom: 30px;
`
const WritingTextDiv = Styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
`
const WritingText = Styled.div`
    font-size: 16px;
    color: #000;
    margin-bottom: 15px;
`
const WritingCompanyTextSpan = Styled.span`
    font-size: 17px;
    color: #428d93;
    font-weight: bold;
`
const WritingBox = Styled.div`
    width: 100%;
    text-align: left;
    padding: 20px;
`
const WritingBoxTitle = Styled.div`
    font-size: 23px;
    font-weight: bold;
    margin-bottom: 40px;
`
const WritingBoxTitleHighlightSpan = Styled.span`
    font-size: 25px;
    color: #428d93;
`
const WritingBoxSubtitle = Styled.div`
    font-size: 16px;
    color: #888;
    margin-bottom: 20px;
`
const WritingBoxHeaderDiv = Styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`
const WritingBoxHeader = Styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`
const WritingCompanyText = Styled.div`
    font-size: 22px;
    font-weight: bold;
    color: #428d93;
`
const WritingJobText = Styled.div`
    font-size: 18px;
    color: #428d93;
`
const ModifyingButtonDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    padding: 2px 5px;
    background-color: #fff;
    color: #999999;
    border: 1px solid #999999;
    font-size: 15px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        -webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
        box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
    }
`
const ModifyingIconDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    font-size: 20px;
    color: inherit;
`
const ModifyingText = Styled.div`
    font-size: 14px;
    color: inherit;
`
const WritingBoxDivider = Styled.div`
    width: 100%;
    height: 1px;
    background-color: #ccc;
`
const ResumeDiv = Styled.div`
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
`
const CopyButton = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #327bff;
    color: #fff;
    font-size: 17px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        -webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px; 
        box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
    }
`
const CorrectionDiv = Styled.div`
    overflow-x: hidden;
    width: 100%;
    padding: 20px 15px 80px;
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    line-height: 28px;
    text-align: left;
    tr {
        border-top: 1px solid #c6cbd1;
        background: #fff;
    }
    th, td {
        padding: 6px 13px;
        border: 1px solid #dfe2e5;
    }
    table tr:nth-child(2n) {
        background: #f6f8fa;
    }
    blockquote {
        padding: 0 1em;
        color: #79aafc;
        border-left: 0.25em solid #b1ccfc;
        margin-inline-start: 10px;
        margin-inline-end: 10px;
        p {
            color: inherit;
        }
    }
    p {
        margin-top: 15px;
        margin-bottom: 15px;
        color: #555555;
        word-break: keep-all;
    }
    strong {
        color: #555555;
    }
    a {
        color: #327Bff;
    }
    h1, h2, h3, h4, h5, h6 {
        color: #444444;
    }
    del {
        color: #666666;
    }
    menu, ol, ul {
        padding: 13px;
    }
    code {
        background: rgba( 57, 36, 255, 0.13 );
        padding: 2px;
        border-radius: 3px;
    }
`

export default Correct;