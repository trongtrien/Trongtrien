/* eslint-disable @next/next/no-img-element */
import React, { useState} from 'react'
import Scoresheet from './Scoresheet'
import Axios from '../apiRequest/Axios'
import useMediaQuery from '../../utils/isMobile'
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie'
import jwtDecode from "jwt-decode"
import Router from 'next/router'
import Link from 'next/link'
import Adsense from '../ads/DisplayAds'
import { CountDown } from './count'

export default function Exam({
  questions,
  examId,
  ExamCard,
  className
//   className = col-lg-9
}) {
    React.useEffect(() => {
        document.addEventListener('contextmenu', (e) => {
          e.preventDefault();
        })
      },[])
    const cookie = new Cookies()
    const token = cookie.get("TOKEN")
    const [decoded, setdecoded] = React.useState([])
    React.useEffect(() => {
      let mounded = true
      if(token&&mounded){
        setdecoded(jwtDecode(token))
      }
      return ()=> (mounded = false)
    },[])
    
    // CountDown
  const {time, second} = CountDown(10)
    // CountDown end

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    // disabledOptions, disabledNext, disabledConfirm
    const [disabledOptions, setdisabledOptions] = React.useState(false)
    const [disabledNext, setdisabledNext] = React.useState(true)
    // disabledOptions, disabledNext, disabledConfirm


    const handleAnswerOption = (answer) => {
      setSelectedOptions([
        (selectedOptions[currentQuestion] = { answerByUser: answer }),
      ]);
      setSelectedOptions([...selectedOptions]);
      setdisabledNext(false)
      setdisabledOptions(true)
    };
  
    const handleNext = () => {
      const nextQues = currentQuestion + 1;
      nextQues < questions.length && setCurrentQuestion(nextQues);
      setdisabledNext(true)
      setdisabledOptions(false)
    };
  
    const handleSubmitButton = () => {
      let newScore = 0;
      for (let i = 0; i < questions.length; i++) {
        questions[i].answer === selectedOptions[i]?.answerByUser &&
            (newScore += 5)
      }
      setScore(newScore)
      setShowScore(true)
    }
            return (
                <div className='wrap-exam'>
                    <div className='row wrap-exam-top m-0'>
                        <div className='d-flex mt-1'>
                            <div className='m-auto mt-1'>
                                <h3 className='text-center fs-4'>Test of proficiency in Korean</h3>
                            </div>
                        </div>
                    </div>
                    {showScore?(<Scoresheet score={score}
                                                                questions={questions}
                                                                examId={examId}
                                                                name={decoded.name}
                                                                email={decoded.email}/>):(
                    <div className='row m-0'>
                        <div className={`${className} m-0 p-0`}>
                            <div className='bg-white'>
                                <div className="col">
                                    <div className="border rounded">
                                                        <div className="border rounded">
                                                                                    <div className="row m-0">
                                                                                    <div className='p-0'>
                                                                                        {token&&decoded.role=="premium"?<>
                                                                                            {currentQuestion<2?<img style={{width: "100%"}} src={`/media/img/exam/read/1/${questions[currentQuestion].question}`} alt='' />:
                                                                                    <div>
                                                                                        {questions[currentQuestion].question_title!=""&&<img style={{width: "100%"}} src={`/media/img/exam/listen/t/1/${questions[currentQuestion].question_title}`} alt='' />}
                                                                                        <span className='fs-2 ps-4 fw-bolder'>{currentQuestion+1}.</span>
                                                                                        {questions[currentQuestion].question!=""&&<img style={{width: "100%"}} src={`/media/img/exam/listen/1/${questions[currentQuestion].question}`} alt='' />}
                                                                                    </div>
                                                                                    }</>:<div className='ratio ratio-21x9 p-0 border rounded'>
                                                                                            <iframe
                                                                                                src={`https://www.youtube.com/embed/dogcPvdvkCE?rel=0&amp;start=5;showinfo=0`}
                                                                                                controls="0"
                                                                                                title="YouTube video player"
                                                                                                frameBorder="0"
                                                                                                allow="fullscreen;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                                                allowFullScreen>
                                                                                            </iframe>
                                                                                        </div>}
                                                                                    </div>
                                                                                </div>
                                                        <div className="form-body mt-3">
                                                            <fieldset disabled={disabledOptions}>   
                                                                <div className="radio">
                                                                    <label>
                                                                            <input type="radio" name="1" value="1"
                                                                                    checked={ "1" === selectedOptions[currentQuestion]?.answerByUser}
                                                                                    onChange={(e) => handleAnswerOption("1")} />
                                                                            <div className='mark'><span className='check-answer'>1</span><span className='ps-4'>{questions[currentQuestion].option1}</span></div>
                                                                    </label>
                                                                </div>
                                                                <div className="radio">
                                                                    <label>
                                                                            <input type="radio" name="2" value="2"
                                                                                    checked={ "2" === selectedOptions[currentQuestion]?.answerByUser}
                                                                                    onChange={(e) => handleAnswerOption("2")} />
                                                                            <div className='mark'><span className='check-answer'>2</span><span className='ps-4'>{questions[currentQuestion].option2}</span></div>
                                                                    </label>
                                                                </div>
                                                                <div className="radio">
                                                                    <label>
                                                                            <input type="radio" name="3" value="3"
                                                                                    checked={ "3" === selectedOptions[currentQuestion]?.answerByUser}
                                                                                    onChange={(e) => handleAnswerOption("3")} />
                                                                            <div className='mark'><span className='check-answer'>3</span><span className='ps-4'>{questions[currentQuestion].option3}</span></div>
                                                                    </label>
                                                                </div>
                                                                <div className="radio">
                                                                    <label>
                                                                            <input type="radio" name="4" value="4"
                                                                                    checked={ "4" === selectedOptions[currentQuestion]?.answerByUser}
                                                                                    onChange={(e) => handleAnswerOption("4")} />
                                                                            <div className='mark'><span className='check-answer'>4</span><span className='ps-4'>{questions[currentQuestion].option4}</span></div>
                                                                    </label>
                                                                </div>
                                                            </fieldset>
                                                        </div>
                                                        <div className="form-footer d-flex p-4 border-top">
                                                            <h3 className='mt-2'>Your Answer: {selectedOptions[currentQuestion]?.answerByUser}</h3>
                                                            <button
                                                                className="btn ms-auto btn-exam-next btn-exam"
                                                                role="button"
                                                                disabled={disabledNext}
                                                                onClick={
                                                                    currentQuestion + 1 === questions.length
                                                                    ? handleSubmitButton
                                                                    : handleNext
                                                                }>{currentQuestion + 1 === questions.length ? "Submit" : "Next question"}</button>
                                                        </div>
                                                    </div>
                                        
                                    </div>
                                    <div><Adsense slot="8882564828"/></div>
                                </div>
                            </div>
                        </div>
                        {ExamCard&&<ExamCard selectedOptions={selectedOptions} time={time}/>}
                    </div>)}
                </div>
)
    }









