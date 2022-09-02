/* eslint-disable @next/next/inline-script-id */
import { useState} from 'react'
import '../styles/globals.css'
import '../styles/theme.css'
import Head from 'next/head'
import Router from 'next/router'
import Loadding from '../components/loadding'
import { ThemeProvider } from 'next-themes'
import ScriptElement from '../components/Script'

function MyApp({ Component, pageProps }) {
  const [loadding, setLoadding] = useState(false)
  Router.events.on('routeChangeStart', () => {
    setLoadding(true)})
  Router.events.on('routeChangeComplete', () => {
    setLoadding(false)})

  return <>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
          </Head>
          {loadding&&<Loadding />}
          <ThemeProvider><Component {...pageProps} /></ThemeProvider>
          <ScriptElement />
         </>
}

export default MyApp
