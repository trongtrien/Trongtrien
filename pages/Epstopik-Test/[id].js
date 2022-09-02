import React from 'react'
import Link from 'next/link'
import { quizGrammar_data } from '../../components/home/QuizData'
import DefaultLayout from '../../components/DefaultLayout'
import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'
import Axios from '../../components/apiRequest/Axios'
import Tag from '../../utils/Tag'
import Adsense from '../../components/ads/DisplayAds'
import useMediaQuery from '../../utils/isMobile'
import Exam from '../../components/exam/Exam'
import ExamTest from '../../components/epstopik_test/ExamTest'

export async function getServerSideProps({params}) {
      const id = params.id.slice(4,6)
    try {
     const resp = await Axios({method: "GET", url: `/lessonPracrice/${id}`})
     return {
        props: {
            id: id,
            data:quizGrammar_data.filter(d => d.id != id),
            dataPracrice: await resp.data
        }
    }
    } catch (error) {
     return {err: "Error: Not connected"}}
 }


const Voc = ({id,data,dataPracrice}) => {
    console.log(dataPracrice)
    const cookie = new Cookies()
    const token = cookie.get("TOKEN")
    const [decoded, setDecoded] = React.useState({role: "basic"})
    const isMobile = useMediaQuery("991")
    React.useEffect(() => {
        let unmound = true
        if(token&&unmound){
            setDecoded(jwtDecode(token))
        }
        return ()=> (unmound = false)
    },[])
  return (
      <DefaultLayout>
            <div className='container p-0'>
                <div className='row text-dl ps-3 pe-3 m-0'>
                    <div className='col-lg-8'>
                        <ExamTest question={dataPracrice}/>
                        <div className='row pt-1'>
                            <ul className='list-unstyled m-0 p-0 pt-2'>
                                {data.map(d =>
                                    <li className='p-1' key={d.title}>
                                        <span className='btn bg-primary text-dl bg-opacity-25 rounded' style={{width: "100%", textAlign: "left"}}>
                                            <b>{d.id}. </b>{d.title}. <Link href={`/Epstopik-Test/Unit${d.id}`}><a className='ps-5' style={{display: "flex", float: "right"}}>Let's Go<img className='ms-2' width={40} src='/media/img/mui_ten_r.png' alt='' /></a></Link>
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className='m-0 p-0 pt-2 pb-2'>
                            {(!token||decoded.role==="basic")&&<Adsense slot="8882564828" />}
                        </div>
                    </div>
                    <div className={`${isMobile?'col-lg-4 p-0 m-0':'col-lg-4 ps-4 mt-3'}`}>
                        <Tag/>
                        {(!token||decoded.role==="basic")&&<div className='rounded border border-warning mt-3 mb-3'>
                            <Adsense slot='8882564828'/>
                        </div>}
                    </div>
                </div>
            </div>
      </DefaultLayout>
  )
}

export default Voc