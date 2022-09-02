/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en' data-theme="light">
      <Head>
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="theme-color" content="#517ca4" />
      <meta name="twitter:site" content="@Trien34429233" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:image:alt" content="Vieko-Eps" />
      <meta property="og:site_name" content="Eps-Topik" />
      <meta property="og:url" content="https://www.vie-ko.com" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="628" />
      <meta property="fb:admins" content="100003645008192"/>
      <meta property="fb:pages" content="1217355098415581"/>
      <meta property="fb:app_id" content="155570839747933"/>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
              integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
              crossOrigin="anonymous"></script>
      <script type="text/javascript" src="/data/data.js"></script>
      <script type="text/javascript" src="/data/myscript.js"></script>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      </Head>
      <body className='bg-dl'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}