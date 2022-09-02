import React from 'react'
import QuizTamplate from './QuizTemplate'

const Conversation = ({
    data
}) => {
  return (
    <QuizTamplate data={data}
                  link="/Conversation/Unit"
                  linkend=""
                  SeemoreLink="/Conversation/Unit05"
                  note="Nghe hội thoại"
                  imgUrl="listen.png"
                  linkLabel="Nghe"
                  imgWidth={20}/>
  )
}

export default Conversation