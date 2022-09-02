/* eslint-disable @next/next/no-img-element */
import React from 'react'
import LinkIcon from '@mui/icons-material/Link'
import Link from 'next/link'

export const Footer = () => {
  React.useEffect(() => {
    var ads = document.getElementsByClassName("adsbygoogle").length;
    for (var i = 0; i < ads; i++) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) { }
    }
}, []);
    const [showButton, setShowButton] = React.useState(false)
    React.useEffect(() => {
      let unMount = true;
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 800 && unMount) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      });
      return () => (unMount=false)
    }, []);
  
    // This function will scroll the window to the top 
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // for smoothly scrolling
      })
    }
  return (
    <>
    <footer className='bg-dark border-top border-1 border-warning'>
        <div className='container'>
                <div className="row text-white">
                    <div className=" col-md-6 col-lg-6 col-xl-3 text-light">
                        <div className='d-flex pt-3'>
                            <Link href='/' passHref>
                              <img style={{height: "46px"}} src="/media/img/logo.png" alt='' />
                            </Link>
                              <h5 className='pt-4 pb-4'>Chuyên trang EPS</h5>
                            
                        </div>
                        <p className='text-white-50'>Sẽ là nơi cho bạn những thông tin cần thiết, kiến thức đầy đủ để có thể tự tin tham dự kì thi EPS-TOPIK
                        cho ước mơ được đặt chân lên xư sở kim chi trở thành hiện thực.
                        </p>
                        <p className='text-white-50'>Chúng ta cùng nhau cố gắng ché...<br />Chúc các bạn sớm đạt được ước mơ 💗💗💗</p>
                        
                    </div>
                    
                    <div className=" col-md-6 col-lg-6 col-xl-3">
                        <div className='pt-3'>
                            <h5 className='pt-4 pb-4'>Chúng tôi cũng có trên</h5>
                            <p>
                              <a className='text-white-50' href='https://www.facebook.com/epstopik.information' target='new'>
                                <img className='me-3' style={{height: "35px"}} src="/media/img/social/face.png" alt='' />
                                <LinkIcon/><span className='align-middle ps-2'>Facebook</span>
                              </a>
                            </p>
                            <p>
                              <a className='text-white-50' href='https://www.youtube.com/c/epstopikvn?sub_confirmation=1' target='new'>
                                <img className='me-3' style={{height: "35px"}} src="/media/img/social/youtube.png" alt='' />
                                <LinkIcon/><span className='align-middle ps-2'>Youtube</span>
                              </a>
                            </p>
                            <Link href='/policies' passHref><a className='pt-4 pb-4 text-white'><h5>Điều khoản & bảo mật</h5></a></Link>
                        </div>
                    </div>
                    <div className=" col-md-6 col-lg-6 col-xl-3">
                        <div className='pt-3'>
                            <h5 className='pt-4 pb-4'>Lớp offline</h5>
                            <p className='text-white-50'>Ai Có nhu cầu học trực tiếp (Tỉnh Bắc Giang và lân cận) hoặc học với hình thức livetream (nếu ở xa) có thể liên hệ cô Nguyễn Thị Chiến<br />
                    SĐT: 0972893015 Để được tư vấn và xếp lớp</p>
                        </div>

                    </div>
                    <div className=" col-md-6 col-lg-6 col-xl-3">
                        <div className='pt-3'>
                            <h5 className='pt-4 pb-4'>Liên kết cho bạn</h5>
                            <div className='footer-col bg-light rounded-3'>
                            <p>
                                <a className='text-white-50' target='new' href='https://www.eps.go.kr/eo/viMain.eo?natNm=vi'>
                                <img style={{width:"100%"}} src="/media/img/link/eps.png" alt='' />
                                </a>
                            </p>
                            <p>
                                <a className='text-white-50' target='new' href='http://www.colab.gov.vn/'>
                                <img style={{width:"100%"}} src="/media/img/link/colab.png" alt='' />
                                </a>
                            </p>
                            <p>
                                <a className='text-white-50' target='new' href='https://eps.hrdkorea.or.kr/epstopik/home/main/mainPage.do?lang=ko'>
                                <img style={{width:"100%"}} src="/media/img/link/eps_topik.png" alt='' />
                                </a>
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <div className='text-center border-top border-1 border-warning mb-0 mt-3'>
             <p className='text-light pt-3 pb-3 mb-0'>Copyright © 2022 Content by <Link href='/'>Vie-ko.com</Link>
             </p>
        </div>
    </footer>
    {/* To top Button */}
    {showButton && (<button onClick={scrollToTop} className="back-to-top">
    <img width={30} src="/media/img/back-to-top.png" alt=""/>
    </button>
    )}
    </>
  )
}
export default Footer