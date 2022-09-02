import React, {useState} from 'react'
import Axios from '../../components/apiRequest/Axios'
import { quizGrammar_data } from '../../components/home/QuizData'
import DefaultLayout from '../../components/DefaultLayout'
import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'
import Tag from '../../utils/Tag'
import Adsense from '../../components/ads/DisplayAds'
import useMediaQuery from '../../utils/isMobile'
import QuizInput from '../../components/home/QuizInput'
import QuizSelect from '../../components/home/QuizSelect'

export async function getServerSideProps({params}) {
    const quizData = [
      {
        id: 1,
        lesson_id: 6,
        ytId: "dogcPvdvkCE",
        text: "가: 여기61",
        text1: "여기61",
        text2: "길을 건너면 안 돼요",
        text3: "나: ㅇㄹㅇㄴㄹㅇㄹ",
        Grammar1: "N + 에서",
        Grammar2: "V/A + (으)면 길을 건너면 안 돼요",
        answer: "에서",
        option1: "을",
        option2: "에서",
        option3: "에",
        option4: "면"
     },
     {
        id: 2,
        lesson_id: 6,
        ytId: "dogcPvdvkCE",
        text: "가: 여기62",
        text1: "여기62",
        text2: "길을 건너면 안 돼요",
        Grammar: "N + 에서",
        answer: "에서",
        option1: "을",
        option2: "에서",
        option3: "에",
        option4: "면"
     },
     {
        id: 3,
        lesson_id: 6,
        ytId: "dogcPvdvkCE",
        text: "",
        text1: "여기63",
        text2: "길을 건너면 안 돼요",
        text3: "나: ㅇㄹㅇㄴㄹㅇㄹ",
        Grammar: "N + 에서",
        answer: "에서",
        option1: "을",
        option2: "에서",
        option3: "에",
        option4: "면"
     },
     {
        id: 4,
        lesson_id: 7,
        ytId: "dogcPvdvkCE",
        text: "",
        text1: "여기70",
        text2: "길을 건너면 안 돼요",
        Grammar: "N + 에서",
        answer: "에서",
        option1: "을",
        option2: "에서",
        option3: "에",
        option4: "면"
     },
     {
        id: 5,
        lesson_id: 7,
        text: "",
        text1: "여기71-1",
        text2: "길을 건너면 안 돼요",
        Grammar: "N + 에서",
        answer: "에서",
        option1: "을",
        option2: "에서",
        option3: "에",
        option4: "면"
     },
     {
        id: 6,
        lesson_id: 7,
        text: "",
        text1: "여기71-2",
        text2: "길을 건너면 안 돼요",
        Grammar: "N + 에서",
        answer: "에서",
        option1: "을",
        option2: "에서",
        option3: "에",
        option4: "면"
     }
    ]
    try {
     const id = params.id.slice(4)
     const resp = await Axios({method: "get", url: `/Practice-listen`})
     return {
        props: {
            id: id,
            quiz:quizData.filter(d => d.lesson_id == id),

        }
    }
    } catch (error) {
     return {err: "Error: Not connected"}}
 }


const LanddingPage = ({id,quiz}) => {
    // filter quizGrammar_data
    const quizGrammar = quizGrammar_data.filter(q => q.id != id)
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const quizData = quiz.filter(d => d.lesson_id == id)
    
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
                    <div className='col-lg-8 ps-0 pe-0 m-0 pt-2'>
                        <div className='d-flex align-middle'>
                            <span className='text-info m-0 align-middle fs-4'>Luyện tập ngữ pháp bài {id}</span>
                        </div>
                        <div className='pt-1'>
                            <h5><ins>Câu: {currentQuestion+1}</ins></h5>
                          {currentQuestion<2?<QuizInput data={quizData} id={id} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} score={score} setScore={setScore}/>:
                                              <QuizSelect question={quizData} setCurrentQuestion={setCurrentQuestion} currentQuestion={currentQuestion} scoreInput={score}/>
                          }
                        </div>
                        <hr className='border border-warning m-0' />
                        <div className='row pt-1'>
                            <ul className='list-unstyled m-0 p-0 pt-2 d-flex row mb-1'>
                                <li className='p-1 col-xl-6'><a href='/'><span className='btn btn-exam  text-light p-2 ps-4 pe-4 fs-4 me-2'>Ôn tập tổng hợp Quyển 1</span></a></li>
                                <li className='p-1 col-xl-6'><a href='/'><span className='btn btn-exam  text-light p-2 ps-4 pe-4 fs-4'>Ôn tập tổng hợp Quyển 2</span></a></li>
                            </ul>
                            <div><hr className='border border-warning' /></div>
                            <ul className='list-unstyled m-0 p-0 pt-2 d-flex'>
                                <li className='p-1'><span className='m-0 btn btn-main-y fs-3'>Ôn tập theo từng bài &nbsp;<img height={30} width={30} src="/media/img/arrow.gif" alt=''/></span></li>
                            </ul>
                            <ul className='list-unstyled m-0 p-0 pt-2'>
                                {quizGrammar.map(d =>
                                    <li className='p-1' key={d.title}>
                                        <span className='btn bg-primary bg-opacity-25 rounded text-dl' style={{width: "100%", textAlign: "left"}}>
                                            <b>{d.id}. </b>{d.title}. <a href={`/Grammar-Quiz/Unit${d.id}`} className='ps-5' style={{display: "flex", float: "right"}}>Let's Go<img className='ms-2' width={40} src='/media/img/mui_ten_r.png' alt='' /></a>
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