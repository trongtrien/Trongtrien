import React, {useEffect} from 'react'
import Exam from '../../../components/exam'
import Axios from '../../../components/apiRequest/Axios'
import ExamCard from '../../../components/exam/ExamCard'
import DefaultLayout from '../../../components/DefaultLayout'



export async function getServerSideProps({params}) {
  const id = params.id
    try {
     const resp = await Axios({method: "get", url: `/question/${id}`})
     return {
       props: {
        questions: await resp.data,
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

const Exams = ({
    questions,
    id
}) => {
  return (<DefaultLayout><Exam questions={questions} id={id} ExamCard={ExamCard} className="col-lg-8 m-auto"/></DefaultLayout>)
}

export default Exams