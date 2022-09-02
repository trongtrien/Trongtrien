import React from 'react'
import QuizTamplate from './QuizTemplate'

const QuizVoc = ({
    data
}) => {
  return (
    <QuizTamplate data={data}
                  link="/Vocabulary/Unit"
                  linkend="-word"
                  SeemoreLink="/Vocabulary/Unit03-word"
                  note="Trắc nghiệm từ vựng"
                  imgUrl="mui_ten_r.png"
                  imgWidth={40}
                  linkLabel="Let's Go"
                  />
  )
}

export default QuizVoc