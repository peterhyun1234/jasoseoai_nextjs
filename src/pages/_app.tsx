import '@/assets/styles/globals.css';
import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'styled-components';
import theme from '@/assets/styles/theme';
import Head from 'next/head';
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
        <title>단성비 | 단백질 식품 성분 비교 서비스</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
