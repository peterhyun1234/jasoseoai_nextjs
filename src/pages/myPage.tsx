import { use, useEffect, useState } from 'react';
import Styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';

import Inner_TopAppBar_Home from '@/components/appBar/Inner_TopAppBar_Home';

const deleteConfirmation = `정말로 탈퇴하시겠습니까?
탈퇴하시면 모든 정보가 삭제되며 복구할 수 없습니다.
`;

const tokenSupplement = `토큰은 자기소개서 생성, 문장 추천, 첨삭에 사용됩니다.
추가 토큰을 원하시면 아래의 이메일로 문의해주세요.

이메일: peterhyun1234@gmail.com
`;

const MyPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [user, setUser] = useState<any>(session?.user || null);
  const [remainingToken, setRemainingToken] = useState<any>(null);

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  const handleDeleteUser = () => {
    if (!confirm(deleteConfirmation)) return;

    deleteUser();
  };

  const deleteUser = async () => {
    if (!session) return;
    if (!user) return;
    const accessToken = (session as any)?.accessToken;
    if (!accessToken) return;

    const userId = user.id;
    await axios.delete(`/users/id/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    signOut();
    router.push('/');
  };

  const getRemainingToken = async () => {
    if (!session) return;
    if (!user) return;
    const accessToken = (session as any)?.accessToken;
    if (!accessToken) return;

    const userId = user.id;
    const response = await axios.get(`/users/id/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const recvUser = response.data;
    const curRemainingToken = [
      { name: '자기소개서 생성', remaining: recvUser.remainingCreateTokens },
      {
        name: '자기소개서 문장 추천',
        remaining: recvUser.remainingWriteTokens,
      },
      { name: '자기소개서 첨삭', remaining: recvUser.remainingCorrectTokens },
    ];
    setRemainingToken(curRemainingToken);
  };

  useEffect(() => {
    if (!session) return;
    if (!user) return;
    getRemainingToken();
  }, [user]);

  useEffect(() => {
    if (session !== undefined && session === null) {
      if (confirm('로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?')){
        router.push('/auth/signin');
      }
    }
    if (!session) return;
    if (!session.user) return;
    setUser(session?.user);
  }, [session]);

  return (
    <>
      {user && user.id && (
        <>
          {<Inner_TopAppBar_Home isSignIn={Boolean(user)} />}
          <WrapBox>
            {user && (
              <MyPageDiv>
                <ProfileImgDiv>
                  {user?.picture && (
                    <ProfileImg
                      loader={() => user.picture}
                      src={user.picture}
                      alt="User profile image"
                      width={80}
                      height={80}
                    />
                  )}
                </ProfileImgDiv>
                <UserName>{user?.username}</UserName>
                <Email>{user?.email}</Email>
                <Divider />
                {remainingToken && remainingToken.length > 0 && (
                  <RemainingTokenDiv>
                    <RemainingTokenTitleDiv>
                      <RemainingTokenTitle>
                        남은 토큰(사용량)
                      </RemainingTokenTitle>
                      <SupplementText
                        onClick={() => alert(tokenSupplement)}
                      >토큰 추가 신청(무료)</SupplementText>
                    </RemainingTokenTitleDiv>
                    <RemainingTokenList>
                      {remainingToken.map((token: any, index: number) => (
                        <RemainingTokenItem key={index}>
                          <RemainingTokenName>{token.name}</RemainingTokenName>
                          <RemainingTokenCount>
                            {token.remaining}
                          </RemainingTokenCount>
                        </RemainingTokenItem>
                      ))}
                    </RemainingTokenList>
                  </RemainingTokenDiv>
                )}
                <Divider />
                <Button onClick={handleSignOut}>로그아웃</Button>
                <Button onClick={handleDeleteUser}>탈퇴하기</Button>
              </MyPageDiv>
            )}
          </WrapBox>
        </>
      )}
    </>
  );
};

const WrapBox = Styled.div`
  width: 100%;
  display: inline-block;
  max-width: 1000px;
  padding-top: calc(80px + 70px);
  padding-bottom: 100px;
  min-height: 100vh;

  @media (max-width: 650px) {
    padding-top: 70px;
  }

  text-align: center;
`;
const MyPageDiv = Styled.div`
  width: 100%;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;
const ProfileImgDiv = Styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  cursor: pointer;
`;
const ProfileImg = Styled(Image)`
  height: 80px;
  width: 80px;
  object-fit: cover;
  background-color: #fff;
  border-radius: 50%;
  border: solid 1px #9e9e9e;
  display: inline-block;
`;
const UserName = Styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-top: 10px;
`;
const Email = Styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
`;
const Divider = Styled.div`
  width: 100%;
  height: 1px;
  background-color: #9e9e9e;
  margin: 20px 0;
`;
const Button = Styled.button`
  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  padding: 12px 0;
  height: 40px;
  margin-bottom: 16px;
  border: none;
  border-radius: 10px;
  background-color: #7876fb;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #49489a;
  }
`;
const RemainingTokenDiv = Styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
const RemainingTokenTitleDiv = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const RemainingTokenTitle = Styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const SupplementText = Styled.div`
  font-size: 13px;
  font-weight: 500;
  padding: 3px 5px;
  color: #7876fb;
  border: 1px solid #7876fb;
  border-radius: 5px;
  cursor: pointer;
`;
const RemainingTokenList = Styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const RemainingTokenItem = Styled.div`
  width: 100%;

`;
const RemainingTokenName = Styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 10px;
`;
const RemainingTokenCount = Styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #7876fb;
`;

export default MyPage;
