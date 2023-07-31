import { useEffect, useState } from 'react';
import Styled from 'styled-components';
import { useRouter } from 'next/router';
import { useCopyToClipboard } from 'react-use';
import { useSession } from 'next-auth/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
      alert('자기소개서 첨삭 결과가 복사되었습니다.');
    }
  };

  const handleDeleteClick = () => {
    if (!session) return;
    const accessToken = (session as any)?.accessToken;
    if (!accessToken) return;
    if (!generatedResume) return;

    if (!confirm('정말로 자기소개서 첨삭 결과를 삭제하시겠습니까?')) return;

    setIsLoading(true);

    try {
      axios.delete(`/correctedResumes/${generatedResume.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert('자기소개서 첨삭 결과가 삭제되었습니다.');
      router.push('/');
    } catch (error) {
      const { response } = error as AxiosError;
      if (response) {
        const { status } = response;
        if (status === 401) {
          alert('로그인이 필요한 서비스입니다.');
          router.push('/auth/signin');
        } else if (status === 404) {
          alert('존재하지 않는 자기소개서 첨삭 결과입니다.');
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
      const response = await axios.get(`/correctedResumes/${resumeid}`, {
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
          alert('존재하지 않는 자기소개서 첨삭 결과입니다.');
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
      alert('잘못된 자기소개서 첨삭 결과 아이디입니다.');
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
    <>
      {isLoading && (
        <LoadingPopup loadingText="자기소개서 첨삭 결과를 불러오는 중입니다." />
      )}
      {<Inner_TopAppBar_Home isSignIn={Boolean(user)} />}
      <WrapBox>
        <CommonBox>
          {generatedResume !== undefined && generatedResume !== null && (
            <WritingBox>
              <WritingBoxTitle>
                {'🧾 '}
                <WritingBoxTitleHighlightSpan>
                  {user.username}
                </WritingBoxTitleHighlightSpan>
                {'님이 작성하신 자기소개서입니다.'}
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
                  value={generatedResume.resume}
                  onChange={() => {
                    return;
                  }}
                />
              </GeneratedResumeDiv>
              <WritingBoxDivider />
              <WritingBoxTitle>
                {'🧾 '}
                <WritingBoxTitleHighlightSpan>
                  {'자소서AI'}
                </WritingBoxTitleHighlightSpan>
                {'의 첨삭 결과입니다.'}
              </WritingBoxTitle>
              {generatedResume.content && generatedResume.content !== '' && (
                <CorrectionDiv>
                  <ReactMarkdown
                    // eslint-disable-next-line react/no-children-prop
                    children={generatedResume.content}
                    // eslint-disable-next-line @next/next/no-img-element
                    components={{
                      img: ({ node, ...props }) => (
                        <img style={{ maxWidth: '100%' }} {...props} alt="" />
                      ),
                    }}
                    remarkPlugins={[remarkGfm]}
                  />
                </CorrectionDiv>
              )}
              <DeleteButton onClick={handleDeleteClick}>
                자소서 첨삭 내용 삭제
              </DeleteButton>
              <CopyButton onClick={handleCopyClick}>
                자소서 첨삭 내용 복사
              </CopyButton>
            </WritingBox>
          )}
        </CommonBox>
      </WrapBox>
    </>
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
    margin-bottom: 25px;
`;
const GeneratedResumeDiv = Styled.div`
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
`;
const DeleteButton = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 25px;
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
        word-wrap: break-word;
        white-space: pre-wrap;
    }
`;

export default CreateDetail;
