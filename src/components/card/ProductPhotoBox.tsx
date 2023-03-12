import React from 'react';
import Styled from 'styled-components';
import Image from 'next/image';

interface Props {
    imagePath: any,
}
const ProductPhotoBox = ({ imagePath }: Props) => {
    return (
        <WrapBox>
            <ImgContainer>
                <ImgBox
                    width={250}
                    height={250}
                    alt="imagePath" src={imagePath} />
            </ImgContainer>
        </WrapBox>
    )
};

const WrapBox = Styled.div`
    display: inline-block;
    width: 100%;
    text-align: center;
    position: relative;
`
const ImgContainer = Styled.div`
    position: relative;
    width: 100%;
    height: 250px;
`
const ImgBox = Styled(Image)`
    width: 250px;
    height: auto;
    object-fit: cover;
`

export default ProductPhotoBox;