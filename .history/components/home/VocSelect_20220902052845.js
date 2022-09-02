/* eslint-disable @next/next/no-img-element */
import React, { useState} from 'react'
import Router from 'next/router'

export default function QuizSelect({
  question,
  currentQuestion,
  setCurrentQuestion,
  scoreInput
}) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [disabledOptions, setdisabledOptions] = React.useState(false)
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(true);
    
    const questions = question.map(r => [{
                               id: r.id,
                               lesson_id: r.game_id,
                               ytId: r.ytId,
                               text: r.answer,
                               answer: r.question,
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
      setSelectedOptions([(selectedOptions[currentQuestion] = { answerByUser: answer })]);
      setSelectedOptions([...selectedOptions]);
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
                          <div className='border rounded fs-4' style={{fontFamily: "batangche"}}>
                            <span className="btn fs-4 ps-2">{currentQuestion+1}. {questions[currentQuestion][0].text}</span>
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
                          {!showScore&&<button type="button" className="btn btn-main-y rounded-pill ps-3 p-1 pe-3" 
                                  onClick={() => Router.reload()}
                                  >Làm lại </button>}
                          {showScore?<div className='d-flex' style={{width: "100%"}}>
                            <button className='btn me-auto' onClick={handlePrevious}><i className="fa fa-angle-left fs-1 text-info" aria-hidden="true"></i></button>
                            <button
                              className="btn ps-3 p-1 pe-3 ms-auto"
                              role="button"
                              onClick={
                              currentQuestion + 1 == questions.length
                              ? handleSubmitButton
                              : handleNext
                            }>{(currentQuestion + 1 === questions.length&&disabledOptions) ? <i className="fa fa-check fs-1 text-success" aria-hidden="true"></i> : "Next"}</button>
                          </div>
                            :
                            <a className="btn btn-main-y rounded-pill ps-3 p-1 pe-3 ms-auto"
                               href={`Unit${(Number(questions[currentQuestion][0].lesson_id)+1)<10?`0${Number(questions[currentQuestion][0].lesson_id)+1}`:Number(questions[currentQuestion][0].lesson_id)+1}-quiz`}>
                                Bài tiếp theo
                            </a>}
                      </div>
                  </div>
                </div>:"Bài học chưa được hoàn thiện quay lại sau bạn nhé"}
            </div>)
    }









