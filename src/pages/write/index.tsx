import { SetStateAction, useEffect, useRef, useState } from 'react';
import Styled, { keyframes, css } from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import axios from 'axios';

import Inner_TopAppBar_Home from '@/components/appBar/Inner_TopAppBar_Home';

import temp_intro from '@/assets/images/temp_introduction.gif';

import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';

import FolderCopyRoundedIcon from '@mui/icons-material/FolderCopyRounded';
import FiberNewRoundedIcon from '@mui/icons-material/FiberNewRounded';
import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';
import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

interface Tag {
  id: string;
  title: string;
}

interface Props {
  tags: Tag[];
}

const Write = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const timerRef = useRef<any>(null);
  const progressRef = useRef<any>(() => {});

  const [user, setUser] = useState<any>(session?.user || null);

  const [step, setStep] = useState<number>(0);

  // step 1
  const [company, setCompany] = useState<string>('');
  const [job, setJob] = useState<string>('');
  const [isWritingReady, setIsWritingReady] = useState<boolean>(false);
  const [isMaxCharReady, setIsMaxCharReady] = useState<boolean>(false);
  const [maxCharacterNum, setMaxCharacterNum] = useState<number>(500);
  const [characterPercentage, setCharacterPercentage] = useState<number>(0);

  const [writingResumeList, setWritingResumeList] = useState<any>([
    {
      question: '',
      answer: '',
    },
  ]);
  const [writingResumeListIndex, setWritingResumeListIndex] =
    useState<number>(0);

  const [isAIReady, setIsAIReady] = useState<boolean>(true);

  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const handleCompanyChange = (e: any) => {
    setCompany(e.target.value);
  };

  const handleJobChange = (e: any) => {
    setJob(e.target.value);
  };

  const handleMaxCharacterNumChange = (e: any) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value > 0) {
      setMaxCharacterNum(value);
      setCharacterPercentage(
        Math.floor(
          (writingResumeList[writingResumeListIndex].answer.length / value) *
            100,
        ),
      );
    }
  };

  const handleResumeQuestionChange = (e: any) => {
    const newWritingResumeList = writingResumeList.map(
      (item: any, index: number) => {
        if (index === writingResumeListIndex) {
          return {
            ...item,
            question: e.target.value,
          };
        }
        return item;
      },
    );
    setWritingResumeList(newWritingResumeList);
  };

  const handleWritingResumeChange = (e: any) => {
    const newWritingResumeList = writingResumeList.map(
      (item: any, index: number) => {
        if (index === writingResumeListIndex) {
          return {
            ...item,
            answer: e.target.value,
          };
        }
        return item;
      },
    );
    setWritingResumeList(newWritingResumeList);
    setCharacterPercentage(
      Math.floor((e.target.value.length / maxCharacterNum) * 100),
    );
  };

  const generateNextSentence = async (currentResume: any) => {
    const { question, answer } = currentResume;

    if (company === null || company === undefined || company.length < 1) return;
    if (job === null || job === undefined || job.length < 1) return;
    if (question === null || question === undefined || question.length < 3)
      return;
    if (answer === null || answer === undefined || answer.length < 10) return;

    setLoading(true);
    try {
      const prompt = `자기소개서 내용에서 문장이 끝났다면 다음 문장을 추천하고, 문장이 끝나지 않았다면 문장을 완성할 이어지는 문장을 추천해줘. 아래 내용을 참고해줘.
            - 문장만 추천해주고 너의 말은 제외해줘.
            - 회사: ${company}
            - 직무: ${job}
            - 자기소개서 항목(질문): ${question}
            - 자기소개서 내용: ${answer}
          `;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'system', content: prompt }],
          max_tokens: 2000,
          n: 1,
          stop: null,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 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`,
          },
        },
      );
      let recommendation = response.data.choices[0].message.content.trim();
      const removingWords = [
        '다음 문장 :',
        '답 :',
        '답:',
        '답: ',
        '답 : ',
        '답:',
        '문장 추천:',
        '문장 추천 :',
        '문장 추천 : ',
      ];
      removingWords.forEach((word) => {
        recommendation = recommendation.replace(word, '').trim();
      });
      if (
        recommendation !== null &&
        recommendation !== undefined &&
        recommendation.length > 0
      ) {
        setRecommendation(recommendation);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAIReady === false) return;
    const curResume = writingResumeList[writingResumeListIndex];
    if (curResume === null || curResume === undefined || curResume.length < 10)
      return;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setRecommendation('');
      generateNextSentence(curResume);
    }, 2000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [writingResumeList]);

  useEffect(() => {
    const { query } = router;
    const stepValue = query.step;

    if (stepValue === '1') {
      setStep(1);
    } else {
      setStep(0);
    }
  }, [router]);

  useEffect(() => {
    if (session !== undefined && session === null) {
      if (
        confirm(
          '로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?',
        )
      ) {
        router.push('/auth/signin');
      } else {
        router.push('/');
      }
    }
    if (!session) return;
    if (!session.user) return;
    setUser(session?.user);
  }, [session]);

  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(images/bg_common.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
      }}
    >
      {<Inner_TopAppBar_Home isSignIn={Boolean(user)} />}
      <WrapBox>
        {step === 0 && (
          <Box>
            <IntroBox alignDirection="left">
              <IntroTitleTag>자소서 문장 추천</IntroTitleTag>
              <IntroTitle>자소서의 다음 문장을 추천해드립니다</IntroTitle>
              <IntroDescription>
                작성 중인 자기소개서와 제공하신 회사 정보, 개인 정보를 기반으로,
                AI가 다음 문장을 창의적이면서도 효과적으로 추천해드립니다.
                당신의 자소서를 한 단계 업그레이드 시켜보세요.
              </IntroDescription>
              <IntroButton
                onClick={() => {
                  setStep(step + 1);
                }}
              >
                자기소개서 작성 시작
              </IntroButton>
            </IntroBox>
            <IntroImgDiv>
              <IntroImg src={temp_intro} alt="IntroImg" />
            </IntroImgDiv>
          </Box>
        )}
        {step === 1 && (
          <>
            <WritingResumeFunctionBox>
              <FunctionButtonDiv onClick={() => {}}>
                <FunctionIconDiv>
                  <FolderCopyRoundedIcon color="inherit" fontSize="inherit" />
                </FunctionIconDiv>
                <FunctionText>자소서 목록</FunctionText>
              </FunctionButtonDiv>
              <FunctionButtonDiv onClick={() => {}}>
                <FunctionIconDiv>
                  <FiberNewRoundedIcon color="inherit" fontSize="inherit" />
                </FunctionIconDiv>
                <FunctionText>새 자소서</FunctionText>
              </FunctionButtonDiv>
              <FunctionButtonDiv onClick={() => {}}>
                <FunctionIconDiv>
                  <ImportExportRoundedIcon color="inherit" fontSize="inherit" />
                </FunctionIconDiv>
                <FunctionText>내보내기</FunctionText>
              </FunctionButtonDiv>
            </WritingResumeFunctionBox>
            <WritingResumeBox>
              {isWritingReady === false ? (
                <WritingCompanyBox
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (company.length > 0 && job.length > 0) {
                        setIsWritingReady(true);
                      }
                    }
                  }}
                >
                  <WritingCompanyDiv>
                    <WritingCompanyText>
                      {'지원하는 '}
                      <WritingCompanyTextSpan>
                        {'회사의 이름'}
                      </WritingCompanyTextSpan>
                      {'을 입력해주세요.'}
                    </WritingCompanyText>
                    <TextField
                      id="company"
                      fullWidth
                      variant="outlined"
                      placeholder="현대자동차"
                      value={company}
                      onChange={handleCompanyChange}
                    />
                  </WritingCompanyDiv>
                  <WritingCompanyDiv>
                    <WritingCompanyText>
                      {'지원하는 '}
                      <WritingCompanyTextSpan>
                        {'직무의 이름'}
                      </WritingCompanyTextSpan>
                      {'을 입력해주세요.'}
                    </WritingCompanyText>
                    <TextField
                      id="job"
                      fullWidth
                      variant="outlined"
                      placeholder="글로벌 상용차 신사업 프로젝트 기획/운영"
                      value={job}
                      onChange={handleJobChange}
                    />
                  </WritingCompanyDiv>
                  <CommonButton
                    isReady={company !== '' && job !== '' ? true : false}
                    onClick={() => {
                      if (company !== '' && job !== '') {
                        setIsWritingReady(true);
                      }
                    }}
                  >
                    자기소개서 작성 시작
                  </CommonButton>
                </WritingCompanyBox>
              ) : (
                <>
                  {company !== null &&
                    company !== undefined &&
                    company !== '' &&
                    job !== null &&
                    job !== undefined &&
                    job !== '' && (
                      <>
                        <WritingCompanyBoxHeaderDiv>
                          <WritingResumeCompanyBox>
                            <WritingResumeCompanyText>
                              {company}
                            </WritingResumeCompanyText>
                            <WritingResumeJobText>{job}</WritingResumeJobText>
                            <ModifyingCompanyButtonDiv
                              onClick={() => {
                                setIsWritingReady(false);
                              }}
                            >
                              <ModifyingCompanyIconDiv>
                                <EditRoundedIcon
                                  color="inherit"
                                  fontSize="inherit"
                                />
                              </ModifyingCompanyIconDiv>
                              <ModifyingCompanyText>수정</ModifyingCompanyText>
                            </ModifyingCompanyButtonDiv>
                          </WritingResumeCompanyBox>
                          <WritingResumeSaveButtonDiv>
                            <SaveIconDiv>
                              <SaveAltRoundedIcon
                                color="inherit"
                                fontSize="inherit"
                              />
                            </SaveIconDiv>
                            <WritingResumeSaveButtonText>
                              저장하기
                            </WritingResumeSaveButtonText>
                          </WritingResumeSaveButtonDiv>
                        </WritingCompanyBoxHeaderDiv>
                        <WritingResumeBoxDivider />
                        <WritingResumeTextFieldsBox>
                          <ResumePageDiv>
                            {writingResumeList.map(
                              (item: any, index: number) => {
                                return (
                                  <ResumePageButtonDiv
                                    key={index}
                                    isSelected={
                                      writingResumeListIndex === index
                                        ? true
                                        : false
                                    }
                                    onClick={() => {
                                      setWritingResumeListIndex(index);
                                    }}
                                  >
                                    <ResumePageButtonText>
                                      {index + 1}
                                    </ResumePageButtonText>
                                  </ResumePageButtonDiv>
                                );
                              },
                            )}
                            <ResumePageButtonDiv
                              isSelected={false}
                              onClick={() => {
                                const newWritingResumeList = writingResumeList
                                  ? writingResumeList
                                  : [];
                                newWritingResumeList.push({
                                  question: '',
                                  answer: '',
                                });
                                setWritingResumeList(newWritingResumeList);
                                setWritingResumeListIndex(
                                  newWritingResumeList.length - 1,
                                );
                              }}
                            >
                              <ResumePageButtonText>+</ResumePageButtonText>
                            </ResumePageButtonDiv>
                          </ResumePageDiv>
                          <TextField
                            id="resumeQuestion"
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="자기소개서 항목 혹은 질문을 입력하세요."
                            value={
                              writingResumeList[writingResumeListIndex]
                                ?.question
                            }
                            variant="standard"
                            onChange={handleResumeQuestionChange}
                            InputProps={{
                              disableUnderline: true,
                            }}
                          />
                        </WritingResumeTextFieldsBox>
                        <WritingResumeBoxDivider />
                        <WritingResumeTextFieldsBox>
                          <TextField
                            id="writingResume"
                            fullWidth
                            multiline
                            rows={13}
                            placeholder="자기소개서 내용을 입력하세요."
                            variant="standard"
                            value={
                              writingResumeList[writingResumeListIndex]?.answer
                            }
                            onChange={handleWritingResumeChange}
                            onKeyDown={(e) => {
                              if (e.key === 'Tab') {
                                e.preventDefault();
                                if (
                                  recommendation !== null &&
                                  recommendation !== undefined &&
                                  recommendation.length > 0
                                ) {
                                  setWritingResumeList(
                                    writingResumeList.map(
                                      (item: any, index: number) => {
                                        if (index === writingResumeListIndex) {
                                          return {
                                            ...item,
                                            answer:
                                              item.answer + recommendation,
                                          };
                                        } else {
                                          return item;
                                        }
                                      },
                                    ),
                                  );
                                }
                              }
                            }}
                            InputProps={{
                              disableUnderline: true,
                            }}
                          />
                          <RecommendationDiv isAIReady={isAIReady}>
                            {isAIReady === true && (
                              <RecommendationText isLoading={loading}>
                                {loading === true && (
                                  <RecommendationLoadingDiv>
                                    <RecommendationLoadingIconDiv>
                                      <LinearProgress
                                        variant="buffer"
                                        value={progress}
                                        valueBuffer={buffer}
                                        color="success"
                                      />
                                    </RecommendationLoadingIconDiv>
                                    <RecommendationLoadingText>
                                      적절한 문장을 AI 작성 중입니다
                                    </RecommendationLoadingText>
                                  </RecommendationLoadingDiv>
                                )}
                                <RecommendationGuidanceText isLoading={loading}>
                                  {`추천된 답변을 사용하려면 Tab키를 눌러주세요.`}
                                </RecommendationGuidanceText>
                                {recommendation}
                              </RecommendationText>
                            )}
                            <SwitchContainer
                              onClick={() => {
                                setIsAIReady(!isAIReady);
                              }}
                            >
                              <SwitchSlider isOn={isAIReady} />
                              <SwitchText isOn={isAIReady}>
                                {isAIReady ? 'AI 작성 OFF' : 'AI 작성 ON'}
                              </SwitchText>
                            </SwitchContainer>
                          </RecommendationDiv>
                        </WritingResumeTextFieldsBox>
                        <WritingResumeBoxDivider />
                        <WritingResumeCharacterNumBox>
                          <WritingResumeCharacterNumDiv>
                            <WritingResumeCharacterNumText
                              isExceed={
                                characterPercentage >= 100 ? true : false
                              }
                            >
                              {
                                writingResumeList[writingResumeListIndex]
                                  ?.answer.length
                              }
                            </WritingResumeCharacterNumText>
                            <WritingResumeCharacterNumText
                              isExceed={
                                characterPercentage >= 100 ? true : false
                              }
                            >
                              {' / '}
                            </WritingResumeCharacterNumText>
                            {isMaxCharReady === false ? (
                              <WritingResumeCharacterNumText
                                isExceed={
                                  characterPercentage >= 100 ? true : false
                                }
                              >
                                {maxCharacterNum}
                              </WritingResumeCharacterNumText>
                            ) : (
                              <CharacterNumTextFieldDiv>
                                <TextField
                                  variant="outlined"
                                  label="최대 글자 수"
                                  fullWidth
                                  value={maxCharacterNum}
                                  onChange={handleMaxCharacterNumChange}
                                />
                              </CharacterNumTextFieldDiv>
                            )}
                            <WritingResumeCharacterNumText
                              isExceed={
                                characterPercentage >= 100 ? true : false
                              }
                            >
                              자
                            </WritingResumeCharacterNumText>
                            <WritingResumeCharacterNumSettingButtonDiv
                              onClick={() => {
                                setIsMaxCharReady(!isMaxCharReady);
                              }}
                            >
                              {'글자 수 설정'}
                            </WritingResumeCharacterNumSettingButtonDiv>
                          </WritingResumeCharacterNumDiv>
                          <WritingResumeProgressBarDiv>
                            <ProgressContainer>
                              <ProgressBar
                                percentage={
                                  characterPercentage > 100
                                    ? 100
                                    : characterPercentage
                                }
                              />
                            </ProgressContainer>
                          </WritingResumeProgressBarDiv>
                        </WritingResumeCharacterNumBox>
                      </>
                    )}
                </>
              )}
            </WritingResumeBox>
          </>
        )}
      </WrapBox>
    </div>
  );
};

const WrapBox = Styled.div`
    width: 100%;
    display: inline-block;
    max-width: 1000px;
    padding-top: calc(80px + 100px);
    padding-bottom: 100px;
    min-height: 100vh;
`;
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
`;
const IntroImgDiv = Styled.div`
    flex: 1;
    align-items: center;
    display: flex;
    @media (max-width: 768px) {
        width: 100%;
        order: 1;
    }
`;
const IntroImg = Styled(Image)`
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    -webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px; 
    box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
    border-radius: 10px;
`;
const IntroBox = Styled.div<{ alignDirection: string }>`
    display: flex;
    flex-direction: column;
    justify-content: ${(props) =>
      props.alignDirection === 'left' ? 'flex-start' : 'flex-end'};
    align-items: ${(props) =>
      props.alignDirection === 'left' ? 'flex-start' : 'flex-end'};
    text-align: ${(props) =>
      props.alignDirection === 'left' ? 'left' : 'right'};
    flex: 1;
    padding: 1em;
    @media (max-width: 768px) {
        justify-content: center;
        align-items: center;
        order: 2;
    }
`;
const IntroTitleTag = Styled.div`
    color: #14c2ad;
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 20px;
`;
const IntroTitle = Styled.div`
    font-size: 40px;
    line-height: 40px;
    font-weight: bold;
    margin-bottom: 32px;
    word-break: keep-all;
    white-space: break-spaces;
`;
const IntroDescription = Styled.div`
    font-size: 20px;
    color: #4a4a4a;
    line-height: 28px;
    margin-bottom: 32px;
    word-break: keep-all;
    white-space: break-spaces;
`;
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
`;
const WritingResumeFunctionBox = Styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: fit-content;
    background-color: #fff;
    border-radius: 10px 10px 0px 0px;
    -webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px; 
    box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
    padding: 10px;
    margin-left: 7px;
`;
const FunctionButtonDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100px;
    padding: 10px;
    border-radius: 10px;
    margin-right: 20px;
    color: #666666;
    cursor: pointer;
    &:hover {
        background-color: #428d93;
        color: #fff;
        -webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px; 
        box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
    }
`;
const FunctionIconDiv = Styled.div`
    width: 25px;
    font-size: 25px;
    color: inherit;
`;
const FunctionText = Styled.div`
    font-size: 14px;
    text-align: center;
    color: inherit;
`;
const WritingResumeBox = Styled.div`
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
`;
const WritingCompanyBox = Styled.div`
    width: 100%;
    text-align: left;
    padding: 20px;
`;
const WritingCompanyDiv = Styled.div`
    margin-bottom: 30px;
`;
const WritingCompanyText = Styled.div`
    font-size: 16px;
    color: #000;
    margin-bottom: 15px;
`;
const WritingCompanyTextSpan = Styled.span`
    font-size: 17px;
    color: #428d93;
    font-weight: bold;
`;
const CommonButton = Styled.div<{ isReady: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: ${(props) => (props.isReady ? '#428d93' : '#ccc')};
    color: #fff;
    font-size: 17px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => (props.isReady ? '#428d93' : '#ccc')};
        -webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px; 
        box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
    }
`;
const WritingCompanyBoxHeaderDiv = Styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;
const WritingResumeCompanyBox = Styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`;
const WritingResumeCompanyText = Styled.div`
    font-size: 22px;
    font-weight: bold;
    color: #428d93;
`;
const WritingResumeJobText = Styled.div`
    font-size: 18px;
    color: #428d93;
`;
const ModifyingCompanyButtonDiv = Styled.div`
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
`;
const ModifyingCompanyIconDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    font-size: 20px;
    color: inherit;
`;
const ModifyingCompanyText = Styled.div`
    font-size: 14px;
    color: inherit;
`;
const WritingResumeSaveButtonDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 130px;
    padding: 10px;
    background-color: #428d93;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        -webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
        box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
    }
`;
const SaveIconDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    font-size: 20px;
    color: inherit;
`;
const WritingResumeSaveButtonText = Styled.div`
    width: fit-content;
    font-size: 15px;
    color: inherit;
`;
const WritingResumeBoxDivider = Styled.div`
    width: 100%;
    height: 1px;
    background-color: #ccc;
`;
const WritingResumeTextFieldsBox = Styled.div`
    position: relative;
    width: 100%;
    padding: 0px 20px 20px 20px;
`;
const WritingResumeCharacterNumBox = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0px 20px 20px 20px;
`;
const borderAnimation = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;
const AISwitchBtnDiv = Styled.div<{ isAIReady: boolean }>`
    position: absolute;
    bottom: -20px;
    right: -25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: fit-content;
    padding: 10px;
    background-color: ${(props) => (props.isAIReady ? '#428d93' : '#ccc')};
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        -webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
        box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
    }
`;
const AISwitchText = Styled.div`
    font-size: 13px;
    color: #000;
`;
const AISwitchIconDiv = Styled.div`
    width: 20px;
    font-size: 20px;
    color: inherit;
`;
const switchTransition = css`
  transition: all 0.3s ease-in-out;
`;
const SwitchContainer = Styled.div`
    position: absolute;
    bottom: -7px;
    right: -25px;
  display: inline-block;
  width: 120px;
  height: 34px;
  cursor: pointer;
`;
const SwitchSlider = Styled.div<{ isOn: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) =>
    !props.isOn
      ? 'linear-gradient(65deg, rgba(51,221,138,1) 0%, rgba(39,184,125,1) 29%, rgba(25,153,149,1) 70%, rgba(2,129,154,1) 100%)'
      : 'linear-gradient(65deg, rgba(237,12,118,1) 0%, rgba(246,55,61,1) 50%, rgba(255,103,1,1) 100%)'};
  border-radius: 34px;
    -webkit-box-shadow: -1px 1px 6px 1px rgba(0,0,0,0.37); 
    box-shadow: -1px 1px 6px 1px rgba(0,0,0,0.37);
  ${switchTransition}

  &:before {
    content: "";
    position: absolute;
    height: 26px;
    width: 26px;
    left: ${(props) => (!props.isOn ? 'calc(100% - 28px)' : '4px')};
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    ${switchTransition}
  }
`;
const SwitchText = Styled.span<{ isOn: boolean }>`
  position: absolute;
  color: white;
  font-size: 14px;
  font-weight: bold;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => (!props.isOn ? '10px' : 'calc(100% - 80px)')};
  ${switchTransition}
`;
const RecommendationDiv = Styled.div<{ isAIReady: boolean }>`
    position: relative;
    background-color: #fff;
    ${(props) => (props.isAIReady ? 'border-top: 1px dashed #d6d6d6;' : '')}
    width: 100%;
    padding: 10px;
`;
const RecommendationText = Styled.div<{ isLoading: boolean }>`
    background-color: #fff;
    border-radius: 5px;
    text-align: left;
    height: 100px;
    padding: 10px;
    overflow: scroll;
    font-size: 15px;
    color: #666;
    -webkit-box-shadow: -1px 1px 6px 1px rgba(0,0,0,0.37); 
    box-shadow: -1px 1px 6px 1px rgba(0,0,0,0.37);
    transition: all 0.3s ease-in-out;

    ${(props) =>
      props.isLoading &&
      css`
        background-image: linear-gradient(
          65deg,
          rgba(51, 221, 138, 1) 0%,
          rgba(39, 184, 125, 1) 29%,
          rgba(25, 153, 149, 1) 70%,
          rgba(2, 129, 154, 1) 100%
        );
        background-size: 200% 200%;
        animation: ${borderAnimation} 3s linear infinite;
      `}
`;
const RecommendationLoadingDiv = Styled.div`
    width: 100%;
    text-align: center;
`;
const RecommendationLoadingIconDiv = Styled.div`
    width: 100%;
    padding-bottom: 30px;
`;
const RecommendationLoadingText = Styled.div`
    font-size: 18px;
    font-weight: bold;
    color: #fff;
`;
const RecommendationGuidanceText = Styled.div<{ isLoading: boolean }>`
    font-size: 14px;
    font-weight: bold;
    color: #428d93;
    margin-bottom: 15px;
    ${(props) =>
      props.isLoading &&
      css`
        display: none;
      `}
`;
const ResumePageDiv = Styled.div`
    position: absolute;
    top: -10px;
    left: -45px;
`;
const ResumePageButtonDiv = Styled.div<{ isSelected: boolean }>`
    ${(props) =>
      props.isSelected
        ? '-webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px; box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;'
        : ''}
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.isSelected ? '#428d93' : '#ccc')};
    padding: 7px 20px;
    margin-bottom: 3px;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        -webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
        box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 15px 3px;
    }
`;
const ResumePageButtonText = Styled.div`
    font-size: 15px;
    color: inherit;
`;
const WritingResumeCharacterNumDiv = Styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
`;
const WritingResumeCharacterNumText = Styled.div<{ isExceed: boolean }>`
    ${(props) =>
      props.isExceed === true
        ? 'color: #fa2a31; font-size: 20px; font-weight: bold'
        : 'color: #666; font-size: 18px;'}
`;
const CharacterNumTextFieldDiv = Styled.div`
    width: 100px;
    margin-left: 10px;
    margin-right: 10px;
`;
const WritingResumeCharacterNumSettingButtonDiv = Styled.div`
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #666;
    border: 1px solid #666;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        color: #428d93;
        border: 1px solid #428d93;
    }
`;
const WritingResumeProgressBarDiv = Styled.div`
    width: 50%;
    height: 20px;
    background-color: #f3f3f3;
    border-radius: 5px;
`;
const ProgressContainer = Styled.div`
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 5px;
`;
const ProgressBar = Styled.div<{ percentage: number }>`
  height: 20px;
  width: ${(props) => (props.percentage ? `${props.percentage}%` : '0%')};
  background-color: #6bb9bf;
  border-radius: 5px;
`;

export default Write;
