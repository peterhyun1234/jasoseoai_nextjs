import { useEffect, useRef, useState } from 'react';
import Styled, { keyframes, css } from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import axios, { AxiosError } from 'axios';

import Inner_TopAppBar_Home from '@/components/appBar/Inner_TopAppBar_Home';
import LoadingPopup from '@/components/popup/LoadingPopup';

import write_4x3 from '@/assets/images/write_4x3.gif';

import TextField from '@mui/material/TextField';

const Write = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(session?.user || null);
  const [step, setStep] = useState<number>(0);

  // step 1
  const [company, setCompany] = useState<string>('');
  const [job, setJob] = useState<string>('');

  const handleCompanyChange = (e: any) => {
    const { value } = e.target;
    if (value.length > 100) {
      alert('회사 이름은 100자 이내로 입력해주세요.');
      return;
    }
    setCompany(value);
  };

  const handleJobChange = (e: any) => {
    const { value } = e.target;
    if (value.length > 100) {
      alert('직무 이름은 100자 이내로 입력해주세요.');
      return;
    }
    setJob(value);
  };

  const createResume = async () => {
    if (!session) return;
    const accessToken = (session as any)?.accessToken;
    if (!accessToken) return;

    setIsLoading(true);
    try {
      const res = await axios.post(
        `/writtenResumes`,
        {
          userId: user.id,
          company,
          job,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.status === 201) {
        const recvResume = res.data;
        if (recvResume !== null && recvResume !== undefined) {
          router.push(`/write/detail/${recvResume.id}`);
        } else {
          alert('자소서 작성 페이지로 이동할 수 없습니다.');
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status) {
        switch (axiosError.response.status) {
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
      {isLoading && <LoadingPopup loadingText="자기소개서를 생성중입니다." />}
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
              <IntroImg src={write_4x3} alt="IntroImg" />
            </IntroImgDiv>
          </Box>
        )}
        {step === 1 && (
          <>
            <WritingResumeBox>
              <WritingCompanyBox
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (company.length > 0 && job.length > 0) {
                      createResume();
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
                      createResume();
                    }
                  }}
                >
                  자기소개서 작성 시작
                </CommonButton>
              </WritingCompanyBox>
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

export default Write;
