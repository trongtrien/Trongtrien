import React, {useEffect, useState} from 'react'
import TestEPS from "./TestEPS"
import QuizVoc from "./QuizVoc"
import QuizGrammar from "./QuizGrammar"
import Conversation from "./Conversation"
import Courses from "./Courses"
import Exams from "./Exams"
import useMediaQuery from '../../utils/isMobile'
import Adsense from '../ads/DisplayAds'
import Tag from '../../utils/Tag'
import Cookies from 'universal-cookie'
import jwtDecode from 'jwt-decode'
import Link from 'next/link'
import Axios from '../apiRequest/Axios'

const Study = () => {
    const [datas, setDatas] = useState([])
    const [newData, setnewData] = useState([])
    console.log(newData)
    useEffect(() => {
        let mounted = true;
        if(mounted)
        Axios({method: "GET", url: "/lessonsdata"})
        .then(res => setDatas(res.data))
        return() => (mounted =false)
    },[])

    useEffect(() => {
        let mounted = true;
        if(mounted&&datas.length)
        setnewData(window.quizData,...datas)
        return() => (mounted =false)
    },[])

    const Data = [
        {
            title: "Khóa Học",
            childElement: <Courses />,
            link: "Course"
        },
        {
            title: "Làm đề - Exam experience",
            childElement: <Exams />,
            link: "Course"
        },
        {
            title: "Từ mới - Vocabulary Quiz",
            childElement: <QuizVoc data={newData.filter((d) => d.lesson_id <= 15)}/>,
            link: "Vocabulary/Unit03-word"
        },
        {
            title: "Trắc nghiệm ngữ pháp - Grammar",
            childElement: <QuizGrammar data={datas.filter((d) => d.lesson_id <= 15)}/>,
            link: "Grammar-Quiz/Unit06"
        },
        {
            title: "Hội thoại 60 bài - Conversation",
            childElement: <Conversation data={datas.filter((d) => d.lesson_id <= 15)}/>,
            link: "Conversation/Unit05"
        },
        {
            title: "EPS-TOPIK",
            childElement: <TestEPS data={datas.filter((d) => d.lesson_id <= 15)}/>,
            link: "/Epstopik-Test/Unit06"
        }
    ]

    const isMobile = useMediaQuery('911')
    const cookie = new Cookies()
    const token = cookie.get("TOKEN")
    const [decoded, setDecoded] = React.useState({role: "basic"})
    React.useEffect(() => {
        let unmound = true
        if(token&&unmound){
            setDecoded(jwtDecode(token))
        }
        return ()=> (unmound = false)
    },[])
  return (
    <div className='container p-0 pt-3'>
    <div className='row text-dl ps-3 pe-3 m-0'>
        <div className='col-lg-8 ps-0 pe-0 '>
            <div className='row pb-1 pt-3'>
                <img src="/media/img/blog/banner.jpg" alt='' />
            </div>
        {Data.map(d =>
        <div className='pt-3' key={d.title}>
            <Link href={d.link} passHref><h3 className='m-0 btn btn-main-y fs-3'>{d.title} &nbsp;<img height={30} width={30} src="/media/img/arrow.gif" alt=''/></h3></Link>
            <hr />
            <div className='border border-warning rounded mt-2 p-2'>{d.childElement}</div>
        </div>
        )}
            <div className='m-0 p-0 pt-2 pb-2'>
                {(!token||decoded.role==="basic")&&<Adsense slot="8882564828" />}
            </div>
        </div>
        <div className='col-lg-4 ps-4 mt-3'>
            <Tag/>
            {(!token||decoded.role==="basic")&&<div className='rounded border border-warning mt-3 mb-3'>
                <Adsense slot='8882564828'/>
            </div>}
        </div>
    </div>
</div>
  )
}

export default Study