import React from 'react'
import Script from 'next/script'
import * as gtag from '../lib/gtag'
import { useRouter } from 'next/router'

const ScriptElement = () => {
  const router = useRouter()

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
                });
            `,
            }}
        />
        <Script
            id="fb-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.fbAsyncInit = function() {
                FB.init({
                  appId      : '155570839747933',
                  xfbml      : true,
                  version    : 'v13.0'
                });
                FB.AppEvents.logPageView();
              };
            
              (function(d, s, id){
                 var js, fjs = d.getElementsByTagName(s)[0];
                 if (d.getElementById(id)) {return;}
                 js = d.createElement(s); js.id = id;
                 js.src = "https://connect.facebook.net/vi_VN/sdk.js";
                 fjs.parentNode.insertBefore(js, fjs);
               }(document, 'script', 'facebook-jssdk'));
            `,
            }}
        />
    </>
  )
}

export default ScriptElement