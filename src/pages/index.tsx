import { useEffect, useState } from 'react';
import Styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Home = () => {
    const router = useRouter()

    useEffect(() => {
        console.log('Home.tsx useEffect')
        console.log('location', location)
        console.log('router', router)
    }, [])

    return (
        <div >
            <WrapBox>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
                <h1>Home</h1>
            </WrapBox>
        </div>
    )
};

const WrapBox = Styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 60px;
`

export default Home;