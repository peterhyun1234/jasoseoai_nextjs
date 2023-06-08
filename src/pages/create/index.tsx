import { useEffect, useState } from 'react';
import Styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Inner_TopAppBar_Home from '@/components/appBar/Inner_TopAppBar_Home';

const Create = () => {
    const router = useRouter()

    useEffect(() => {
        console.log('location', location)
        console.log('router', router)
    }, [])

    return (
        <div style={{
          backgroundImage: `url(images/bg_common.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
        }}>
            {
                <Inner_TopAppBar_Home />
            }
            <WrapBox>
                <h1>Page 1</h1>
                <h1>이 기능에 대한 안내</h1>
                <h1>gif로 설명 짤 만들면 메인페이지에서 활용 가능</h1>
                <h1>시작하기 버튼</h1>
                <h1>---</h1>
                <h1>Page 2</h1>
                <h1>회사 정보 입력</h1>
                <h1>회사 이름 *</h1>
                <h1>회사 설명 * (짧게)</h1>
                <h1>지원하는 직무 내용 *(3줄까지 추가 가능)</h1>
                <h1>---</h1>
                <h1>Page 3</h1>
                <h1>개인 정보 입력</h1>
                <h1>이름 *</h1>
                <h1>학력 *(~학교*, ~과 이거 추가할 수 있도록 ㄱㄱ)</h1>
                <h1>경력사항</h1>
                <h1>자격증</h1>
                <h1>주요 프로젝트</h1>
                <h1>성격의 장단점</h1>
                <h1>기타: 본인의 전문 기술, 언어 능력, 컴퓨터 능력, 봉사 활동, 취미, 특별한 경험 등의 추가 정보를 고려할 수 있습니다.</h1>
                <h1>---</h1>
                <h1>Page 4</h1>
                <h1>자기소개서 양식</h1>
                <h1>자소서 항목(질문) - 글자 제한</h1>
                <h1>자소서 항목(질문) - 글자 제한</h1>
                <h1>자소서 항목(질문) - 글자 제한</h1>
                <h1>자소서 항목(질문) - 글자 제한</h1>
                <h1>추가 버튼</h1>
                <h1>생성 버튼</h1>
                <h1>---</h1>
                <h1>Page 5</h1>
                <h1>생성된 자소서</h1>
            </WrapBox>
        </div>
    )
};

const WrapBox = Styled.div`
    width: 100%;
    display: inline-block;
    max-width: 1000px;
    padding-top: 80px;
`

export default Create;