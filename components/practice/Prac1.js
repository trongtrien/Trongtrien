/* eslint-disable @next/next/no-img-element */
import React, { useState} from 'react'
import Scoresheet from './Scoresheet'
import Axios from '../apiRequest/Axios'
import useMediaQuery from '../../utils/isMobile'
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie'
import Router from 'next/router'

export default function Practice({
  questions
}) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    // localstorage
    const handleAnswerOption = (answer) => {
      setSelectedOptions([
        (selectedOptions[currentQuestion] = { answerByUser: answer }),
      ]);
      setSelectedOptions([...selectedOptions]);
    };
  
    const handlePrevious = () => {
      const prevQues = currentQuestion - 1;
      prevQues >= 0 && setCurrentQuestion(prevQues);
    };
  
    const handleNext = () => {
      const nextQues = currentQuestion + 1;
      nextQues < questions.length && setCurrentQuestion(nextQues);
    };
  
    const handleSubmitButton = () => {
      let newScore = 0;
      console.log(selectedOptions)
      for (let i = 0; i < questions.length; i++) {
        questions[i].answer === selectedOptions[i]?.answerByUser &&
            (newScore += 1)
      }
      setScore(newScore);
      setShowScore(true);
     localStorage.setItem('block', "true");
    console.log(localStorage.getItem('block'))

    }
            return (
            <div className='container'>
                <div className="col">
                    <div className="border border-warning rounded">
                        {showScore?(<h1 className="text-3xl font-semibold text-center">
          You scored {score} out of {questions.length}
        </h1>):(
                                        <div className="border border-warning rounded">
                                        <h3 className="mb-2 mt-2 text-center">Question {currentQuestion + 1} of {questions.length}</h3>
                                                                    <div className="row m-0">
                                                                    <div className='p-0'>
                                                                        {/* <iframe
                                                                            src={`https://www.youtube.com/embed/dogcPvdvkCE?rel=0&amp;showinfo=0`}
                                                                            controls="0"
                                                                            title="YouTube video player"
                                                                            frameBorder="0"
                                                                            allow="fullscreen;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                            allowFullScreen>
                                                                        </iframe> */}
                                                                      <img style={{width: "100%"}} src={`/media/img/exam/${questions[currentQuestion].question}`} alt='' />
                                                                    </div>
                                                                </div>
                                        <div className="form-body mt-3">
                                          <div className="radio" onClick={(e) => handleAnswerOption("1")}>
                                              <label>
                                                      <input type="radio" name="1" value="1"
                                                            checked={ "1" === selectedOptions[currentQuestion]?.answerByUser}
                                                            onChange={(e) => handleAnswerOption("1")} />
                                                      <div className='mark'><span className='check-answer'>1</span><span className='ps-4'>{questions[currentQuestion].option1}</span></div>
                                              </label>
                                          </div>
                                          <div className="radio" onClick={(e) => handleAnswerOption("2")}>
                                              <label>
                                                      <input type="radio" name="2" value="2"
                                                            checked={ "2" === selectedOptions[currentQuestion]?.answerByUser}
                                                            onChange={(e) => handleAnswerOption("2")} />
                                                      <div className='mark'><span className='check-answer'>2</span><span className='ps-4'>{questions[currentQuestion].option2}</span></div>
                                              </label>
                                          </div>
                                          <div className="radio" onClick={(e) => handleAnswerOption("3")}>
                                              <label>
                                                      <input type="radio" name="3" value="3"
                                                            checked={ "3" === selectedOptions[currentQuestion]?.answerByUser}
                                                            onChange={(e) => handleAnswerOption("3")} />
                                                      <div className='mark'><span className='check-answer'>3</span><span className='ps-4'>{questions[currentQuestion].option3}</span></div>
                                              </label>
                                          </div>
                                          <div className="radio" onClick={(e) => handleAnswerOption("4")}>
                                              <label>
                                                      <input type="radio" name="4" value="4"
                                                            checked={ "4" === selectedOptions[currentQuestion]?.answerByUser}
                                                            onChange={(e) => handleAnswerOption("4")} />
                                                      <div className='mark'><span className='check-answer'>4</span><span className='ps-4'>{questions[currentQuestion].option4}</span></div>
                                              </label>
                                          </div>
                                        </div>
                                        <div className="form-footer d-flex p-4 border-top border-warning">
                                            <button className="btn btn-exam-next btn-exam" role="button">Xác nhận đáp án</button>
                                            <button
                                               className="btn btn-exam-next btn-exam ms-auto"
                                               role="button"
                                               onClick={
                                                currentQuestion + 1 === questions.length
                                                ? handleSubmitButton
                                                : handleNext
                                              }>{currentQuestion + 1 === questions.length ? "Submit" : "Next"}</button>
                                        </div>
                                    </div>
                        )}
                    </div>
                    <div className="col-md-1 column">
                    </div>
                </div>
            </div>)
    }









