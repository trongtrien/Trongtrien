import React from 'react';
import { baseUrl } from '../baseUrl';
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  ViberShareButton,
  LineShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
  ViberIcon,
  LineIcon,
} from 'react-share';

export default function ShareSocial ({shareUrl, title}) {

    const FacebookShare = () => <div className="share-social">
                                  <FacebookShareButton
                                    url={`${baseUrl}${shareUrl}`}
                                    quote={title}
                                    className="share-social__share-button"
                                  >
                                    <FacebookIcon size={30} round />
                                  </FacebookShareButton>
                                </div>

    const FacebookMessengerShare = () => <div className="share-social">
                                          <FacebookMessengerShareButton
                                            url={`${baseUrl}${shareUrl}`}
                                            appId="521270401588372"
                                            className="share-social__share-button"
                                          >
                                            <FacebookMessengerIcon size={30} round />
                                          </FacebookMessengerShareButton>
                                        </div>

    const TwitterShare = () =>  <div className="share-social">
                                  <TwitterShareButton
                                    url={`${baseUrl}${shareUrl}`}
                                    title={title}
                                    className="share-social__share-button"
                                  >
                                    <TwitterIcon size={30} round />
                                  </TwitterShareButton>
                                </div>

    const WhatsappShare = () =>  <div className="share-social">
                                  <WhatsappShareButton
                                    url={`${baseUrl}${shareUrl}`}
                                    title={title}
                                    separator=":: "
                                    className="share-social__share-button"
                                  >
                                    <WhatsappIcon size={30} round />
                                  </WhatsappShareButton>
                                </div>

    const LinkedinShare = () =>  <div className="share-social">
                                  <LinkedinShareButton
                                    url={`${baseUrl}${shareUrl}`}
                                    className="share-social__share-button">
                                    <LinkedinIcon size={30} round />
                                  </LinkedinShareButton>
                                </div>

    const EmailShare = () =>  <div className="share-social">
                                  <EmailShareButton
                                    url={`${baseUrl}${shareUrl}`}
                                    subject={title}
                                    body="body"
                                    className="share-social__share-button"
                                  >
                                    <EmailIcon size={30} round />
                                  </EmailShareButton>
                                </div>

    const ViberShare = () =>  <div className="share-social">
                                <ViberShareButton
                                  url={`${baseUrl}${shareUrl}`}
                                  title={title}
                                  className="share-social__share-button"
                                >
                                  <ViberIcon size={30} round />
                                </ViberShareButton>
                              </div>

    const LineShare = () =>  <div className="share-social">
                                <LineShareButton
                                  url={`${baseUrl}${shareUrl}`}
                                  title={title}
                                  className="share-social__share-button"
                                >
                                  <LineIcon size={30} round />
                                </LineShareButton>
                              </div>


   return (<>
      <FacebookShare />
      <FacebookMessengerShare />
      <TwitterShare />
      <EmailShare />
      <LineShare />
      <WhatsappShare />
      <LinkedinShare />
      <ViberShare />
   </>
   )
 }