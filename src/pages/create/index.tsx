import { use, useEffect, useState } from 'react';
import Styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCopyToClipboard } from 'react-use';
import { useSession } from 'next-auth/react';

import axios, { AxiosError } from 'axios';

import Inner_TopAppBar_Home from '@/components/appBar/Inner_TopAppBar_Home';
import LoadingPopup from '@/components/popup/LoadingPopup';

import temp_intro from '@/assets/images/temp_introduction.gif';

import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import EditRoundedIcon from '@mui/icons-material/EditRounded';

const placeholder = {
  company: '현대자동차',
  companyDescription:
    '현대자동차는 대한민국의 글로벌 자동차 제조 기업으로, 혁신적인 디자인과 첨단 기술을 통해 고품질의 차량을 제공하며, 전 세계적으로 신뢰와 인기를 얻고 있는 브랜드입니다.',
  job: '글로벌 상용차 신사업 프로젝트 기획/운영',
  jobDescription:
    '국내외 상용차(버스 / 트럭 등) 신사업 및 제휴 전략 기획과 신사업 프로젝트 런칭 / 운영 / 관리, 글로벌 생산 거점을 확용한 사업 모델을 분석하고 개발하는 업무를 수행합니다.',
  name: '홍길동',
  education: '길동고등학교(스마트 전자과), 길동대학교(컴퓨터공학과) 등',
  certification:
    '정보처리기사, 컴퓨터활용능력 1급, 워드프로세서 1급, 컴퓨터그래픽스운용기능사 등',
  experience: `- 2021.03 ~ 2021.08: (주)홍길동스토어 인턴 (웹 프론트엔드 개발자)
- 2021.09 ~ 2021.12: (주)김철수스토어 인턴 (웹 프론트엔드 개발자)`,
  majorProject: `1. 당신을 위한 계산기, 칼큘로
- 소속: 길동대학교
- 역할: Front-end 개발(React, GraphQL, es6, typescript)
- 느낀 점: 이 프로젝트를 통해 React와 GraphQL을 활용한 개발에 대한 깊은 이해를 얻었습니다. 이 기술들을 활용해 복잡한 문제를 해결하는 과정에서 개발자로서의 역량을 향상시킬 수 있었습니다.

2. 홍길동스토어 관리자 페이지, 길동 CMS
- 소속: (주)홍길동스토어
- 역할: Front-end 개발(Vue.js, REST API, es6, typescript)
- 느낀 점: 이 프로젝트를 통해 Vue.js를 사용한 실질적인 비즈니스 로직을 구현하는 데 성공했습니다. REST API와의 통신 과정에서 발생하는 다양한 문제를 해결하며 프론트엔드 개발에 대한 전반적인 이해를 높였습니다.

3. 코딩 아카데미 웹 사이트, 길동코드
- 소속: (주)길동코드
- 역할: Full-stack 개발(React, Node.js, MongoDB, REST API, GraphQL)
- 느낀 점: 이 프로젝트는 프론트엔드와 백엔드의 경계를 넘나드는 경험을 통해 전체 웹 애플리케이션의 아키텍처를 이해하고 관리하는 능력을 향상시켰습니다. 이를 통해 보다 효과적인 개발 프로세스를 경험하고, 사용자 중심의 서비스를 개발하는 데 중점을 두었습니다.`,
  personality: `- 장점: 긍정적이고 적극적인 성격을 가지고 있습니다. 어떤 일이든 최선을 다해 해내는 것을 좋아합니다.
- 단점: 물건을 잃어버리는 경향이 있습니다. 또한, 물건을 잃어버렸을 때 그것을 인정하지 않고 무심코 지나치는 경향이 있습니다.`,
  etc: `- 전문 기술: React, Vue.js, Node.js, MongoDB, GraphQL, REST API, es6, typescript
- 언어 능력: 영어(토익 900점), 일본어(일상회화 가능)
- 컴퓨터 능력: MS Office(Word, Excel, PowerPoint), Adobe Photoshop, Adobe Illustrator
- 봉사 활동: 길동동물보호소 봉사, 길동아동센터 봉사
- 취미: 노래 부르기, 요리하기, 영화 보기, 책 읽기`,
  resumeQuestion:
    '길동전자를 지원한 이유와 입사 후 회사에서 이루고 싶은 꿈을 기술하십시오. (500자 이내)',
};

const Create = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [user, setUser] = useState<any>(session?.user || null);

  const [step, setStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [company, setCompany] = useState<string>('');
  const [companyDescription, setCompanyDescription] = useState<string>('');
  const [job, setJob] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');

  const [name, setName] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [certification, setCertification] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [majorProject, setMajorProject] = useState<string>('');
  const [personality, setPersonality] = useState<string>('');
  const [etc, setEtc] = useState<string>('');

  const [resumeFormType, setResumeFormType] = useState<string>('');
  const [resumeQuestionList, setResumeQuestionList] = useState(['']);
  const [resumeMaxCharacterNum, setResumeMaxCharacterNum] =
    useState<number>(500);

  const [generatedResume, setGeneratedResume] = useState<string>('');
  const [isCopied, copyToClipboard] = useCopyToClipboard();

  const handleCopyClick = () => {
    copyToClipboard(generatedResume);
    if (isCopied) {
      alert('자기소개서가 복사되었습니다.');
    }
  };

  const handleCompanyChange = (e: any) => {
    setCompany(e.target.value);
  };
  const handleCompanyDescriptionChange = (e: any) => {
    setCompanyDescription(e.target.value);
  };
  const handleJobChange = (e: any) => {
    setJob(e.target.value);
  };
  const handleJobDescriptionChange = (e: any) => {
    setJobDescription(e.target.value);
  };
  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
  const handleEducationChange = (e: any) => {
    setEducation(e.target.value);
  };
  const handleCertificationChange = (e: any) => {
    setCertification(e.target.value);
  };
  const handleExperienceChange = (e: any) => {
    setExperience(e.target.value);
  };
  const handleMajorProjectChange = (e: any) => {
    setMajorProject(e.target.value);
  };
  const handlePersonalityChange = (e: any) => {
    setPersonality(e.target.value);
  };
  const handleEtcChange = (e: any) => {
    setEtc(e.target.value);
  };
  const handleResumeFormTypeChange = (e: any) => {
    setResumeFormType(e.target.value);
  };
  const handleResumeMaxCharacterNumChange = (e: any) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value >= 0) {
      setResumeMaxCharacterNum(value);
    }
  };
  const handleResumeQuestionChange =
    (index: number) => (event: { target: { value: string } }) => {
      const newResumeQuestionList = [...resumeQuestionList];
      newResumeQuestionList[index] = event.target.value;
      setResumeQuestionList(newResumeQuestionList);
    };
  const handleAddQuestion = () => {
    if (resumeQuestionList.length >= 10) {
      alert('항목은 최대 10개까지만 입력 가능합니다.');
      return;
    }
    if (new Set(resumeQuestionList).size !== resumeQuestionList.length) {
      alert('중복된 항목을 입력할 수 없습니다.');
      return;
    }
    setResumeQuestionList([...resumeQuestionList, '']);
  };
  const isButtonDisabled = resumeQuestionList.some(
    (question) => question === '',
  );
  const handleDeleteQuestion = (index: number) => () => {
    setResumeQuestionList(resumeQuestionList.filter((_, i) => i !== index));
  };
  const handleGeneratedResumeChange = (e: any) => {
    setGeneratedResume(e.target.value);
  };

  const getResume = async (resumeFormType: string) => {
    if (!session) return;
    const accessToken = (session as any)?.accessToken;
    if (!accessToken) return;

    let resumeOption = `
- 자기소개서 결과만 보내줘`;
    if (resumeFormType === 'maxCharacterNum') {
      resumeOption += `
- 자기소개서 최대 글자 수: ${resumeMaxCharacterNum}`;
    } else if (resumeFormType === 'add') {
      resumeOption += `
- 아래 자기소개서 항목들에 대한 답으로 자기소개서를 구성해줘:`;
      resumeQuestionList.forEach((question, index) => {
        if (question !== '') {
          resumeOption += `
    ${index + 1}. ${question}`;
        }
      });
    }
    resumeOption += `
- 회사 이름: ${company}`;
    if (companyDescription !== '') {
      resumeOption += `
- 회사 설명: ${companyDescription}`;
    }
    resumeOption += `
- 직무 이름: ${job}`;
    if (jobDescription !== '') {
      resumeOption += `
- 직무 설명: ${jobDescription}`;
    }
    resumeOption += `
- 지원자 이름: ${name}
- 최종 학력: ${education}`;
    if (certification !== '') {
      resumeOption += `
- 자격증: ${certification}`;
    }
    if (experience !== '') {
      resumeOption += `
- 경력사항: ${experience}`;
    }
    if (majorProject !== '') {
      resumeOption += `
- 주요 프로젝트: ${majorProject}`;
    }
    if (personality !== '') {
      resumeOption += `
- 성격의 장단점: ${personality}`;
    }
    if (etc !== '') {
      resumeOption += `
- 기타: ${etc}`;
    }

    setIsLoading(true);
    try {
      const prompt = '아래 내용들을 참고해서 자기소개서를 만들어줘.' + resumeOption;
      const res = await axios.post(
        '/createdResumes',
        {
          userId: user.id,
          company: company,
          job: job,
          prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.status === 201) {
        const recvResume = res.data;
        setGeneratedResume(recvResume.content);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status) {
        switch (axiosError.response.status) {
          case 402:
            alert('잔여 토큰이 부족합니다.');
            break;
          case 500:
            alert('자기소개서 생성에 실패하였습니다.');
            break;
          default:
            alert('알 수 없는 오류가 발생하였습니다.');
        }
      } else {
        alert('네트워크 오류가 발생하였습니다.');
      }
      setIsLoading(false);
      return;
    }

    setStep(step + 1);
    setIsLoading(false);
  };

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

  return (
    <div
      style={{
        backgroundImage: `url(images/bg_common.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
      }}
    >
      {isLoading && (
        <LoadingPopup loadingText="AI가 자기소개서를 생성중입니다.(최대 2분)" />
      )}
      {<Inner_TopAppBar_Home isSignIn={Boolean(user)} />}
      <WrapBox>
        {step === 0 && (
          <Box>
            <IntroImgDiv>
              <IntroImg src={temp_intro} alt="IntroImg" />
            </IntroImgDiv>
            <IntroBox alignDirection="left">
              <IntroTitleTag>자소서 생성</IntroTitleTag>
              <IntroTitle>당신의 자소서를 자동으로 만들어 드립니다</IntroTitle>
              <IntroDescription>
                회사에 대한 정보와 개인의 특성을 분석하여, AI가 최적화된
                자기소개서를 작성합니다. 입력한 정보의 정확성과 자세함이 AI의
                성능에 직결되니, 가능한 많이 공유해주시는 것이 좋습니다.
              </IntroDescription>
              <IntroButton
                onClick={() => {
                  setStep(step + 1);
                }}
              >
                자기소개서 생성 시작
              </IntroButton>
            </IntroBox>
          </Box>
        )}
        {step === 1 && (
          <CommonBox
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (company.length > 0 && job.length > 0) {
                  setStep(step + 1);
                }
              }
            }}
          >
            <WritingBox>
              <WritingBoxTitle>
                {'🏢 지원하는 회사에 대한 정보를 입력해주세요.'}
              </WritingBoxTitle>
              <WritingDiv>
                <WritingText>
                  <WritingCompanyTextSpan>
                    {'회사의 이름(필수)'}
                  </WritingCompanyTextSpan>
                </WritingText>
                <TextField
                  id="company"
                  fullWidth
                  variant="outlined"
                  placeholder="현대자동차"
                  value={company}
                  onChange={handleCompanyChange}
                />
              </WritingDiv>
              {company !== '' && (
                <WritingDiv>
                  <WritingText>
                    <WritingCompanyTextSpan>
                      {'회사 설명'}
                    </WritingCompanyTextSpan>
                    {'(선택)'}
                  </WritingText>
                  <TextField
                    id="companyDescription"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                    placeholder="현대자동차는 대한민국의 글로벌 자동차 제조 기업으로, 혁신적인 디자인과 첨단 기술을 통해 고품질의 차량을 제공하며, 전 세계적으로 신뢰와 인기를 얻고 있는 브랜드입니다."
                    value={companyDescription}
                    onChange={handleCompanyDescriptionChange}
                  />
                </WritingDiv>
              )}
              <WritingDiv>
                <WritingText>
                  <WritingCompanyTextSpan>
                    {'직무의 이름(필수)'}
                  </WritingCompanyTextSpan>
                </WritingText>
                <TextField
                  id="job"
                  fullWidth
                  variant="outlined"
                  placeholder="글로벌 상용차 신사업 프로젝트 기획/운영"
                  value={job}
                  onChange={handleJobChange}
                />
              </WritingDiv>
              {job !== '' && (
                <WritingDiv>
                  <WritingText>
                    <WritingCompanyTextSpan>
                      {'직무 설명'}
                    </WritingCompanyTextSpan>
                    {'(선택)'}
                  </WritingText>
                  <TextField
                    id="jobDescription"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                    placeholder="국내외 상용차(버스 / 트럭 등) 신사업 및 제휴 전략 기획과 신사업 프로젝트 런칭 / 운영 / 관리, 글로벌 생산 거점을 확용한 사업 모델을 분석하고 개발하는 업무를 수행합니다."
                    value={jobDescription}
                    onChange={handleJobDescriptionChange}
                  />
                </WritingDiv>
              )}
            </WritingBox>
            <WritingBoxDivider />
            <CommonButton
              isReady={company !== '' && job !== '' ? true : false}
              onClick={() => {
                if (company !== '' && job !== '') {
                  setStep(step + 1);
                }
              }}
            >
              회사 정보 입력 완료
            </CommonButton>
          </CommonBox>
        )}
        {step === 2 && (
          <CommonBox
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (name.length > 0 && education.length > 0) {
                  setStep(step + 1);
                }
              }
            }}
          >
            <WritingBoxHeaderDiv>
              <WritingBoxHeader>
                <WritingCompanyText>{company}</WritingCompanyText>
                <WritingJobText>{job}</WritingJobText>
                <ModifyingButtonDiv
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  <ModifyingIconDiv>
                    <EditRoundedIcon color="inherit" fontSize="inherit" />
                  </ModifyingIconDiv>
                  <ModifyingText>회사 정보 수정</ModifyingText>
                </ModifyingButtonDiv>
              </WritingBoxHeader>
            </WritingBoxHeaderDiv>
            <WritingBoxDivider />
            <WritingBox>
              <WritingBoxTitle>
                {'👨🏻‍💻 지원자에 대한 정보를 입력해주세요.'}
              </WritingBoxTitle>
              <WritingDiv>
                <WritingText>
                  <WritingCompanyTextSpan>
                    {'지원자 이름(필수)'}
                  </WritingCompanyTextSpan>
                </WritingText>
                <TextField
                  id="name"
                  fullWidth
                  variant="outlined"
                  placeholder={placeholder.name}
                  value={name}
                  onChange={handleNameChange}
                />
              </WritingDiv>
              <WritingDiv>
                <WritingText>
                  <WritingCompanyTextSpan>
                    {'최종 학력(필수)'}
                  </WritingCompanyTextSpan>
                </WritingText>
                <TextField
                  id="education"
                  fullWidth
                  variant="outlined"
                  placeholder={placeholder.education}
                  value={education}
                  onChange={handleEducationChange}
                />
              </WritingDiv>
              {name !== '' && education !== '' && (
                <>
                  <WritingDiv>
                    <WritingText>
                      <WritingCompanyTextSpan>
                        {'자격증'}
                      </WritingCompanyTextSpan>
                    </WritingText>
                    <TextField
                      id="certification"
                      fullWidth
                      variant="outlined"
                      multiline
                      rows={3}
                      placeholder={placeholder.certification}
                      value={certification}
                      onChange={handleCertificationChange}
                    />
                  </WritingDiv>
                  <WritingDiv>
                    <WritingText>
                      <WritingCompanyTextSpan>
                        {'경력사항'}
                      </WritingCompanyTextSpan>
                    </WritingText>
                    <TextField
                      id="experience"
                      fullWidth
                      variant="outlined"
                      multiline
                      rows={3}
                      placeholder={placeholder.experience}
                      value={experience}
                      onChange={handleExperienceChange}
                    />
                  </WritingDiv>
                  <WritingDiv>
                    <WritingText>
                      <WritingCompanyTextSpan>
                        {'주요 프로젝트'}
                      </WritingCompanyTextSpan>
                    </WritingText>
                    <TextField
                      id="majorProject"
                      fullWidth
                      variant="outlined"
                      multiline
                      rows={15}
                      placeholder={placeholder.majorProject}
                      value={majorProject}
                      onChange={handleMajorProjectChange}
                    />
                  </WritingDiv>
                  <WritingDiv>
                    <WritingText>
                      <WritingCompanyTextSpan>
                        {'성격의 장단점'}
                      </WritingCompanyTextSpan>
                    </WritingText>
                    <TextField
                      id="personality"
                      fullWidth
                      variant="outlined"
                      multiline
                      rows={3}
                      placeholder={placeholder.personality}
                      value={personality}
                      onChange={handlePersonalityChange}
                    />
                  </WritingDiv>
                  <WritingDiv>
                    <WritingText>
                      <WritingCompanyTextSpan>{'기타'}</WritingCompanyTextSpan>
                    </WritingText>
                    <TextField
                      id="etc"
                      fullWidth
                      variant="outlined"
                      multiline
                      rows={3}
                      placeholder={placeholder.etc}
                      value={etc}
                      onChange={handleEtcChange}
                    />
                  </WritingDiv>
                </>
              )}
            </WritingBox>
            <WritingBoxDivider />
            <CommonButton
              isReady={name !== '' && education !== '' ? true : false}
              onClick={() => {
                if (name !== '' && education !== '') {
                  setStep(step + 1);
                }
              }}
            >
              개인 정보 입력 완료
            </CommonButton>
          </CommonBox>
        )}
        {step === 3 && (
          <CommonBox>
            <WritingBoxHeaderDiv>
              <WritingBoxHeader>
                <WritingCompanyText>{company}</WritingCompanyText>
                <WritingJobText>{job}</WritingJobText>
                <ModifyingButtonDiv
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  <ModifyingIconDiv>
                    <EditRoundedIcon color="inherit" fontSize="inherit" />
                  </ModifyingIconDiv>
                  <ModifyingText>회사 정보 수정</ModifyingText>
                </ModifyingButtonDiv>
              </WritingBoxHeader>
            </WritingBoxHeaderDiv>
            <WritingBoxDivider />
            <WritingBoxHeaderDiv>
              <WritingBoxHeader>
                <WritingCompanyText>{name}</WritingCompanyText>
                <WritingJobText>{education}</WritingJobText>
                <ModifyingButtonDiv
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  <ModifyingIconDiv>
                    <EditRoundedIcon color="inherit" fontSize="inherit" />
                  </ModifyingIconDiv>
                  <ModifyingText>개인 정보 수정</ModifyingText>
                </ModifyingButtonDiv>
              </WritingBoxHeader>
            </WritingBoxHeaderDiv>
            <WritingBoxDivider />
            <WritingBox>
              <WritingBoxTitle>
                {'🚥 자기소개서 양식을 선택해주세요.'}
              </WritingBoxTitle>
              <RadioGroupDiv>
                <RadioGroup
                  name="controlled-radio-buttons-group"
                  value={resumeFormType}
                  onChange={handleResumeFormTypeChange}
                >
                  <FormControlLabel
                    value="add"
                    control={<Radio />}
                    label="자기소개서 양식 수정"
                  />
                  <FormControlLabel
                    value="maxCharacterNum"
                    control={<Radio />}
                    label="자기소개서 최대 글자 수만 지정"
                  />
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="양식 상관없음"
                  />
                </RadioGroup>
              </RadioGroupDiv>
              {resumeFormType === 'add' && (
                <>
                  {resumeQuestionList.map((question, index) => (
                    <WritingDiv key={index}>
                      <WritingTextDiv>
                        <WritingText>
                          <WritingCompanyTextSpan>
                            {'자기소개서 항목 ' + (index + 1)}
                          </WritingCompanyTextSpan>
                        </WritingText>
                        {index !== resumeQuestionList.length - 1 && (
                          <DeleteButton onClick={handleDeleteQuestion(index)}>
                            삭제
                          </DeleteButton>
                        )}
                      </WritingTextDiv>
                      <TextField
                        id={`resumeQuestion-${index}`}
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={2}
                        placeholder={placeholder.resumeQuestion}
                        value={question}
                        onChange={handleResumeQuestionChange(index)}
                      />
                    </WritingDiv>
                  ))}
                  <AddButton
                    onClick={handleAddQuestion}
                    disabled={isButtonDisabled}
                  >
                    항목 추가
                  </AddButton>
                </>
              )}
              {resumeFormType === 'maxCharacterNum' && (
                <>
                  <WritingDiv>
                    <WritingText>
                      <WritingCompanyTextSpan>
                        {'최대 글자 수'}
                      </WritingCompanyTextSpan>
                    </WritingText>
                    <TextField
                      id="resumeMaxCharacterNum"
                      fullWidth
                      variant="outlined"
                      placeholder="글자수 제한을 입력해주세요."
                      value={resumeMaxCharacterNum}
                      onChange={handleResumeMaxCharacterNumChange}
                    />
                  </WritingDiv>
                </>
              )}
            </WritingBox>
            <WritingBoxDivider />
            <CommonButton
              isReady={resumeFormType !== '' ? true : false}
              onClick={() => {
                if (resumeFormType !== '') {
                  getResume(resumeFormType);
                }
              }}
            >
              자기소개서 생성
            </CommonButton>
          </CommonBox>
        )}
        {step === 4 && (
          <CommonBox>
            <CommonButton
              isReady={true}
              onClick={() => {
                setStep(step - 1);
              }}
            >
              자기소개서 양식 수정
            </CommonButton>
            <WritingBoxDivider />
            {generatedResume !== '' && (
              <WritingBox>
                <WritingBoxTitle>
                  {'🧾 AI가 생성한 '}
                  <WritingBoxTitleHighlightSpan>
                    {name}
                  </WritingBoxTitleHighlightSpan>
                  {'님을 위한 자기소개서입니다.'}
                </WritingBoxTitle>
                <WritingBoxSubtitle>
                  <p>아래 박스를 스크롤하여 전체 내용을 확인하세요.</p>
                  <p>생성된 자기소개서는 마이페이지에서 확인할 수 있습니다.</p>
                </WritingBoxSubtitle>
                <GeneratedResumeDiv>
                  <TextField
                    id="generatedResume"
                    fullWidth
                    multiline
                    rows={30}
                    variant="outlined"
                    value={generatedResume}
                    onChange={handleGeneratedResumeChange}
                  />
                </GeneratedResumeDiv>
                <CopyButton onClick={handleCopyClick}>
                  자기소개서 내용 복사
                </CopyButton>
              </WritingBox>
            )}
          </CommonBox>
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
const WritingDiv = Styled.div`
    margin-bottom: 30px;
`;
const WritingTextDiv = Styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
`;
const WritingText = Styled.div`
    font-size: 16px;
    color: #000;
    margin-bottom: 15px;
`;
const WritingCompanyTextSpan = Styled.span`
    font-size: 17px;
    color: #428d93;
    font-weight: bold;
`;
const WritingBox = Styled.div`
    width: 100%;
    text-align: left;
    padding: 20px;
`;
const WritingBoxTitle = Styled.div`
    font-size: 23px;
    font-weight: bold;
    margin-bottom: 40px;
`;
const WritingBoxTitleHighlightSpan = Styled.span`
    font-size: 25px;
    color: #428d93;
`;
const WritingBoxSubtitle = Styled.div`
    font-size: 16px;
    color: #888;
    margin-bottom: 20px;
`;
const WritingBoxHeaderDiv = Styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;
const WritingBoxHeader = Styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
`;
const WritingCompanyText = Styled.div`
    font-size: 22px;
    font-weight: bold;
    color: #428d93;
`;
const WritingJobText = Styled.div`
    font-size: 18px;
    color: #428d93;
`;
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
`;
const ModifyingIconDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    font-size: 20px;
    color: inherit;
`;
const ModifyingText = Styled.div`
    font-size: 14px;
    color: inherit;
`;
const WritingBoxDivider = Styled.div`
    width: 100%;
    height: 1px;
    background-color: #ccc;
`;
const RadioGroupDiv = Styled.div`
    width: 100%;
    margin-bottom: 30px;
`;
const AddButton = Styled.button<{ disabled: boolean }>`
    height: 50px;
    margin-bottom: 20px;
    border-radius: 50px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: ${(props) => (props.disabled ? '#B1B1B1' : '#007BFF')};
    color: ${(props) => (props.disabled ? '#FFF' : '#FFF')};
    font-size: 16px;
    font-weight: 700;
    padding: 0 16px;
    transition: background-color .3s ease, color .3s ease;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

    &:hover {
        color: ${(props) => (props.disabled ? '#FFF' : '#007BFF')};
        background-color: ${(props) =>
          props.disabled ? '#B1B1B1' : '#ffffff'};
        border: ${(props) => (props.disabled ? 'none' : '1px solid #007BFF')};
    }
`;
const DeleteButton = Styled.button`
    margin-bottom: 15px;
    font-size: 14px;
    color: #888;
    border: solid 1px #888;
    border-radius: 5px;
    background-color: transparent;
    cursor: pointer;
    transition: color .3s ease;

    &:hover {
        border: none;
        color: #fff;
        background-color: #f00;
        font-weight: bold;
        padding: 3px 8px;
    }
`;
const GeneratedResumeDiv = Styled.div`
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
`;
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
`;

export default Create;
