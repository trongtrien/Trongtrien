/* eslint-disable @next/next/no-img-element */
import React from "react";
import Practice from "../../../components/courses/Practice";
import CourseLayout from "../../../components/CourseLayout";
import SEO from '../../../components/seo'
import Axios from "../../../components/apiRequest/Axios";
import useMediaQuery from "../../../utils/isMobile";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";

export async function getServerSideProps({params}) {
   try {
    const id = params.params[0].slice(6, -1)
    const lesson = await Axios({method: "get", url: `/practice-listen/${id}`})
    const lessons = await Axios({method: "get", url: 'practice-listen'})
    const courseviews = await Axios({method: "get", url: '/courseviews/4'})
    const dic = await Axios({method: "GET", url: `/gamesQ/${id}`})
    const progress = await Axios({method: "GET", url: '/progress'})
    return {
      props: {
        lesson: await lesson.data,
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
const id = Number(para.params[0].slice(6, -1))
const titleParam = para.params[0].slice(0, -3)
const course = para.course
const link = 'Practice-listen'
//  progress
const progresses = progress.find(p => p.course_id == 4)

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
                  chapterLabel='듣기'
                  lesonLabel={`${titleParam}`}>
      <SEO title={lesson.title}
           description='Khóa học tiếng Hàn EPS-TOPIK - Ôn bộ đề 960 câu nghe. Chúng tôi tâm huyết - các bạn nỗ lực, thành công sẽ đến là chuyện không ảo tưởng'
           imgUrl={courseview.imgUrl}/>
      <Practice link={link}
              lesson_ssr = {lesson}
              courseId = {'4'}
              listLesson = {listLessons}
              showMenu = {showMenu}
              token = {token}
              progresses = {progresses}
              dataDic = {dataDic}
              idParam = {id}/>
    </CourseLayout>
  );
}
