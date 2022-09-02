import React from 'react'
import Link from 'next/link'
import useMediaQuery from '../../utils/isMobile'
import { quizGrammar_data } from '../../components/home/QuizData'
import DefaultLayout from '../../components/DefaultLayout'
import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'
import Tag from '../../utils/Tag'
import Adsense from '../../components/ads/DisplayAds'
import ReactPlayer from 'react-player/youtube'

export async function getServerSideProps({params}) {
    const quizGrammar_data 
    try {
     const id = params.id.slice(4)
     return {props: {
        id: id,
        data:quizGrammar_data.find(d => d.id == id)||null
    }}
    } catch (error) {
     return {err: "Error: Not connected"}}
 }


const LanddingPage = ({id,data}) => {
    const cookie = new Cookies()
    const token = cookie.get("TOKEN")
    const [decoded, setDecoded] = React.useState({role: "basic"})
    const isMobile = useMediaQuery("991")

    React.useEffect(() => {
        let unmound = true
        if(token&&unmound){
            setDecoded(jwtDecode(token))
        }
        return ()=> (unmound = false)
    },[])
  return (
      <DefaultLayout>
            <div className='container p-0'>
                <div className='row text-dl ps-3 pe-3 m-0'>
                    <div className='col-lg-8 p-0'>
                        <div className='row'>
                            <h5 className='m-0 p-1 pt-3 fs-3' style={{fontFamily: "batangche"}}>Conversation {id=="05"?`Full`:`lesson ${data.id} - ${data.title}`}</h5>
                            <div className='p-1 pt-3'>
                                <div className='ratio ratio-16x9 m-0 border border-warning rounded'>
                                    <ReactPlayer
                                        width="100%"
                                        height="100%"
                                        url={`https://www.youtube.com/watch?v=${id=="05"?"7ICd0_CmnUg":data.youtubeId}?start=5`}
                                        controls={true}
                                    />
                                </div>
                            </div>
                            <ul className='list-unstyled m-0 p-0'>
                                <li className='p-1'>
                                        <span className='btn bg-primary bg-opacity-25 rounded'
                                              style={{width: "100%", textAlign: "left"}}>
                                            <b className='text-logo-y'>Full Conversation</b>
                                                <Link href="/Conversation/Unit05">
                                                    <a className='ps-5'
                                                        style={{display: "flex", float: "right"}}>Listen
                                                        <img className='ms-2' width={20} src='/media/img/listen.png' alt='' />
                                                    </a>
                                                </Link>
                                        </span>
                                </li>
                                {quizGrammar_data.map(d =>
                                    <li className='p-1' key={d.title}>
                                        <span className='btn bg-primary bg-opacity-25 rounded' style={{width: "100%", textAlign: "left"}}>
                                            <b>{d.id}. </b>{d.title}. 
                                                <Link href={`/Conversation/Unit${d.id}`}>
                                                    <a className='ps-5'
                                                            style={{display: "flex", float: "right"}}>Nghe
                                                            <img className='ms-2' width={20} src='/media/img/listen.png' alt='' />
                                                    </a>
                                                </Link>
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className='m-0 p-0 pt-2 pb-2'>
                            {(!token||decoded.role==="basic")&&<Adsense slot="8882564828" />}
                        </div>
                    </div>
                    <div className={`${isMobile?'col-lg-4 p-0 m-0':'col-lg-4 ps-4 mt-3'}`}>
                        <Tag/>
                        {(!token||decoded.role==="basic")&&<div className='rounded border border-warning mt-3 mb-3'>
                            <Adsense slot='8882564828'/>
                        </div>}
                    </div>
                </div>
            </div>
      </DefaultLayout>
  )
}

export default LanddingPage