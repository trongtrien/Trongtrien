/* eslint-disable @next/next/no-img-element */
import React, {useEffect} from 'react'
import emailjs from '@emailjs/browser'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from '@mui/icons-material/Close';
// import Fbcomment from '../hooks/Fbcomment'
import Tag from '../utils/Tag'
import ShareSocial from '../utils/share/ShareSocial'
import Axios from '../components/apiRequest/Axios';
import DefaultLayout from '../components/DefaultLayout';
import Adsense from '../components/ads/DisplayAds';

export async function getServerSideProps() {
   try {
    const resp = await Axios({method: "get", url:"/courseviews/18"})
    return {
      props: {
        view: await resp.data.map(p => p.pageview),
      },
    };
   } catch (error) {
    return {
        props: {
            err: "Error: not connected. Please check your Internet connection and try"
        },
      }
   }
  }

const DownloadTemp = ({view}) => {
  const [list, setlist] = React.useState([])

  const [show, setShow] = React.useState(false)
  const [meg, setMeg] = React.useState('')

//   download
  const [isDownload, setIsDownload] = React.useState(false)
  const [urlDownload, seturlDownload] = React.useState('')
  const [title, settitle] = React.useState('')
  const [seconds, setSeconds] = React.useState(0)

  useEffect(() => {
     if(seconds> 0) {
        setTimeout(() => setSeconds(prev => prev - 1), 1000)
     }
     return () => (clearTimeout(seconds))
  },[seconds])

  const [sendStatus, setSendStatus] = React.useState(false)
  const form = React.useRef();
  
  //   share social
  const [showShare, setShowShare] = React.useState(false)


    useEffect(() => {
        setlist(window.listdownload)
        Axios({
            method: 'PUT',
            url: '/courseviews/18'
        })
    },[])

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_y9ia8nd','template_dsnh7ls', form.current, 'drEmL9JG_FYfIX-VM')
      .then((result) => {
        setMeg('Đã tiếp nhận yêu cầu, chúng tôi sẽ gửi tài liệu cho bạn sớm nhất có thể!');
      }, (error) => {
        setMeg('Có vẻ như bạn chưa nhập đúng, đủ các trường thông tin bên dưới');
      });
  };
  return (<DefaultLayout>
            <div className="container bg-dl">
                <div className="row pt-5">
                    <div className="col-lg-8 col-xl-9 p-3 download-row">
                        <img className='p-0 rounded-3' src='/media/img/eps/doc-dl.jpg' alt='' />
                        <div className='d-flex mt-3 text-dl'>
                                            <span className='me-auto'>10/05/2022</span>
                                            <span className='m-0 p-0 me-3 btn'
                                            onClick={() => setShowShare(!showShare)}
                                            >
                                                Share <i className="fa fa-share-alt text-logo-b" aria-hidden="true"></i>
                                            </span>
                                            <span>{view?view:"0"} <i className="fa fa-eye text-logo-b" aria-hidden="true"></i></span>
                                        </div>
                                        {showShare&&<div className='mt-4 bg-secondary bg-opacity-25 rounded pt-3 pb-3 text-center'>
                                        <ShareSocial shareUrl='/Download' title='Tải tài liệu EPS-TOPIK'/>
                                        </div>}
                        <div className='row pb-4 pt-0 text-dl'>
                            <h4>Nếu bạn gặp khó khăn khi tải có thể để lại email bọn mình sẽ gửi ạ</h4>
                            {!show&&<div><button className="btn btn-primary p-3" onClick={() => {
                                setMeg('')
                                setShow(!show)
                            }}>Đăng ký nhận tài liệu qua email</button>
                            <h4>{(!meg&&sendStatus)&&'Lỗi rồi, có thể bạn nhập chưa đúng thông tin'}{(meg&&sendStatus)&&meg}</h4></div>}
                            {show&&<form className="d-flex flex-column" ref={form} onSubmit={sendEmail}>
                                <label htmlFor="name" className='mt-4'>
                                Name:
                                <input name="name" id="name" type="text" className="form-control" placeholder='Enter Your Name' required />
                                </label>
                                <label htmlFor="email" className='mt-4'>
                                Email:
                                <input name="email" id="email" type="email" className="form-control" placeholder='Enter Your Email' required />
                                </label>
                                <label htmlFor="message" className='mt-4'>
                                Tài liệu muốn nhận:
                                <textarea name="message" id="message" type="text" className="form-control" placeholder='Enter Your Require' rows={3}></textarea>
                                </label>
                                <div className='d-flex'>
                                    <button className="btn btn-primary p-3 mt-5 me-auto" type='submit' onClick={() => {
                                    setTimeout(() => {
                                    setShow(!show)
                                    setSendStatus(true)
                                    },1500)
                            }}>Submit</button>
                                    <button className="btn btn-primary p-3 mt-5" type='reset'>Reset</button>
                                    <button className="btn btn-primary p-3 mt-5" type='reset' onClick={()=>{setShow(!show)}}>Close</button>
                                </div>
                            </form>}
                            {list&&list.map(load=>
                            <div key={load.headding}>
                                <h3 className='mt-5 ms-3 pb-2'><strong><span>{load.headding.toUpperCase()}</span></strong></h3>
                                <hr className='text-success mb-3'/>
                                    {load.down.map(down=><div key={down.title}>
                                        <h3 className='mt-5 ms-3 pb-2 download-row-img'><img className='me-3' src='/media/img/mui_ten_r.png' alt='' /><strong><span>{down.title}</span></strong></h3>
                                        <div className='row m-0 mb-4'>
                                            {down.links.map((link, index)=>
                                                <div className="col-md-6 col-lg-6 mb-4" key={index}>
                                                    <img src={link.imgSrc} alt='' />
                                                    <button type="button"
                                                            className='border-0'
                                                            onClick={() => {
                                                                seturlDownload(link.link)
                                                                settitle(link.title)
                                                                setIsDownload(!isDownload)
                                                                setSeconds(10)
                                                                }}>
                                                             Download <span className='ms-3'><FileDownloadIcon/></span>
                                                    </button>
                                                </div>)}
                                        </div>
                                    </div>)}
                            </div>)}
                            <div className={`download-modal ${isDownload&&"download-modal-show"} text-light`}>
                                <div className='download-popup bg-secondary rounded shadow'>
                                    <div className='d-flex m-0'>
                                        <h5 className='ps-3 m-0 pt-3 pb-2'>{title&&title}</h5>
                                        <h5 className='m-0 ms-auto pt-2 pb-2 pe-3'>
                                            <span className="btn text-light" onClick={() => {
                                                setIsDownload(!isDownload)
                                                setSeconds(0)
                                                clearTimeout(seconds)
                                            }}><CloseIcon /></span>
                                        </h5>
                                    </div><hr className='m-0 p-0' />
                                    <div className='ps-3 pe-3'>
                                            <Adsense slot="8882564828" />
                                            {seconds==0?<>
                                                <span className='m-0 fs-5'>Mời bạn tải về tại đây nhé!</span>
                                                <div className='pb-3 m-0 pt-2'>
                                                    <a className='text-warning'
                                                       href={urlDownload}
                                                       target="new"
                                                       download>
                                                        <img style={{width: "30px"}} src='/media/img/mui_ten_r.png' alt='' /> Download now</a>
                                                    
                                                </div>
                                            </>:<>
                                                <div className='m-0 fs-6 pb-3'>
                                                    <span className='m-0 fs-6'>Link download sẽ được trả về trong {seconds}s</span>
                                                </div>
                                            </>}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-lg-4 col-xl-3 mt-3">
                        <Tag />
                        <div className="rounded border border-warning mt-3 mb-3 ps-3 pe-3">
                           <Adsense slot = '9005014409' />
                        </div>
                    </div>
                </div>
            </div>
  </DefaultLayout>)
}

export default DownloadTemp