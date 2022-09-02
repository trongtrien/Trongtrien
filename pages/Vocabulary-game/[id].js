import React, {useState, useEffect} from 'react'
import { isMobile} from 'react-device-detect'
import swal from 'sweetalert'
import Swal from 'sweetalert2'
import Axios from '../../components/apiRequest/Axios'
import shuffle from '../../utils/shuffleArray'
import { TimeCalculator } from '../../utils/duration'

export async function getServerSideProps({params}) {
    const id = params.id
      try {
       const respA = await Axios({ method: 'GET',url: `/gamesA/${id}`})
       const respQ = await Axios({ method: 'GET',url: `/gamesQ/${id}`})
       return {
         props: {
          answersBank: await respA.data,
          questionsBank: await respQ.data,
          id: id
         }
       }
      } catch (error) {
        return {
          props: {
            err: ""
          }
        }
      }
    }

const Game = ({
    answersBank,
    questionsBank,
    id
}) => {
    const [open, setOpen] = React.useState(false);
    const [seconds, setSeconds] = React.useState(null);
    const {mm, ss} = TimeCalculator(seconds)

    const handleStart = () => {
        setOpen(true);
        setSeconds(questionsBank.length*5);
    }

    // counter and show alert when seconds===0
    useEffect(() => {
        if(seconds>0&&open){
            setTimeout(() => setSeconds(prev => prev - 1), 1000);
        } else if(seconds===0){
            swal({
                className:"g-swal",
                title: "Hết giờ mất rồi!",
                text: "Bạn có muốn làm lại không?",
                buttons: {
                    'cancel':"Thôi",
                    'confirm':"Ok! luôn"
                }
            })
            .then((Willconfirm) => {
                if(Willconfirm){
                    window.location.reload()
                }
            })
        }
        return () => (clearTimeout(seconds))
    },[seconds,open])

    // new questions with limit and offset
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [limit, setLimit] = React.useState(8);
    const [offset, setOffset] = React.useState(0);
 
    function nextQuestions() {
        if(limit < questionsBank.length){
          setLimit(limit + 8)
          setOffset(limit)
        } else {
          setLimit(limit)
          setOffset(offset)
        }
      }

    useEffect(()=>{
        if(questionsBank) setQuestions(questionsBank.slice(offset,limit))
        if(answersBank) setAnswers(shuffle(answersBank.slice(offset,limit)))//random for answer
    },[questionsBank,answersBank,limit,offset]);

    //  question and answer from user select
     const [question, setQuestion] = useState(null)
     const [answer, setAnswer] = useState(null)
     const [correct, setCorrect] = useState(0)
     const [incorrect, setIncorrect] = useState(0)

     const setQuestionHandle = (q) => {setQuestion(q)}
     const setAnswerHandle = (a) => {setAnswer(a)}

    // when answer incorrect > 3 show err alert
    useEffect(() => {
        if((incorrect)>3){
            swal({
                className:"g-swal",
                icon:"/media/img/opps.png",
                title:"Bạn trả lời sai quá 4 lần rồi !!!",
                text: "Bạn muốn chơi lại?",
                buttons: {
                    'cancel':"Thôi",
                    'confirm':"Ok! luôn"
                },
                closeOnClickOutside: false
            })
            .then((Willconfirm) => {
                if(Willconfirm){
                    window.location.reload()
                } else {
                    window.history.back()
                }
            })
        }
    },[incorrect])
    
    useEffect(() => {
        if(answer!==null&&question!==null){
            if(answer===question){
                setCorrect(prev => prev + 1)
                setIncorrect(0)
                setAnswer(null)
                setQuestion(null)
                if(correct+1<questionsBank.length){
                    swal({
                        timer:1000,
                        icon:"/media/img/well-done.gif",
                        className:"g-swal-well-done",
                        buttons:false
                    })
                } else if(correct+1===questionsBank.length){
                    setSeconds(null)
                    swal({
                        className:"g-swal",
                        icon:"/media/img/congrats.gif",
                        title:"Bạn làm bài xuất sắc !!!",
                        closeOnClickOutside: false
                        })}
                setAnswers([...answers].map(object => {
                    if(object.answer === answer) {
                    return {...object,disableA: true}
                    }
                    else return object
                    }))

                setQuestions([...questions].map(object => {
                    if(object.answer === answer) {
                    return {...object,disableQ: true}
                    }
                    else return object;
                    }))
            } else {
                Swal.fire({
                    showClass: {backdrop: 'swal2-hide-custom'},
                    html:'<audio hidden src="/media/audio/error.mp3" autoPlay></audio>'
                })
                setIncorrect(prev => prev + 1)
            }
        }
        
    },[answer,question])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${!isMobile&&'g-pc-bg'}`}>
        <div className={`${isMobile?'g-mobile g-bg':'g-pc'}`}>
            <div className='g-h'>
                <div className={`d-flex g-h-nav ${!isMobile&&'g-h-nav-pc'} pe-1`}>
                    <div className='m-0 p-0 ms-2' style={{cursor: "pointer"}} onClick={() => window.location.href='/'}>
                        <img className='m-0 p-0' src='/media/img/button-home.png' alt='home' />
                    </div>
                    <div className={`g-h-nav-lesson ${isMobile&&'g-h-nav-lesson-m'}`}>
                        <span className={`${isMobile?'g-h-nav-span':'g-h-nav-pc-span'}`}>{id}</span>
                    </div>
                    <div className='g-h-nav-score'>
                        <span className={`${isMobile?'g-h-nav-span':'g-h-nav-pc-span'}`}>{mm} : {ss}</span>
                    </div>
                    <div className='g-h-nav-check'>
                        <span className={`${isMobile?'g-h-nav-span':'g-h-nav-pc-span'}`}>{correct}/{questionsBank.length}</span>
                    </div>
                </div>
            </div>
            <div className={`g-body ${!isMobile&&'g-body-pc'}`}>
                    <div className='g-body-content'>
                        <div className='d-flex'>
                            <div className='col-6'>
                                <div className='d-flex flex-column'>
                                    {questions&&questions.map((q,index) => { return (
                                            <button key={index}
                                                    className={`text-start btn btn-games p-2 mt-2 ms-2 me-1 ${((q.disableQ&&q.disabled)||q.disableQ)?'bg-secondary text-light':''}`}
                                                    disabled={q.disableQ||q.disabled||incorrect>3||!open||seconds===0}
                                                    onClick={() => {
                                                        setQuestions([...questions].map(object => {
                                                            if(object.id === q.id) {
                                                                return {...object,disabled:true}
                                                                } else {
                                                                return {...object,disabled:false}
                                                                };
                                                            }))
                                                        setQuestionHandle(q.answer)
                                                        }}>
                                                    {open?q.question:'Nhấn start để bắt đầu'}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className='d-flex flex-column'>
                                    {answers&&answers.map(q => {
                                        return (
                                            <button key={q.id}
                                                    className={`text-start btn btn-games p-2 mt-2 ms-1 me-2 ${((q.disableA&&q.disabled)||q.disableA)?'bg-secondary text-light':''}`}
                                                    disabled={q.disableA||q.disabled||incorrect>3||!open||seconds===0}
                                                    onClick={() => {
                                                        setAnswers([...answers].map(object => {
                                                            if(object.id === q.id) {
                                                                return {...object,disabled:true}
                                                                } else {
                                                                return {...object,disabled:false}
                                                                };
                                                            }))
                                                        setAnswerHandle(q.answer)
                                                        }}>
                                                    {open?q.answer:'Nhấn start để bắt đầu'}
                                                {/* play audio */}
                                                {(q.disableA&&q.disabled&&incorrect<3)?
                                                    <audio hidden src={`/media/audio/u${id}/${q.audio}.mp3`} width="750" height="500" controls autoPlay controlsList="nodownload"></audio>:''}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='d-flex pt-3 pb-3'>
                            {/* back btn */}
                            <div className='m-0 p-0 ps-2' style={{cursor: "pointer", zIndex: "10"}} onClick={() => {
                                if(open&&correct<questionsBank.length){
                                    swal({
                                        title: "Bạn muốn hủy bài giữa chừng?",
                                        buttons: {
                                            'cancel': 'No',
                                            'confirm':'Yes'
                                        }
                                    })
                                    .then((Willconfirm) => {
                                        if(Willconfirm){
                                            setOpen(false)
                                            clearTimeout(seconds)
                                            window.history.back()
                                        }
                                    })
                                } else {
                                    window.history.back()
                                }
                            }}>
                                <img className='m-0 p-0' width={50} src='/media/img/arrow-back.png' alt='back' />
                            </div>
                            {/* next question btn */}
                            {(correct>=8&&limit<questionsBank.length)&&
                                <button className='btn ms-auto' style={{zIndex: "10"}} onClick={() => nextQuestions()}>
                                    <img width={30} style={{transform: "rotate(-90deg)"}} src='/media/img/arrow.gif' alt='' />
                                </button>}
                        </div>
                        {/* start game btn */}
                        {!open?<div className="g-start" onClick={() => {
                                            handleStart()
                                            setOpen(!open)
                                            }}><img className='' src='/media/img/games/start-btn.gif' alt='' />
                                    </div>:<div className="g-start"><img className='' src='/media/img/covu.gif' alt='' />
                                            </div>}
                    </div>
            </div>
        </div>
    </div>)
}

export default Game