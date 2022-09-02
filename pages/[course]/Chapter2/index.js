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

export default function Chapter2({ post }) {
    const [token, setToken] = React.useState('')
    const list = {
      id: 2,
      goLink: '/Course/Chapter2/Lesson=31-1',
      chapter: 'Chapter2',
      lessonLabel: 'EPS-TOPIK II',
      description: 'Khóa học dành riêng cho các bạn học để tham gia kỳ thi eps xuất khẩu lao động ...',
      mark: 'lesson'
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
