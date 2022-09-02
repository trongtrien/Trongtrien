import React from 'react'
import Practice from '../components/practice/Prac1'
import Axios from '../components/apiRequest/Axios'


export async function getServerSideProps() {
  try {
   const resp = await Axios({method: "get", url: '/question/1'})
   return {
     props: {
      questions: await resp.data
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

export default function Prac({questions}){
  return (
    <div className='bg-white'><Practice questions={questions}/></div>
  )
}
