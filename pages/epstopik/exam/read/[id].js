import React from 'react'
import Exam from '../../../../components/exam'
import Axios from '../../../../components/apiRequest/Axios'
import DefaultLayout from '../../../../components/DefaultLayout'


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
  return (<DefaultLayout>
    <div className='container m-auto mt-4' style={{maxWidth: "800px"}}>
      <Exam questions={questions} id={id} ExamCard="" className=""/>
    </div>
  </DefaultLayout>)
}

export default Exams