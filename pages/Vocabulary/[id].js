import React from 'react'
import Link from 'next/link'
import { quizGrammar_data } from '../../components/home/QuizData'
import DefaultLayout from '../../components/DefaultLayout'
import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'
import Tag from '../../utils/Tag'
import Adsense from '../../components/ads/DisplayAds'
import useMediaQuery from '../../utils/isMobile'
import VocSelect from '../../components/home/VocSelect'
import VocInput from '../../components/home/VocInput'
import Axios from '../../components/apiRequest/Axios'


export async function getServerSideProps({params}) {
    const quizData = [
        {   id: "03",
        title: "교실 한국어",
        youtubeId: "cMGoS5TfO00"
        },
        {   id: "04",
            title: "안녕하세요",
            youtubeId: "nPxee1Kth3o"
        },
        {   id: "05",
            title: "주말 잘 보내세요",
            youtubeId: "nPxee1Kth3o?start=61"
        }
      ]
      const data = [...quizData,...quizGrammar_data]
      const id = params.id.slice(4,6)
      const menutab = params.id.slice(-4)
    try {
     const resp = await Axios({method: "get", url: `/gamesQ/${id.replace("0","")}`})
     return {
        props: {
            id: id,
            menutab: menutab,
            data:data.filter(d => d.id != id),
            vocdata:await resp.data
        }
    }
    } catch (error) {
     return {err: "Error: Not connected"}}
 }


const Voc = ({id,data,vocdata,menutab}) => {
    const ids = id.replace("0", "")
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

    // audio play
    const [showIconAudio, setShowIconAudio] = React.useState(0)
    const [idaudio, setIdaudio] = React.useState(0)

    // set score of VocSelect
    const [score, setScore] = React.useState(0);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);

    React.useEffect(() => {
        var audio = document.getElementById(`a${idaudio}`);
        if(idaudio!=0)
        audio.addEventListener('ended',function(){
            setShowIconAudio(0)
         })
    },[idaudio])

    function play(i) {
        if (process.browser){
           var audio = document.getElementById(`a${i}`);
           setShowIconAudio(i)
           audio.play();
        }
      }
  return (
      <DefaultLayout>
            <div className='container p-0'>
                <div className='row text-dl ps-3 pe-3 m-0'>
                    <div className='col-lg-8'>
                        {/* menu tab */}
                        <div className='row pt-4 p-1'>
                            <ul className='d-flex list-unstyled flex-wrap bg-info text-dl bg-opacity-25 rounded'>
                                <Link href={`/Vocabulary/Unit${id}-word`}><button className='btn text-dl'>Từ vựng - phát âm</button></Link>
                                <button className='btn text-dl'>|</button>
                                <Link href={`/Vocabulary/Unit${id}-quiz`}><button className='btn text-dl'>Trắc nghiệm từ vựng</button></Link>
                            </ul>
                        </div>
                        {/* vung hien thi theo menu tab */}
                        {menutab=="word"&&
                            <div className='row p-1 '>
                                {vocdata.length?<>
                                    <div className='ratio ratio-16x9 bg-secondary m-0 p-0'>
                                    <iframe
                                        className='m-0 p-0'
                                        src={`https://www.youtube.com/embed/${vocdata[0].ytId}`}
                                        controls="0"
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="fullscreen;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                    </iframe>
                                </div>
                                <div className='row p-0 m-0 mt-2'>
                                <hr className='border border-warning mt-2'/>
                                    {vocdata.map((v,i) => <div className='col-xl-12 p-0 border border-warning btn d-flex' key={i}>
                                        <div className='d-flex'
                                            style={{width: "50%", textAlign: "left", borderRight: "1px solid #999", borderRadius: "0px",fontSize: `${isMobile?"0.9rem":"1rem"}`}}>
                                            <span className='btn text-dl'>{i+1}. {v.question}</span>
                                            <span className='btn p-0 ms-auto'>
                                                {/* audio icon */}
                                                <i onClick={() => {
                                                    play(i+1)
                                                    setIdaudio(i+1)
                                                }} className={`fa ${showIconAudio==i+1?"fa-volume-up text-info":"fa-volume-off text-dl"} text-right p-1 ps-2 pe-2`} aria-hidden="true" style={{fontSize: "1.8rem"}}></i>
                                                    {<audio id={`a${i+1}`} hidden controls src={`/media/audio/u${ids}/${i+1}.mp3`} type="audio/mpeg" />}
                                            </span>
                                        </div>
                                        <div style={{width: "50%", textAlign: "left", fontSize: `${isMobile?"0.9rem":"1rem"}`}}>
                                                <span className='btn text-dl'>{v.answer}</span>
                                        </div>
                                    </div>)}
                                <hr className='border border-warning mt-3' />
                                </div>
                                </>:"Bài học chưa được hoàn thiện quay lại sau bạn nhé"}
                            </div>}
                        {menutab=="quiz"&&<>{currentQuestion>vocdata.length/2?<VocSelect question={vocdata} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} scoreInput={score}/>:<VocInput data={vocdata} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} score={score} setScore={setScore}/>}</>}

                        <div className='row pt-1'>
                            <ul className='list-unstyled m-0 p-0 pt-2'>
                                {data.map(d =>
                                    <li className='p-1' key={d.title}>
                                        <span className='btn bg-primary text-dl bg-opacity-25 rounded' style={{width: "100%", textAlign: "left"}}>
                                            <b>{d.id}. </b>{d.title}. <Link href={`/Vocabulary/Unit${d.id}-${menutab}`}><a className='ps-5' style={{display: "flex", float: "right"}}>Let's Go<img className='ms-2' width={40} src='/media/img/mui_ten_r.png' alt='' /></a></Link>
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

export default Voc