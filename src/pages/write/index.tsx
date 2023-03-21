import { SetStateAction, useEffect, useRef, useState } from 'react';
import Styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';

import axios from 'axios';

import Inner_TopAppBar_Home from '@/components/appBar/Inner_TopAppBar_Home';
import TextField from '@mui/material/TextField';

interface Tag {
    id: string;
    title: string;
}

interface Props {
    tags: Tag[];
}

const Write = () => {
    const router = useRouter()

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [resumeQuestion, setResumeQuestion] = useState<string>('자발적으로 최고 수준의 목표를 세우고 끈질기게 성취한 경험에 대해 서술해 주십시오')
    const [writingResume, setWritingResume] = useState<string>(`자발적으로 최고 수준의 목표를 세우고 끈질기게 성취한 경험은 대학교 3학년 때 진행했던 모바일 애플리케이션 개발 프로젝트입니다. 이 프로젝트는 소셜 미디어를 활용하여 지역의 문화와 관광 명소를 홍보하는 앱을 개발하는 것이 목표였습니다.

    프로젝트 초기에 저는 팀장으로 선정되어 최고 수준의 목표를 세웠습니다. 그 목표는 사용자들이 쉽게 찾을 수 있고, 지역의 문화와 관광 명소에 대한 정보를 효과적으로 전달하는 앱을 만드는 것이었습니다. 이를 위해 팀원들과 함께 기획부터 디자인, 개발, 마케팅까지 모든 과정을 직접 수행하며 경험을 쌓기로 했습니다.
    
    끈질긴 도전의 시작은 개발 과정에서 팀원들과 함께 수많은 난관을 극복한 것입니다. 특히, 사용자들에게 맞춤화된 정보를 제공하는 알고리즘을 구현하는 과정에서 큰 어려움을 겪었습니다. 이를 해결하기 위해 저와 팀원들은 끊임없이 시행착오를 겪으며 알고리즘을 개선해 나갔습니다.
    
    또한, 소셜 미디어를 활용한 마케팅 전략을 세우는 과정에서도 많은 시간과 노력을 기울였습니다. 효과적인 광고 콘텐츠를 제작하고, 사용자들과 소통할 수 있는 다양한 채널을 활용하여 앱의 인지도를 높이는 데 기여했습니다.
    
    결국, 끈질긴 도전 끝에 애플리케이션은 성공적으로 출시되었고, 지역 문화와 관광 명소를 홍보하는데 큰 도움이 되었습니다. 사용자들로부터 좋은 평가를 받았으며, 다양한 경진대회에서 수상한 바 있습니다.
    
    이 경험을 통해 저는 목표를 세우고 끈질기게 도전하는 것이 성공으로 이어지는 것을 몸소 느꼈습니다.`)
    const [generatedText, setGeneratedText] = useState<string>('')
    const [generatedTextLocation, setGeneratedTextLocation] = useState<{width: number, height: number}>({ width: 0, height: 0 })

    const handleResumeQuestionChange = (e: any) => {
        setResumeQuestion(e.target.value)
    }

    const handleWritingResumeChange = (e: any) => {
        setWritingResume(e.target.value)

        const textarea = textareaRef.current;
        if (textarea) {
          const height = textarea.scrollHeight;
          const width = textarea.scrollWidth;
          setGeneratedTextLocation({ width: width, height: height })
        }
    }

    const generateNextSentence = async (currentResume: string) => {
        try {
            const prompt = `자기소개서 내용에서 문장이 끝났다면 다음 문장을 추천하고, 문장이 끝나지 않았다면 문장을 완성할 이어지는 문장을 추천해줘. 아래 내용을 참고해줘.
            - 자기소개서 항목: ${resumeQuestion}
            - 자기소개서 내용: ${currentResume}
          `;

            const response = await axios.post('https://api.openai.com/v1/completions', {
                model: 'text-davinci-003',
                prompt: prompt,
                max_tokens: 1200,
                n: 1,
                stop: null,
                temperature: 0.7,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer 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`,
                },
            });
            const generatedText = response.data.choices[0].text.trim();
            if (generatedText !== null && generatedText !== undefined && generatedText.length > 0) {
                setGeneratedText(generatedText)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log('generatedText: ', generatedText)
        console.log('generatedTextLocation: ', generatedTextLocation)
    }, [generatedText, generatedTextLocation])

    useEffect(() => {
        console.log('writingResume: ', writingResume)

        setGeneratedText('')
        const timeout = setTimeout(() => {
            console.log('writingResume.length: ', writingResume.length)
            if (writingResume.length > 5) {
                generateNextSentence(writingResume.slice(Math.max(writingResume.length - 500, 0)))
            }
        }, 50)
        return () => clearTimeout(timeout)
    }, [writingResume])

    return (
        <>
            {
                <Inner_TopAppBar_Home />
            }
            {/* {
                generatedText !== null && generatedText !== undefined && generatedText.length > 0 &&
                <SuggestionBox
                    top={generatedTextLocation.height}
                    left={generatedTextLocation.width}
                >
                    <h3>추천 문장</h3>
                    <p>{generatedText}</p>
                </SuggestionBox>
            } */}
            <WrapBox>
                <h1>자기소개서 항목</h1>
                <TextField
                    id="resumeQuestion"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                    value={resumeQuestion}
                    onChange={handleResumeQuestionChange}
                />
                <h1>항목에 대한 자기소개서 내용</h1>
                <SuggestionTempBox>
                    <h3>추천 문장</h3>
                    <p>{generatedText}</p>
                </SuggestionTempBox>
                <TextField
                    id="writingResume"
                    inputRef={textareaRef}
                    fullWidth
                    multiline
                    rows={20}
                    value={writingResume}
                    onChange={handleWritingResumeChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Tab') {
                            e.preventDefault();
                            if (generatedText !== null && generatedText !== undefined && generatedText.length > 0) {
                                setWritingResume(writingResume + generatedText)
                            }
                        }
                    }}
                />
            </WrapBox>
        </>
    )
};

const WrapBox = Styled.div`
    width: 100%;
    display: inline-block;
    max-width: 1000px;
    padding-top: 60px;
    padding-bottom: 100px;
`
const SuggestionBox = Styled.div<{top: number, left: number}>`
    position: absolute;
    top: ${props => props.top}px;
    left: ${props => props.left}px;
    width: 300px;
    height: 200px;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    z-index: 100;
`
const SuggestionTempBox = Styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 30px;
    width: 50%;
    height: 200px;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    z-index: 100;
`

export default Write;