import '@/assets/styles/globals.css';
import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import theme from '@/assets/styles/theme';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

axios.defaults.baseURL = publicRuntimeConfig.API_SERVER_URI;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
        <title>당신의 취업 파트너, 자소서 AI | GPT 기반 자기소개서 작성 서비스</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
