import { useEffect, useState } from 'react';
import Styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCopyToClipboard } from 'react-use';
import { useSession } from 'next-auth/react';

import axios, { AxiosError } from 'axios';

import Inner_TopAppBar_Home from '@/components/appBar/Inner_TopAppBar_Home';
import LoadingPopup from '@/components/popup/LoadingPopup';

import TextField from '@mui/material/TextField';

const CreateDetail = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<any>(session?.user || null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [generatedResume, setGeneratedResume] = useState<any>(null);
  const [isCopied, copyToClipboard] = useCopyToClipboard();

  const handleCopyClick = () => {
    copyToClipboard(generatedResume.content);
    if (isCopied) {
      alert('자기소개서가 복사되었습니다.');
    }
  };

  const handleGeneratedResumeChange = (e: any) => {
    setGeneratedResume({
      ...generatedResume,
      content: e.target.value,
    });
  };

  const handleModifyClick = () => {
    if (!session) return;
    const accessToken = (session as any)?.accessToken;
    if (!accessToken) return;
    if (!generatedResume) return;

    setIsLoading(true);

    try {
      axios.put(
        `/createdResumes/${generatedResume.id}`,
        {
          content: generatedResume.content,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      alert('자기소개서가 수정되었습니다.');
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

  const handleDeleteClick = () => {
    if (!session) return;
    const accessToken = (session as any)?.accessToken;
    if (!accessToken) return;
    if (!generatedResume) return;

    if (!confirm('정말로 자기소개서를 삭제하시겠습니까?')) return;

    setIsLoading(true);

    try {
      axios.delete(`/createdResumes/${generatedResume.id}`, {
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

  const getResume = async (resumeid: number) => {
    if (!session) return;
    const accessToken = (session as any)?.accessToken;
    if (!accessToken) return;

    setIsLoading(true);

    try {
      const response = await axios.get(`/createdResumes/${resumeid}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { data } = response;
      setGeneratedResume(data);
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
    if (!id) return;
    if (!user) return;
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

  return (
    <div
      style={{
        backgroundImage: `url(images/bg_common.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
      }}
    >
      {isLoading && (
        <LoadingPopup loadingText="자기소개서를 불러오는 중입니다." />
      )}
      {<Inner_TopAppBar_Home isSignIn={Boolean(user)} />}
      <WrapBox>
        <CommonBox>
          <WritingBoxDivider />
          {generatedResume !== undefined && generatedResume !== null && (
            <WritingBox>
              <WritingBoxTitle>
                {'🧾 '}
                <WritingBoxTitleHighlightSpan>
                  {generatedResume.title}
                </WritingBoxTitleHighlightSpan>
              </WritingBoxTitle>
              <WritingDate>{`${new Date(
                generatedResume.createdAt,
              ).toLocaleString('ko-KR')}`}</WritingDate>
              <WritingBoxSubtitle>
                아래 박스를 스크롤하여 전체 내용을 확인하세요.
              </WritingBoxSubtitle>
              <GeneratedResumeDiv>
                <TextField
                  id="generatedResume"
                  fullWidth
                  multiline
                  rows={30}
                  variant="outlined"
                  value={generatedResume.content}
                  onChange={handleGeneratedResumeChange}
                />
              </GeneratedResumeDiv>
              <ModifyOrDeleteButtonBox>
                <ModifyButton onClick={handleModifyClick}>
                  자기소개서 수정
                </ModifyButton>
                <DeleteButton onClick={handleDeleteClick}>
                  자기소개서 삭제
                </DeleteButton>
              </ModifyOrDeleteButtonBox>
              <CopyButton onClick={handleCopyClick}>
                자기소개서 내용 복사
              </CopyButton>
            </WritingBox>
          )}
        </CommonBox>
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
const WritingDate = Styled.div`
    width: 100%;
    text-align: right;
    font-size: 16px;
    color: #888;
    margin-bottom: 10px;
`;
const WritingBoxSubtitle = Styled.div`
    font-size: 16px;
    color: #888;
    margin-bottom: 20px;
`;
const WritingBoxDivider = Styled.div`
    width: 100%;
    height: 1px;
    background-color: #ccc;
`;
const GeneratedResumeDiv = Styled.div`
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
`;
const ModifyOrDeleteButtonBox = Styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
`;
const ModifyButton = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 49%;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #428d93;
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
const DeleteButton = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 49%;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #de4444;
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

export default CreateDetail;
