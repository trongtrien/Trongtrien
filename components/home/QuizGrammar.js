import React from 'react'
import QuizTamplate from './QuizTemplate'

const QuizGrammar = ({
    data
}) => {
  return (
    <QuizTamplate data={data}
                  link="/Grammar-Quiz/Unit"
                  linkend=""
                  SeemoreLink="/Grammar-Quiz/Unit06"
                  note="Trắc nghiệm ngữ pháp"
                  imgUrl="mui_ten_r.png"
                  imgWidth={40}
                  linkLabel="Let's Go"/>
  )
}

export default QuizGrammar