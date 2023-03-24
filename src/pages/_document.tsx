import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import Script from 'next/script';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="author" content="자소서 AI" />
          <meta
            name="description"
            content="자소서 AI는 사용자 맞춤형 자기소개서 작성을 도와드립니다. 전문적인 도움으로 취업 과정을 즐겁게 만들어 보세요!"
          />
          <meta name="keywords" content="자소서, 자기소개서, 이력서, 면접, 취업, 인공지능, AI, 작성 서비스" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://jasoseai.com" />
          <meta
            property="og:title"
            content="당신의 취업 파트너, 자소서 AI | GPT 기반 자기소개서 작성 서비스"
          />
          <meta property="og:image" content="/jasoseoai_profile.png" />
          <meta
            property="og:description"
            content="자소서 AI는 사용자 맞춤형 자기소개서 작성을 도와드립니다. 전문적인 도움으로 취업 과정을 즐겁게 만들어 보세요!"
          />
          <meta property="og:site_name" content="자소서 AI" />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="400" />
          <link rel="manifest" href="/manifest.json" />
          {/* <meta
            name="naver-site-verification"
            content="2a66d49903f97caf7fc50100567da84038ad77d8"
          /> */}
          {/* <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=G-4JQKSR8VFJ`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-4JQKSR8VFJ');
                    `,
            }}
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
