/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect} from 'react'
import Axios from '../apiRequest/Axios'
import useMediaQuery from '../../utils/isMobile'
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'
import Router from 'next/router'

export default function QuizSelect({
  question,
  currentQuestion,
  setCurrentQuestion,
  scoreInput
}) {
  const cookie = new Cookies();
  const token = cookie.get("TOKEN")
  const [decoded, setDecoded] = useState(0);
  useEffect(() => {
    if(token) setDecoded(jwtDecode(token))
  },[token])
  console.log(decoded)
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedIncorect, setSelectedIncorect] = useState([]);
    const [selectedCorect, setSelectedCorect] = useState([]);
    const [disabledOptions, setdisabledOptions] = React.useState(false)
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(true);
    const questions = question.map(r => [{
                               id: r.id,
                               lesson_id: r.lesson_id,
                               ytId: r.ytId,
                               text: r.text,
                               text1: r.text1,
                               text2: r.text2,
                               text3: r.text3,
                               answer: r.answer,
                               Grammar1: r.Grammar1,
                               Grammar2: r.Grammar2,
                               option: [
                                  r.option1,
                                  r.option2,
                                  r.option3,
                                  r.option4
                                ]
                              }]
                            )
    // localstorage
    const handleAnswerOption = (answer) => {
      setSelectedOptions([
        (selectedOptions[currentQuestion] = { answerByUser: answer })
      ]);
      setSelectedOptions([...selectedOptions]);
      (questions[currentQuestion][0].answer == selectedOptions[currentQuestion]?.answerByUser)?(setSelectedCorect(answer)):(setSelectedIncorect(answer))
    };
  
    const handlePrevious = () => {
      const prevQues = currentQuestion - 1;
      prevQues >= 0 && setCurrentQuestion(prevQues);
    };
  
    const handleNext = () => {
      const nextQues = currentQuestion + 1;
      nextQues < questions.length && setCurrentQuestion(nextQues);
      setdisabledOptions(false)
    };
  
    const handleSubmitButton = () => {
      let newScore = 0;
      for (let i = 0; i < questions.length; i++) {
        questions[i][0].answer == selectedOptions[i]?.answerByUser &&
        (newScore += 1)
      }
      setScore(newScore+scoreInput);
      setShowScore(false);
    }
            return (
            <div className='mb-4 p-1'>
                  {question.length?
                  <div className="row">
                    <div className="border border-warning rounded">
                      <fieldset className="form-body mt-3 mb-3" disabled={disabledOptions}>
                        {showScore?<>
                          <div className='border rounded pt-2 pb-2 mb-3 fs-4' style={{fontFamily: "batangche"}}>
                            {questions[currentQuestion][0].text&&<div>
                            <span className="btn fs-4 ps-2 pe-2 align-middle">{questions[currentQuestion][0].text}</span>
                            </div>}
                            <span className="btn fs-4 ps-2 pe-2 align-middle">{questions[currentQuestion][0].text1}</span>
                            ..............
                            <span className="btn fs-4 ps-2 pe-2 align-middle">{questions[currentQuestion][0].text2}</span>
                            {questions[currentQuestion][0].text3&&<div>
                            <span className="btn fs-4 ps-2 pe-2 align-middle">{questions[currentQuestion][0].text3}</span>
                            </div>}
                        </div>
                        {questions[currentQuestion][0].option.map((q,i) => 
                        <div key={i} className="radio">
                            <label>
                                    <input type="radio" name="name" value={q}
                                    disabled={disabledOptions}
                                          checked={q == selectedOptions[currentQuestion]?.answerByUser}
                                          onChange={(e) => {
                                            handleAnswerOption(q)
                                            setdisabledOptions(true)
                                          }} />
                                    <div className={`
                                      ${((questions[currentQuestion][0].answer == q)&&(q == selectedOptions[currentQuestion]?.answerByUser))?'markCorect ':'markInCorect '}
                                      ${((questions[currentQuestion][0].answer == q)&&disabledOptions)&&"corect"}
                                      `}>
                                      <span className='checkQuiz'>{i+1}</span>
                                      <span className='fs-4 ps-3 align-middle' style={{fontFamily: "batangche"}}>{q}</span>
                                    </div>
                            </label>
                        </div>
                          )}</>:<div>
                                  <span className='fs-4'>Bạn đã hoàn thành bài tập</span>
                                  <h3>Đạt <span className='text-success'>{score}</span>/<span className='text-info'>{questions.length}</span> câu</h3>
                                  {score<questions.length/2&&"Bạn sai nhiều quá nhé. Cố gắng ôn tập lại nha!!!"}
                                </div>}
                      </fieldset>
                      <div className="form-footer d-flex pt-3 pb-3 border-top border-warning">
                          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-xl modal-dialog-centered">
                              <div className="modal-content">
                                <div className="modal-header d-flex">
                                    <span className="border border-warning p-2 ps-3 pe-3 rounded">{questions[0][0].Grammar1}</span>
                                    <span className="border border-warning p-2 ps-3 pe-3 ms-2 rounded">{questions[0][0].Grammar2}</span>
                                  <div className="ms-auto align-middle">
                                    <button type="button" className="btn-close btn" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                </div>
                                <div className="modal-body">
                                  
                                    {token&&decoded.role=="premium"?
                                    <div className='ratio ratio-16x9 p-0 border rounded'>
                                      <iframe
                                        src={`https://www.youtube.com/embed/${questions[0][0].ytId}?rel=0&amp;showinfo=0`}
                                        controls="0"
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="fullscreen;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                      </iframe>
                                    </div>
                                    :<div style={{padding:"56.25% 0 0 0", position:"relative"}}>
                                      <iframe src="https://player.vimeo.com/video/744630559?h=65c812db3f&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen style={{}} title="EPS TOPIK 60 b&amp;agrave;i Phần luyện tập Test of 60 Lesson book - 6 과.mp4">
                                        </iframe>
                                        </div>
                                        }
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                          {!showScore&&<button type="button" className="btn btn-main-y rounded-pill ps-3 p-1 pe-3" 
                                  data-bs-toggle="modal" data-bs-target="#exampleModal" 
                                  data-bs-whatever="Xem lại ngữ pháp"
                                  >Ôn ngữ pháp bài {questions[currentQuestion][0].lesson_id}</button>}
                          {showScore?<button
                              className="btn btn-main-y rounded-pill ps-3 p-1 pe-3 ms-auto"
                              role="button"
                              onClick={
                              currentQuestion + 1 == questions.length
                              ? handleSubmitButton
                              : handleNext
                            }>{currentQuestion + 1 === questions.length ? "Hoàn thành" : "Next"}</button>
                            :
                            <a className="btn btn-main-y rounded-pill ps-3 p-1 pe-3 ms-auto" href={(questions[currentQuestion][0].lesson_id+1)}>Bài tiếp theo</a>}
                      </div>
                  </div>
                </div>:"Bài học chưa được hoàn thiện quay lại sau bạn nhé"}
            </div>)
    }









