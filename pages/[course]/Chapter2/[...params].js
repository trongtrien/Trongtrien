/* eslint-disable @next/next/no-img-element */
import React from "react";
import Lesson from "../../../components/courses/Lesson";
import CourseLayout from "../../../components/CourseLayout";
import SEO from '../../../components/seo'
import Axios from "../../../components/apiRequest/Axios";
// import SeachDic from "../../../components/seachDic/SeachDic";
import useMediaQuery from "../../../utils/isMobile";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";

export async function getServerSideProps({params}) {
   try {
    const id = params.params[0].slice(7, -2)
    const resp = await Axios({method: "get", url: `/lesson2/${id}`})
    const lessons = await Axios({method: "get", url: 'lesson2'})
    const courseviews = await Axios({method: "get", url: '/courseviews/2'})
    const dic = await Axios({method: "GET", url: `/gamesQ/${id}`})
    const progress = await Axios({method: "GET", url: '/progress'})
    return {
      props: {
        lesson: await resp.data,
        listLessons: await lessons.data,
        dataDic: await dic.data,
        progress: await progress.data,
        courseview: await courseviews.data,
        para: params
      },
    };
   } catch (error) {
    return {
      err: "Error: Not connected. Please check your Internet connection and try"
    }
   }
}

export default function Home({ lesson,listLessons, dataDic, para, err, courseview, progress }) {
  // token
  const cookie = new Cookies()
  const token = cookie.get('TOKEN')
  const [decoded, setDecoded] = React.useState(true);

  React.useEffect(() => {
    if(token){
        setDecoded(jwtDecode(token))
    }
},[token])

const id = Number(para.params[0].slice(7, -2))
const part = para.params[0].slice(-1)
const course = para.course
const link = 'Chapter2'

//  progress
const progresses = progress.find(p => p.course_id == 2)

    // show hide menu
    const [showMenu, setShowMenu] = React.useState(true);
    const isMobile = useMediaQuery('1200')
    React.useEffect(() => {
        if(!isMobile){
            setShowMenu(true)
        }else {
            setShowMenu(false)
        }
    },[isMobile])
  return (
    <CourseLayout link={link}
                  setShowMenu={setShowMenu}
                  showMenu={showMenu}
                  chapterLabel='Tập 2'
                  lesonLabel={`Bài ${id} - tiết ${part}`}>
      <SEO title={lesson.title}
           description='Khóa học tiếng Hàn EPS-TOPIK 2. Chúng tôi tâm huyết - các bạn nỗ lực, thành công sẽ đến là chuyện không ảo tưởng'
           imgUrl={courseview.imgUrl}/>
      <Lesson link={link}
              lesson_ssr = {lesson}
              courseId = {'2'}
              listLesson = {listLessons}
              showMenu = {showMenu}
              token = {token}
              partParam = {part}
              progresses = {progresses}
              dataDic = {dataDic}
              idParam = {id}/>
    </CourseLayout>
  );
}
