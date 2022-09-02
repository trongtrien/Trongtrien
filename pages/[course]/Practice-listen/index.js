/* eslint-disable @next/next/no-img-element */
import React from "react";
import Cookies from "universal-cookie";
import Axios from "../../../components/apiRequest/Axios";
import CourseDetail from "../../../components/courses/CourseDetail";
import DefaultLayout from "../../../components/DefaultLayout";

export async function getServerSideProps() {
  const resp = await Axios({method: "get", url:"/courseviews"})
  return {
    props: {
      post: await resp.data,
    },
  };
}

export default function Practicelisten({ post }) {
    const [token, setToken] = React.useState('')
    const list = {
      id: 4,
      goLink: '/Course/Practice-listen/1-20(1)',
      chapter: 'Practice-listen',
      lessonLabel: 'Ôn bộ đề 960 câu nghe',
      description: 'Hướng dẫn ôn bộ đề để chuẩn bị kiến thức, làm quen dạng đề để các bạn tự tin bước vào kỳ thi ...',
      mark: 'practice'
  }
    React.useEffect(() => {
       let mounted = true
       const cookie = new Cookies()
       if(cookie&&mounted) {
        setToken(cookie.get('TOKEN'))
       }
       return () => (mounted = false)
    },[])
  return (
    <DefaultLayout>
        <CourseDetail data={post} listChapterDetail={list} token={token&&token}/>
    </DefaultLayout>
  );
}
