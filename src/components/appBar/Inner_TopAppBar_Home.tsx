import React, { useState, useCallback, useRef, useEffect } from 'react';
import Styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Drawer from '@mui/material/Drawer';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import LOGO from '@/assets/images/jasoseoai_logo.png';
import LOGO_TEXT from '@/assets/images/jasoseoai_logo_text.png';

type Props = {
  isSignIn?: boolean;
};
const Inner_TopAppBar_Home = ({ isSignIn }: Props) => {
  const router = useRouter();

  const [pageYOffset, setPageYOffset] = useState<any>(0);
  const [innerWidth, setInnerWidth] = useState<any>(1000);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsMenuOpen(open);
  };

  const menuList = () => (
    <MenuList>
      <MenuListProfileImg alt="Logo" src={LOGO_TEXT} onClick={() => onClickLogo()} />
      <MenuDivider />
      <MenuListItem
        onClick={() => {
          router.push('/create');
          setIsMenuOpen(false);
        }
        }
      >
        자소서 생성
      </MenuListItem>
      <MenuListItem
        onClick={() => {
          router.push('/write');
          setIsMenuOpen(false);
        }
        }
      >
        자소서 문장 추천
      </MenuListItem>
      <MenuListItem
        onClick={() => {
          router.push('/correct');
          setIsMenuOpen(false);
        }
        }
      >
        자소서 첨삭
      </MenuListItem>
      <MenuDivider />
      {isSignIn ? (
        <MenuListItem
          onClick={() => {
            router.push('/myPage');
            setIsMenuOpen(false);
          }
          }
        >
          계정 관리
        </MenuListItem>
      ) : (
        <MenuListItem
          onClick={() => {
            router.push('/auth/signin');
            setIsMenuOpen(false);
          }
          }
        >
          로그인
        </MenuListItem>
      )}
      <MenuListItem
        onClick={() => {
          window.open('https://peterjeon.co.kr', '_blank');
          setIsMenuOpen(false);
        }
        }
      >
        Contact
      </MenuListItem>
    </MenuList>
  );

  const onClickLogo = () => {
    router.push('/');
  };

  const handleScroll = () => {
    const curScrollTop = window.pageYOffset;
    setPageYOffset(curScrollTop);
  };

  const handleResize = () => {
    const curInnerWidth = window.innerWidth;
    setInnerWidth(curInnerWidth);
  };

  useEffect(() => {
    //TODO: 스크롤 이벤트, 리사이즈 이벤트 media query로 대체
    setInnerWidth(window.innerWidth);
    setPageYOffset(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <WrapBox scrollTop={pageYOffset}>
      {innerWidth <= 800 ? (
        <AppBarDetailDiv>
          <AppBarLeftDiv>
            <LogoBtn alt="Logo" src={LOGO_TEXT} onClick={() => onClickLogo()} />
          </AppBarLeftDiv>
          <AppBarCenterDiv></AppBarCenterDiv>
          <AppBarRightDiv>
            <MenuIconDiv onClick={toggleDrawer(true)}>
              <MenuRoundedIcon fontSize='inherit' color='inherit' />
            </MenuIconDiv>
          </AppBarRightDiv>
        </AppBarDetailDiv>
      ) : (
        <AppBarDetailDiv>
          <AppBarLeftDiv>
            <LogoBtn alt="Logo" src={LOGO_TEXT} onClick={() => onClickLogo()} />
            <AppBarDivider />
            <MenuBtn
              isSelected={router.pathname === '/create'}
              onClick={() => router.push('/create')}
            >
              자소서 생성
            </MenuBtn>
            <MenuBtn
              isSelected={router.pathname === '/write'}
              onClick={() => router.push('/write')}
            >
              자소서 문장 추천
            </MenuBtn>
            <MenuBtn
              isSelected={router.pathname === '/correct'}
              onClick={() => router.push('/correct')}
            >
              자소서 첨삭
            </MenuBtn>
          </AppBarLeftDiv>
          <AppBarCenterDiv></AppBarCenterDiv>
          <AppBarRightDiv>
            {isSignIn ? (
              <ProfileManagementBtn onClick={() => router.push('/myPage')}>
                <p>계정 관리</p>
              </ProfileManagementBtn>
            ) : (
              <SignBtn onClick={() => router.push('/auth/signin')}>
                <p>로그인</p>
              </SignBtn>
            )}
            <ContactBtn
              onClick={() => {
                window.open('https://peterjeon.co.kr', '_blank');
              }}
            >
              <p>Contact</p>
            </ContactBtn>
          </AppBarRightDiv>
        </AppBarDetailDiv>
      )}
    </WrapBox>
    {
      <Drawer
        anchor={'right'}
        open={isMenuOpen}
        onClose={toggleDrawer(false)}
      >
        {menuList()}
      </Drawer>
    }
    </>
  );
};

const LogoBtn = Styled(Image)`
    margin-bottom: 10px;
    width: 120px;
    height: 40px;
`;
const WrapBox = Styled.div<{ scrollTop: number }>`
    background-color: rgba(255, 255, 255, ${(props) =>
      props.scrollTop >= 80 && props.scrollTop <= 160
        ? (props.scrollTop - 80) / 80
        : props.scrollTop > 160
        ? 1
        : 0});
    border-bottom: 1px solid rgba(0, 0, 0, ${(props) =>
      props.scrollTop >= 80 && props.scrollTop <= 160
        ? (props.scrollTop - 80) / 800
        : props.scrollTop > 160
        ? 0.1
        : 0});
    height: 80px;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
`;
const AppBarDetailDiv = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    padding-right: 16px;
    padding-left: 16px;
`;
const AppBarLeftDiv = Styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 25px;
`;
const AppBarCenterDiv = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const AppBarDivider = Styled.div`
    width: 20px;
`;
const AppBarRightDiv = Styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 25px;
`;
const MenuBtn = Styled.div<{ isSelected: boolean }>`
    ${(props) =>
      props.isSelected === true &&
      `background: linear-gradient(65deg, rgba(153,196,0,1) 0%, rgba(1,99,49,1) 33%, rgba(25,153,149,1) 70%, rgba(2,129,154,1) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`}
    font-size: 16px;
    font-weight: 500;
    color: #333;
    word-spacing: -2px;
    cursor: pointer;
    &:hover {
        font-size: 17px;
        font-weight: 600;
        background: linear-gradient(65deg, rgba(153,196,0,1) 0%, rgba(1,99,49,1) 33%, rgba(25,153,149,1) 70%, rgba(2,129,154,1) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;
const ProfileManagementBtn = Styled.div`
    padding: 7px 20px;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    background-color: #428d93;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color .3s ease, color .3s ease;
    -webkit-box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 15px 3px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 15px 3px;

    &:hover {
        -webkit-box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 15px 3px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 15px 3px;
    }
`;
const SignBtn = Styled.div`
    padding: 7px 20px;
    font-size: 15px;
    font-weight: 600;
    color: #428d93;
    border: 2px solid #428d93;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color .3s ease, color .3s ease;

    &:hover {
        background-color: #428d93;
        color: #fff;
    }
`;
const ContactBtn = Styled.div`
    padding: 7px 20px;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    background-color: #e7bcbc;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color .3s ease, color .3s ease;
    -webkit-box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 15px 3px; 
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 15px 3px;

    &:hover {
        -webkit-box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 15px 3px; 
        box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 15px 3px;
    }
`;
const MenuIconDiv = Styled.div`
  width: 40px;
  height: 40px;
  font-size: 30px;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const MenuList = Styled.div`
  width: 300px;
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: #fff;
`;
const MenuListProfileImg = Styled(Image)`
  width: 180px;
  height: 60px;
  margin-bottom: 40px;
`;
const MenuDivider = Styled.div`
  width: 100%;
  height: 1px;
  background-color: #d2d2d2;
`;
const MenuListItem = Styled.div`
  width: 100%;
  text-align: left;
  padding: 20px 20px;
  font-size: 16px;
  font-weight: 500;
  color: #575757;
  cursor: pointer;
  &:hover {
    font-size: 17px;
    font-weight: 600;
    background: linear-gradient(65deg, rgba(153,196,0,1) 0%, rgba(1,99,49,1) 33%, rgba(25,153,149,1) 70%, rgba(2,129,154,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export default Inner_TopAppBar_Home;
