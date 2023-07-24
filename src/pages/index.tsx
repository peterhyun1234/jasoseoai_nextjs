import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Inner_TopAppBar_Home from '@/components/appBar/Inner_TopAppBar_Home';

import temp_intro from '@/assets/images/temp_introduction.gif';
import temp1x1 from '@/assets/images/temp1x1.gif';
import temp3x4 from '@/assets/images/temp3x4.gif';

import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import GppGoodRoundedIcon from '@mui/icons-material/GppGoodRounded';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [user, setUser] = useState<any>(session?.user || null);

  useEffect(() => {
    if (!session) return;
    if (!session.user) return;
    console.log('session', session);
    setUser(session?.user);
  }, [session]);

  useEffect(() => {
    //TODO: https://peterjeon.co.kr/ 처럼 스크롤에 따른 다양한 이벤트 ㄱㄱ
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(images/bg_main.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
      }}
    >
      {<Inner_TopAppBar_Home isSignIn={Boolean(user)} />}
      <WrapBox>
        <MainBannerDiv>
          <MainBannerIntroDiv>
            <MainBannerTitleTag>
              {'ChatGPT 기반 자소서 작성 서비스'}
            </MainBannerTitleTag>
            <MainBannerTitle>
              {'자소서 AI를 통해서 전문적인 자소서를 빠르게 작성해보세요.'}
            </MainBannerTitle>
            <MainBannerSubTitle>
              {
                '모든 사람들에게 도움을 주기 위한 취지로 만들어진 자소서 AI의 모든 기능은 무료로 사용가능합니다. 다만 무분별한 사용을 방지하기 위해서 계정별로 하루 이용량이 제한됩니다.'
              }
            </MainBannerSubTitle>
            <MainBannerFunctionDiv>
              <CreationFunctionButton
                onClick={() => {
                  router.push('/create');
                }}
              >
                {'자기소개서 생성'}
              </CreationFunctionButton>
              <CorrectionFunctionButton
                onClick={() => {
                  router.push('/correct');
                }}
              >
                {'자기소개서 첨삭'}
              </CorrectionFunctionButton>
            </MainBannerFunctionDiv>
          </MainBannerIntroDiv>
          <MainBannerImgDiv>
            <MainBannerImg4x3 src={temp_intro} alt="main_banner" />
            <MainBannerImg3x4 src={temp3x4} alt="main_banner" />
            <MainBannerImg1x1 src={temp1x1} alt="main_banner" />
          </MainBannerImgDiv>
        </MainBannerDiv>
        <ProsIntroDiv>
          <ProsSummaryDiv>
            {
              '자소서 AI는 사용자의 시간을 아낄 수 있으며 전문적인 자소서 작성을 도와주고, 사용자의 글쓰기 스킬까지 향상시키는 도구입니다.'
            }
          </ProsSummaryDiv>
          <ProsListDiv>
            <ProsDiv>
              <ProsIconDiv bgColor="#db6bd2">
                <FastForwardRoundedIcon color="inherit" fontSize="inherit" />
              </ProsIconDiv>
              <ProsTitle>{'시간 절약'}</ProsTitle>
              <ProsDescription>
                {
                  '자소서 AI는 긴 시간을 들여 자소서를 작성하는 대신, 빠르고 효율적으로 작업을 수행하여 당신의 시간을 아낄 수 있습니다.'
                }
              </ProsDescription>
            </ProsDiv>
            <ProsDiv>
              <ProsIconDiv bgColor="#7a54a1">
                <GppGoodRoundedIcon color="inherit" fontSize="inherit" />
              </ProsIconDiv>
              <ProsTitle>{'전문적인 자소서'}</ProsTitle>
              <ProsDescription>
                {
                  '자소서 AI는 대규모 데이터를 학습하므로, 다양한 상황에 맞는 전문적인 자소서를 작성하는 데 도움이 됩니다.'
                }
              </ProsDescription>
            </ProsDiv>
            <ProsDiv>
              <ProsIconDiv bgColor="#58bfac">
                <AutoFixHighRoundedIcon color="inherit" fontSize="inherit" />
              </ProsIconDiv>
              <ProsTitle>{'글쓰기 스킬 향상'}</ProsTitle>
              <ProsDescription>
                {
                  '자소서 AI의 첨삭 기능은 당신의 문법과 문장 구조를 개선하는 데 도움이 되어, 글쓰기 기술을 향상시키는데 기여합니다.'
                }
              </ProsDescription>
            </ProsDiv>
          </ProsListDiv>
        </ProsIntroDiv>
        <FunctionIntroListDiv>
          <FunctionIntroDiv>
            <Box>
              <IntroImgDiv>
                <IntroImg src={temp_intro} alt="IntroImg" />
              </IntroImgDiv>
              <IntroBox alignDirection="left">
                <IntroTitleTag>자소서 생성</IntroTitleTag>
                <IntroTitle>
                  당신의 자소서를 자동으로 만들어 드립니다
                </IntroTitle>
                <IntroDescription>
                  회사에 대한 정보와 개인의 특성을 분석하여, AI가 최적화된
                  자기소개서를 작성합니다. 입력한 정보의 정확성과 자세함이 AI의
                  성능에 직결되니, 가능한 많이 공유해주시는 것이 좋습니다.
                </IntroDescription>
                <IntroButton
                  onClick={() => {
                    router.push('/create?step=1');
                  }}
                >
                  자기소개서 생성 시작
                </IntroButton>
              </IntroBox>
            </Box>
          </FunctionIntroDiv>
          <FunctionIntroDiv>
            <Box>
              <IntroBox alignDirection="left">
                <IntroTitleTag>자소서 문장 추천</IntroTitleTag>
                <IntroTitle>자소서의 다음 문장을 추천해드립니다</IntroTitle>
                <IntroDescription>
                  작성 중인 자기소개서와 제공하신 회사 정보, 개인 정보를
                  기반으로, AI가 다음 문장을 창의적이면서도 효과적으로
                  추천해드립니다. 당신의 자소서를 한 단계 업그레이드 시켜보세요.
                </IntroDescription>
                <IntroButton
                  onClick={() => {
                    router.push('/write?step=1');
                  }}
                >
                  자기소개서 작성 시작
                </IntroButton>
              </IntroBox>
              <IntroImgDiv>
                <IntroImg src={temp_intro} alt="IntroImg" />
              </IntroImgDiv>
            </Box>
          </FunctionIntroDiv>
          <FunctionIntroDiv>
            <Box>
              <IntroImgDiv>
                <IntroImg src={temp_intro} alt="IntroImg" />
              </IntroImgDiv>
              <IntroBox alignDirection="left">
                <IntroTitleTag>자소서 첨삭</IntroTitleTag>
                <IntroTitle>당신의 자소서를 자세하게 첨삭해드립니다</IntroTitle>
                <IntroDescription>
                  자소서 AI는 당신의 자소서에 대한 맞춤법 검사, 잘 쓴 점, 그리고
                  개선할 점을 상세하게 알려줍니다. 이를 통해 자신이 놓치기 쉬운
                  부분을 확인하고, 자기소개서를 보다 완성도 높게 다듬을 수
                  있습니다.
                </IntroDescription>
                <IntroButton
                  onClick={() => {
                    router.push('/correct?step=1');
                  }}
                >
                  자기소개서 첨삭 시작
                </IntroButton>
              </IntroBox>
            </Box>
          </FunctionIntroDiv>
        </FunctionIntroListDiv>
      </WrapBox>
      <FooterDiv>
        <FooterContentDiv>
          <FooterInfoDiv>
            <FooterInfoTitle>{'연락처'}</FooterInfoTitle>
            <FooterInfoDescription>
              {'이메일: peterhyun1234@gmail.com'}
            </FooterInfoDescription>
            <FooterInfoDescription>
              {'웹사이트: '}
              <a
                href="https://peterjeon.co.kr"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://peterjeon.co.kr
              </a>
            </FooterInfoDescription>
          </FooterInfoDiv>
        </FooterContentDiv>
      </FooterDiv>
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
const MainBannerDiv = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
`;
const MainBannerIntroDiv = Styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
`;
const MainBannerTitleTag = Styled.div`
    width: fit-content;
    color: #f78f8f;
    background-color: #ffe7df;
    border-radius: 50px;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
`;
const MainBannerTitle = Styled.div`
    color: #444;
    font-size: 38px;
    font-weight: bold;
    word-break: keep-all;
    white-space: break-spaces;
    margin-bottom: 13px;
`;
const MainBannerSubTitle = Styled.div`
    color: #888888;
    font-size: 20px;
    font-weight: bold;
    line-height: 1.5;
    word-break: keep-all;
    white-space: break-spaces;
    margin-bottom: 35px;
`;
const MainBannerFunctionDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-bottom: 20px;
`;
const CreationFunctionButton = Styled.div`
    background-color: #3589e3;
    color: #fff;
    font-size: 17px;
    font-weight: 700;
    border-radius: 50px;
    padding: 14px 40px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    -webkit-box-shadow: rgba(0, 0, 0, 0.17) 0px 0px 15px 3px; 
    box-shadow: rgba(0, 0, 0, 0.17) 0px 0px 15px 3px;

    &:hover {
        background-color: #327bff;
    }
`;
const CorrectionFunctionButton = Styled.div`
    background-color: #fff7f7;
    color: #3589e3;
    border: 2px solid #3589e3;
    font-size: 17px;
    font-weight: 700;
    border-radius: 50px;
    padding: 14px 40px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    -webkit-box-shadow: rgba(0, 0, 0, 0.17) 0px 0px 15px 3px; 
    box-shadow: rgba(0, 0, 0, 0.17) 0px 0px 15px 3px;

    &:hover {
        background-color: #fff;
        border: 2px solid #327bff;
        color: #327bff;
    }
`;
const MainBannerImgDiv = Styled.div`
    width: 100%;
    height: 500px;
    flex: 1;
    display: flex;
    position: relative;
    justify-content: center;
`;
const MainBannerImg4x3 = Styled(Image)`
    position: absolute;
    width: 80%;
    height: auto;
    aspect-ratio: 4 / 3;
    -webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 40px 20px; 
    box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 40px 20px;
    border-radius: 10px;
`;
const MainBannerImg3x4 = Styled(Image)`
    position: absolute;
    left: 0;
    top: 270px;
    width: 20%;
    height: auto;
    aspect-ratio: 3 / 4;
    -webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 40px 20px;
    box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 40px 20px;
    border-radius: 10px;
    @media (max-width: 1000px) {
        top: 27vw;
    }
`;
const MainBannerImg1x1 = Styled(Image)`
    position: absolute;
    right: 0;
    top: 120px;
    width: 30%;
    height: auto;
    aspect-ratio: 1 / 1;
    -webkit-box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 40px 20px;
    box-shadow: rgba(0, 0, 0, 0.27) 0px 0px 40px 20px;
    border-radius: 10px;
    @media (max-width: 1000px) {
        top: 12vw;
    }
`;
const FunctionIntroListDiv = Styled.div`
`;
const FunctionIntroDiv = Styled.div`
    width: 100%;
    margin-bottom: 140px;
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
const ProsIntroDiv = Styled.div`
    margin-top: 800px;
    margin-bottom: 200px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    @media (max-width: 1000px) {
        margin-top: 80vw;
    }
`;
const ProsSummaryDiv = Styled.div`
    color: #444;
    font-size: 28px;
    font-weight: bold;
    word-break: keep-all;
    white-space: break-spaces;
    margin-bottom: 70px;
`;
const ProsListDiv = Styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;
const ProsDiv = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 40px;
    }
`;
const ProsIconDiv = Styled.div<{ bgColor: string }>`
    background-color: ${(props) => props.bgColor || '#327bff'};
    color: white;
    font-size: 35px;
    border-radius: 15px;
    width: 55px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 15px 3px; 
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 15px 3px;
    margin-bottom: 20px;
`;
const ProsTitle = Styled.div`
    color: #444;
    font-size: 23px;
    font-weight: bold;
    word-break: keep-all;
    white-space: break-spaces;
    margin-bottom: 20px;
`;
const ProsDescription = Styled.div`
    color: #888888;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.5;
    word-break: keep-all;
    white-space: break-spaces;
`;
const FooterDiv = Styled.div`
    padding: 20px;
    background-color: #f8f9fa;
    text-align: center;
`;
const FooterContentDiv = Styled.div`
    max-width: 1000px;
    margin: auto;
`;
const FooterInfoDiv = Styled.div`
    margin-top: 30px;
    margin-bottom: 30px;
`;
const FooterInfoTitle = Styled.div`
    font-weight: bold;
    font-size: 30px;
    margin-bottom: 20px;
`;
const FooterInfoDescription = Styled.div`
    font-size: 20px;
    margin-bottom: 10px;
    cursor: pointer;
`;

export default Home;
