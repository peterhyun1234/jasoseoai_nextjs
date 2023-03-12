import React from 'react';
import Styled from 'styled-components';
import Image from 'next/image';

const PrecautionCard = () => {

    return (
        <PrecautionDiv>
            <p>* 단성비 데이터는 최신 정보가 아니거나 오류가 있을 수 있습니다.</p>
            <p>* 구매 전 제조판매업자가 표기한 전성분표를 확인하시길 권장드립니다.</p>
            <p>* 상품 구매를 위한 참고 정보이며, 상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.</p>
            <p>* 단성비은 통신판매 중개자이며, 통신판매의 당사자가 아닙니다.</p>
            <p>* 단성비 데이터를 허가없이 상업적으로 활용할 시 법적 조치를 받을 수 있습니다.</p>
            <p>* 본 포스팅은 파트너스 활동의 일환으로 일정액의 수수료를 제공받을 수 있음을 알려드립니다.</p>
        </PrecautionDiv>
    )
};

const PrecautionDiv = Styled.div`
    padding: 20px;
    font-size: 8px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    text-align: left;
    color: #bcbcbc;
    background-color: #f9f9f9;
`
export default PrecautionCard;