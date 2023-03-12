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
          <meta
            name="naver-site-verification"
            content="2a66d49903f97caf7fc50100567da84038ad77d8"
          />
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="description"
            content="다양한 단백질 식품들을 확인하고 나에게 맞는 상품을 구매해보세요"
          />
          <meta name="keywords" content="단백질, 단백질 식품, 단백질 비교, 단백질 성분, 건강 식품, 피트니스, 헬스, 영양 보충제, 근육, 건강한 식단" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://dansungbee.com" />
          <meta
            property="og:title"
            content="단성비 | 단백질 식품 성분 비교 서비스"
          />
          <meta property="og:image" content="/dansungbee_profile.png" />
          <meta
            property="og:description"
            content="다양한 단백질 식품들을 확인하고 나에게 맞는 상품을 구매해보세요"
          />
          <meta property="og:site_name" content="단성비" />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:image:width" content="800" />
          <meta property="og:image:height" content="400" />
          <link rel="manifest" href="/manifest.json" />
          <Script
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
          />
          <link rel="apple-touch-icon" href="apple-icon-180.png" />
          <meta name="apple-mobile-web-app-capable" content="no" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-2048-2732.jpg"
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-2732-2048.jpg"
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-1668-2388.jpg"
            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-2388-1668.jpg"
            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-1536-2048.jpg"
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-2048-1536.jpg"
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-1668-2224.jpg"
            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-2224-1668.jpg"
            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-1620-2160.jpg"
            media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-2160-1620.jpg"
            media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-1290-2796.jpg"
            media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-2796-1290.jpg"
            media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-1179-2556.jpg"
            media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-2556-1179.jpg"
            media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-1284-2778.jpg"
            media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-2778-1284.jpg"
            media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-1170-2532.jpg"
            media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-2532-1170.jpg"
            media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-1125-2436.jpg"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-2436-1125.jpg"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-1242-2688.jpg"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-2688-1242.jpg"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-828-1792.jpg"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-1792-828.jpg"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-1242-2208.jpg"
            media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-2208-1242.jpg"
            media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-750-1334.jpg"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-1334-750.jpg"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-640-1136.jpg"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="images/apple-splash-1136-640.jpg"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
