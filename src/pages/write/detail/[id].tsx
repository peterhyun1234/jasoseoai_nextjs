import { useEffect, useRef, useState } from 'react';
import Styled, { keyframes, css } from 'styled-components';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import axios, { AxiosError } from 'axios';

import Inner_TopAppBar_Home from '@/components/appBar/Inner_TopAppBar_Home';
import LoadingPopup from '@/components/popup/LoadingPopup';

import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';

import SaveAltRoundedIcon from '@mui/icons-material/SaveAltRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

const WriteRetail = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const timerRef = useRef<any>(null);
  const progressRef = useRef<any>(() => {});

  const [user, setUser] = useState<any>(session?.user || null);
  const [isNotOwner, setIsNotOwner] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);

  const [resume, setResume] = useState<any>(null);

  const [resumeItemListIndex, setResumeItemListIndex] = useState<number>(0);
  const [characterPercentage, setCharacterPercentage] = useState<number>(0);
  const [isMaxCharReady, setIsMaxCharReady] = useState<boolean>(false);

  const [isAIReady, setIsAIReady] = useState<boolean>(true);
  const [recommendation, setRecommendation] = useState('');
  const [recommendationLoading, setRecommendationLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  const handleMaxCharacterNumChange = (e: any) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const valueNumber = Number(value);
    if (valueNumber > 5000) {
      alert('최대 글자 수는 5000자 이내로 입력해주세요.');
      return;
    }
    if (value > 0) {
      const maxCharacterNum = Number(value);
      const resumeItemList = resume.resumeItemList;
      setResume({
        ...resume,
        maxCharacterNum,
      });
      setCharacterPercentage(
        Math.floor(
          (resumeItemList[resumeItemListIndex].answer.length /
            maxCharacterNum) *
            100,
        ),
      );
    }
  };

  const handleResumeQuestionChange = (e: any) => {
    const { value } = e.target;
    if (value.length > 200) {
      alert('질문은 200자 이내로 입력해주세요.');
      return;
    }

    const resumeItemList = resume.resumeItemList;
    const newWritingResumeList = resumeItemList.map(
      (item: any, index: number) => {
        if (index === resumeItemListIndex) {
          return {
            ...item,
            question: value,
          };
        }
        return item;
      },
    );
    setResume({
      ...resume,
      resumeItemList: newWritingResumeList,
    });
  };

  const handleWritingResumeChange = (e: any) => {
    const { value } = e.target;
    if (value.length > 5000) {
      alert('자기소개서는 5000자 이내로 입력해주세요.');
      return;
    }

    const resumeItemList = resume.resumeItemList;
    const newWritingResumeList = resumeItemList.map(
      (item: any, index: number) => {
        if (index === resumeItemListIndex) {
          return {
            ...item,
            answer: value,
          };
        }
        return item;
      },
    );
    setResume({
      ...resume,
      resumeItemList: newWritingResumeList,
    });
    setCharacterPercentage(
      Math.floor((value.length / resume.maxCharacterNum) * 100),
    );
  };

  const deleteResume = async () => {
    if (!session) return;
    const accessToken = (session as any)?.accessToken;
    if (!accessToken) return;
    if (!resume) return;

    setIsLoading(true);

    try {
      axios.delete(`/writtenResumes/${resume.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert('자기소개서가 삭제되었습니다.');
      router.push('/');
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        const { status } = response;
        if (status === 401) {
          alert('로그인이 필요한 서비스입니다.');
          router.push('/auth/signin');
        } else if (status === 404) {
          alert('존재하지 않는 자기소개서입니다.');
          router.push('/');
        } else {
          alert('알 수 없는 오류가 발생했습니다.');
          router.push('/');
        }
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
        router.push('/');
      }
    }

    setIsLoading(false);
  };

  const updateResume = async () => {
    if (!session) return;
    const accessToken = (session as any)?.accessToken;
    if (!accessToken) return;
    if (!resume) return;

    setIsUpdateLoading(true);

    try {
      axios.put(
        `/writtenResumes/${resume.id}`,
        {
          maxCharacterNum: resume.maxCharacterNum,
          resumeItemList: resume.resumeItemList,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setResume({
        ...resume,
        updatedAt: new Date(),
      });
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        const { status } = response;
        if (status === 401) {
          alert('로그인이 필요한 서비스입니다.');
          router.push('/auth/signin');
        } else if (status === 404) {
          alert('존재하지 않는 자기소개서입니다.');
          router.push('/');
        } else {
          alert('알 수 없는 오류가 발생했습니다.');
          router.push('/');
        }
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
        router.push('/');
      }
    }

    setIsUpdateLoading(false);
  };

  const generateNextSentence = async (currentResume: any) => {
    const { question, answer } = currentResume;
    const company = resume.company;
    const job = resume.job;

    if (company === null || company === undefined || company.length < 1) return;
    if (job === null || job === undefined || job.length < 1) return;
    if (question === null || question === undefined || question.length < 3)
      return;
    if (answer === null || answer === undefined || answer.length < 10) return;

    if (!session) return;
    const accessToken = (session as any)?.accessToken;
    if (!accessToken) return;

    setRecommendationLoading(true);
    try {
      const prompt = `자기소개서 내용에서 문장이 끝났다면 다음 문장을 추천하고, 문장이 끝나지 않았다면 문장을 완성할 이어지는 문장을 추천해줘. 아래 내용을 참고해줘.
- 문장만 추천해주고 너의 말은 제외해줘.
- 회사: ${company}
- 직무: ${job}
- 자기소개서 항목(질문): ${question}
- 자기소개서 내용: ${answer}`;

      const response = await axios.post(
        `/writtenResumes/getSentenceSuggestion`,
        {
          userId: user.id,
          prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (response.status === 201) {
        const { data } = response;
        setRecommendation(data);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status) {
        switch (axiosError.response.status) {
          case 401:
            alert('로그인이 필요한 서비스입니다.');
            router.push('/auth/signin');
            break;
          case 402:
            alert(`잔여 토큰이 부족합니다. 토큰 보충(무료)은 아래 이메일로 문의해주세요.
- 이메일: peterhyun1234@gmail.com`);
            break;
          case 500:
            alert('자기소개서 첨삭에 실패하였습니다.');
            break;
          default:
            alert('알 수 없는 오류가 발생하였습니다.');
            break;
        }
      } else {
        alert('알 수 없는 오류가 발생하였습니다.');
      }
    }

    setRecommendationLoading(false);
  };

  const getResume = async (resumeid: number) => {
    if (!session) return;
    const accessToken = (session as any)?.accessToken;
    if (!accessToken) return;

    setIsLoading(true);

    try {
      const response = await axios.get(`/writtenResumes/${resumeid}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { data } = response;
      if (data.userId !== user.id) {
        setIsNotOwner(true);
      }
      setResume(data);
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        const { status } = response;
        if (status === 401) {
          alert('로그인이 필요한 서비스입니다.');
          router.push('/auth/signin');
        } else if (status === 404) {
          alert('존재하지 않는 자기소개서입니다.');
          router.push('/');
        } else {
          alert('알 수 없는 오류가 발생했습니다.');
          router.push('/');
        }
      } else {
        alert('알 수 없는 오류가 발생했습니다.');
        router.push('/');
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (isAIReady === false) return;
    if (resume === null || resume === undefined) return;
    if (resume.resumeItemList === null || resume.resumeItemList === undefined)
      return;

    const curResume = resume.resumeItemList[resumeItemListIndex];
    if (
      curResume === null ||
      curResume === undefined ||
      curResume?.answer.length < 10
    )
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
  }, [resumeItemListIndex, isAIReady, resume]);

  useEffect(() => {
    if (!id) return;
    if (!user) return;
    if (resume) return;
    if (id && Number.isInteger(Number(id)) && Number(id) >= 1) {
      getResume(Number(id));
    } else {
      alert('잘못된 자기소개서 아이디입니다.');
      router.push('/');
    }
  }, [id, user]);

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
    const progressTimer = setInterval(() => {
      progressRef.current();
    }, 1000);

    const updateTimer = setInterval(() => {
      updateResume();
    }, 1000 * 60);

    return () => {
      clearInterval(progressTimer);
      clearInterval(updateTimer);
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(/images/bg_common.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
      }}
    >
      {isLoading && (
        <LoadingPopup loadingText="자기소개서를 불러오는 중입니다." />
      )}
      {<Inner_TopAppBar_Home isSignIn={Boolean(user)} />}
      {resume !== undefined && resume !== null && (
        <WrapBox>
          {isNotOwner ? (
            <h1>본인이 작성한 자기소개서가 아닙니다.</h1>
          ) : (
            <WritingResumeBox>
              {resume.company !== undefined &&
                resume.company !== null &&
                resume.job !== undefined &&
                resume.job !== null &&
                resume.resumeItemList !== undefined &&
                resume.resumeItemList !== null && (
                  <>
                    <WritingCompanyBoxHeaderDiv>
                      <WritingResumeCompanyBox>
                        <WritingResumeCompanyText>
                          {resume.company}
                        </WritingResumeCompanyText>
                        <WritingResumeJobText>
                          {resume.job}
                        </WritingResumeJobText>
                        <DeleteResumeButtonDiv
                          onClick={() => {
                            if (
                              confirm(
                                '작성 중인 자기소개서 전체를 정말로 삭제하시겠습니까?',
                              )
                            ) {
                              deleteResume();
                            }
                          }}
                        >
                          <DeleteIconDiv>
                            <DeleteForeverRoundedIcon
                              color="inherit"
                              fontSize="inherit"
                            />
                          </DeleteIconDiv>
                        </DeleteResumeButtonDiv>
                      </WritingResumeCompanyBox>
                      <DeleteAndSaveButtonDiv>
                        <ResumeItemDeleteButtonDiv
                          onClick={() => {
                            if (resume.resumeItemList.length <= 1) {
                              alert(
                                '자기소개서 항목은 최소 1개 이상이어야 합니다.',
                              );
                              return;
                            }
                            if (
                              !confirm(
                                '자기소개서 항목을 정말로 삭제하시겠습니까?',
                              )
                            ) {
                              return;
                            }
                            const newResumeItemList =
                              resume.resumeItemList.filter(
                                (item: any, index: number) => {
                                  if (index === resumeItemListIndex) {
                                    return false;
                                  }
                                  return true;
                                },
                              );
                            setResume({
                              ...resume,
                              resumeItemList: newResumeItemList,
                            });
                            setResumeItemListIndex(0);
                          }}
                        >
                          <DeleteIconDiv>
                            <RemoveCircleOutlineRoundedIcon
                              color="inherit"
                              fontSize="inherit"
                            />
                          </DeleteIconDiv>
                          <ResumeItemDeleteText>항목 삭제</ResumeItemDeleteText>
                        </ResumeItemDeleteButtonDiv>
                        <WritingResumeSaveButtonDiv
                          onClick={() => {
                            updateResume();
                          }}
                        >
                          <SaveIconDiv>
                            <SaveAltRoundedIcon
                              color="inherit"
                              fontSize="inherit"
                            />
                          </SaveIconDiv>
                          <WritingResumeSaveButtonText>
                            {isUpdateLoading ? '저장 중...' : '저장하기'}
                          </WritingResumeSaveButtonText>
                        </WritingResumeSaveButtonDiv>
                        <LastModifiedText>
                          <p>수정일(자동 저장): </p>
                          <p>
                            {new Date(resume.updatedAt).toLocaleString('ko-KR')}
                          </p>
                        </LastModifiedText>
                      </DeleteAndSaveButtonDiv>
                    </WritingCompanyBoxHeaderDiv>
                    <WritingResumeBoxDivider />
                    <WritingResumeTextFieldsBox>
                      <ResumePageDiv>
                        {resume.resumeItemList.map(
                          (item: any, index: number) => {
                            return (
                              <ResumePageButtonDiv
                                key={index}
                                isSelected={
                                  resumeItemListIndex === index ? true : false
                                }
                                onClick={() => {
                                  setResumeItemListIndex(index);
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
                            if (resume.resumeItemList.length >= 5) {
                              alert('최대 5개까지만 추가 가능합니다.');
                              return;
                            }
                            const newResumeItemList = resume.resumeItemList
                              ? resume.resumeItemList
                              : [];
                            newResumeItemList.push({
                              question: '',
                              answer: '',
                            });
                            setResume({
                              ...resume,
                              resumeItemList: newResumeItemList,
                            });
                            setResumeItemListIndex(
                              newResumeItemList.length - 1,
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
                          resume.resumeItemList[resumeItemListIndex]?.question
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
                          resume.resumeItemList[resumeItemListIndex]?.answer
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
                              const resumeItemList = resume.resumeItemList;
                              const newWritingResumeList = resumeItemList.map(
                                (item: any, index: number) => {
                                  if (index === resumeItemListIndex) {
                                    return {
                                      ...item,
                                      answer: item.answer + recommendation,
                                    };
                                  }
                                  return item;
                                },
                              );
                              setResume({
                                ...resume,
                                resumeItemList: newWritingResumeList,
                              });
                            }
                          }
                        }}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      />
                      <RecommendationDiv isAIReady={isAIReady}>
                        {isAIReady === true && (
                          <RecommendationText isLoading={recommendationLoading}>
                            {recommendationLoading === true && (
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
                            <RecommendationGuidanceText
                              isLoading={recommendationLoading}
                            >
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
                          isExceed={characterPercentage >= 100 ? true : false}
                        >
                          {
                            resume.resumeItemList[resumeItemListIndex]?.answer
                              .length
                          }
                        </WritingResumeCharacterNumText>
                        <WritingResumeCharacterNumText
                          isExceed={characterPercentage >= 100 ? true : false}
                        >
                          {' / '}
                        </WritingResumeCharacterNumText>
                        {isMaxCharReady === false ? (
                          <WritingResumeCharacterNumText
                            isExceed={characterPercentage >= 100 ? true : false}
                          >
                            {resume.maxCharacterNum}
                          </WritingResumeCharacterNumText>
                        ) : (
                          <CharacterNumTextFieldDiv>
                            <TextField
                              variant="outlined"
                              label="최대 글자 수"
                              fullWidth
                              value={resume.maxCharacterNum}
                              onChange={handleMaxCharacterNumChange}
                            />
                          </CharacterNumTextFieldDiv>
                        )}
                        <WritingResumeCharacterNumText
                          isExceed={characterPercentage >= 100 ? true : false}
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
            </WritingResumeBox>
          )}
        </WrapBox>
      )}
    </div>
  );
};

const WrapBox = Styled.div`
    width: 100%;
    display: inline-block;
    max-width: 850px;
    padding-top: calc(80px + 100px);
    padding-bottom: 100px;
    min-height: 100vh;
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
const WritingResumeSaveDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 7px;
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
const LastModifiedText = Styled.div`
    width: fit-content;
    font-size: 9px;
    color: #666;
`;
const DeleteResumeButtonDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: #dc5757;
    border-radius: 50%;
`;
const DeleteIconDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    font-size: 20px;
    color: #fff;
`;
const DeleteAndSaveButtonDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;
const ResumeItemDeleteButtonDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 130px;
    padding: 10px;
    background-color: #f3a9a9;
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
const ResumeItemDeleteText = Styled.div`
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

export default WriteRetail;
