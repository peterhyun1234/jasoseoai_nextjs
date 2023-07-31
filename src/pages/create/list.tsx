import { useEffect, useState } from 'react';
import Styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import axios, { AxiosError } from 'axios';

import Inner_TopAppBar_Home from '@/components/appBar/Inner_TopAppBar_Home';
import LoadingPopup from '@/components/popup/LoadingPopup';

const CreateDetail = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [user, setUser] = useState<any>(session?.user || null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resumeList, setResumeList] = useState<any>(null);

  const getResumeList = async () => {
    if (!session) return;
    const accessToken = (session as any)?.accessToken;
    if (!accessToken) return;
    if (!user) return;

    const userId = user.id;

    setIsLoading(true);
    try {
      const response = await axios.get(`/createdResumes?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { data } = response;
      setResumeList(data);
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
    if (!session) return;
    if (!user) return;
    getResumeList();
  }, [user]);

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
        <LoadingPopup loadingText="자기소개서를 불러오는 중입니다." />
      )}
      {<Inner_TopAppBar_Home isSignIn={Boolean(user)} />}
      <WrapBox>
        {user !== undefined && user !== null && user.username !== undefined && (
          <ResumeListTitle>
            <ResumeListTitleSpan>{user.username}</ResumeListTitleSpan>님이
            생성한 자기소개서
          </ResumeListTitle>
        )}
        <ResumeListDiv>
          {resumeList && resumeList.length === 0 && (
            <ResumeListItem>자기소개서가 없습니다.</ResumeListItem>
          )}
          {resumeList?.map((resume: any) => (
            <ResumeListItem
              key={resume.id}
              onClick={() => {
                router.push(`/create/detail/${resume.id}`);
              }}
            >
              <ResumeListItemTitle>{`🧾 ${resume.title}`}</ResumeListItemTitle>
              <ResumeListItemContent>{resume.content}</ResumeListItemContent>
              <ResumeListItemDate>
                {new Date(resume.createdAt).toLocaleString('ko-KR')}
              </ResumeListItemDate>
            </ResumeListItem>
          ))}
        </ResumeListDiv>
      </WrapBox>
    </>
  );
};

const WrapBox = Styled.div`
    width: 100%;
    display: inline-block;
    max-width: 700px;
    padding-top: calc(80px + 100px);
    padding-bottom: 100px;
    min-height: 100vh;
`;
const ResumeListTitle = Styled.div`
    width: 100%;
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: #666;
`;
const ResumeListTitleSpan = Styled.span`
    color: #7876fb;
    font-size: 1.7rem;
`;
const ResumeListDiv = Styled.div`
    width: 100%;
`;
const ResumeListItem = Styled.div`
    width: 100%;
    padding: 1rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    margin-bottom: 0.8rem;
    cursor: pointer;
`;
const ResumeListItemTitle = Styled.div`
    text-align: left;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.7rem;
`;
const ResumeListItemContent = Styled.div`
    text-align: left;
    font-size: 1rem;
    margin-bottom: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
const ResumeListItemDate = Styled.div`
    text-align: right;
    font-size: 0.8rem;
    color: #a1a1a1;
`;

export default CreateDetail;
