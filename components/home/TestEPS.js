import React from 'react'
import QuizTamplate from './QuizTemplate'

const Epstopik = ({
    data
}) => {
  return (
    <QuizTamplate data={data}
                  link="/Epstopik-Test/Unit"
                  linkend=""
                  SeemoreLink="/Epstopik-Test/Unit06"
                  note="EPS-TOPIK"
                  imgUrl="mui_ten_r.png"
                  linkLabel="들어갈까요?"
                  imgWidth={40}/>
  )
}

export default Epstopik