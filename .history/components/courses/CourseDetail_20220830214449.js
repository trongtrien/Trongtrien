/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { EpsCard } from '../../utils/Card'
import Axios from '../apiRequest/Axios'
import jwt_decode from "jwt-decode"
import Router from 'next/router'
import swal from 'sweetalert'


const CourseDetail = ({
    data,
    token,
    // listChapterDetail
    listChapterDetail

}) => {
  const chapter = listChapterDetail.chapter
  const pageviewCount = (courseId) =>{
    Axios({
      method: 'PUT',
      url:`/courseviews/${courseId}`
    })
  }

  const registerLesson = (courseId) =>{
    console.log(courseId)
    if(token)
    Axios({
      method: 'POST',
      url: '/progress',
      data: {
              userId: jwt_decode(token).userId,
              course_id: courseId
            }
    })
  }

// get new data
const [newData, setnewData] = React.useState([])

React.useEffect(() => {
  if(data)
  setnewData(data.filter((newdata) => newdata.id != listChapterDetail.id).sort((a,b) => a.id - b.id))
},[data,chapter])// eslint-disable-line react-hooks/exhaustive-deps

//get checkRegister
const [checkRegister, setcheckRegister] = React.useState(false)

React.useEffect(() => {
  let componentDidMount = true;
  if(componentDidMount&&token&&listChapterDetail.id)
  Axios({
    method: 'GET',
    url: `/progress/${jwt_decode(token).userId}`
  })
  .then(res => setcheckRegister(res.data.find(data => data.course_id == listChapterDetail.id)))
  return ()=> (componentDidMount=false)
},[listChapterDetail.id,token])


const [show, setshow] = React.useState(false)
function Show() {
  setshow(!show)
}
  return (
    <div className="container pb-4">
        <div className='pt-5'>
            <h2 className='pt-3 mb-4'>
              <button className="btn btn-main-y f rounded-3 ps-4 pe-4 p-2">Khóa học ({listChapterDetail.lessonLabel})</button>
            </h2>
                
                <div className='text-dl mb-4 mt-0 fs-4'>
                  {chapter === "Chapter1"&&<><p> ( Nằm trong giáo trình 한국어 표준교재 1 từ bài 1 đến bài 30)<br />
                                                 Khóa học tập trung kiến thức cho những ai muốn học để thi EPS-TOPIK</p></>
                                         }
                  {chapter === "Chapter2"&&<><p>( Nằm trong giáo trình 한국어 표준교재 2 từ bài 31 đến bài 60)<br />
                                                 Khóa học tập trung kiến thức cho những ai muốn học để thi EPS-TOPIK</p></>
                                         }
                  {(chapter === "Practice-listen"||chapter === "Practice-read")&&<><p>( Đây là khóa luyện làm bộ 2000 câu)<br />
                                                  Kết hợp xem video giải đề và thực hành làm bài trắc nghiệm để củng cố lại kiến thức và làm quen cách thức thi</p></>
                                         }
                </div>
            <div>
              
                <button type="button" className="btn-main-y rounded-3 ps-4 pe-4 p-2 fs-5" onClick={() => {
                  pageviewCount(listChapterDetail.id)
                  setTimeout(() => Router.push(listChapterDetail.goLink), 200)
                }}>Vào học</button>
                <button type="button" className="btn-main-y rounded-3 ps-4 pe-4 p-2 fs-5 ms-2" onClick={() => {
                  if(!checkRegister&&token){
                    registerLesson(listChapterDetail.id)
                    setTimeout(() => {
                      swal({
                        text: "Bạn đã ghi danh thành công, chăm chỉ học nhé!"
                      })
                      .then(() => Router.reload())
                    })
                  } else if(!token){
                    swal({
                      text: "Bạn chưa (đăng nhập/đăng ký) thành viên. Vui lòng (đăng nhập/đăng ký) để ghi danh ạ"
                    })
                  } else {
                    swal({
                      text: "Bạn đã ghi danh khóa học rồi ạ, nếu chưa vào học được hãy liên hệ để mình kiểm tra ạ"
                    })
                  }
                }}>Ghi danh</button>
              
            </div>
            <div className='mt-3'>
                <button type="button" className="btn-main-y rounded-3 ps-4 pe-4 p-2 fs-5" onClick={Show}>{show?'Tắt hướng dẫn sử dụng khóa học':'Hướng dẫn sử dụng khóa học'}</button>
                {show&&<div className='ratio ratio-16x9 mt-3'>
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/7ICd0_CmnUg?rel=0&amp;modestbranding=1&autohide=1&showinfo=0&enablejsapi=1"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                </div>}
            </div>
        </div>
        <div className='mt-5'><h1 className='text-dl'>&nbsp;<img height={40} src='/media/img/mui_ten_r.png' alt=''/>&nbsp;&nbsp;Các khóa học khác</h1></div>
        <div className="row pb-3">
          {newData&&newData.map((item, index) => 
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 mt-5" key={index}>
                            {item.id<10&&
                            <EpsCard data={item} />}
            </div>)}
        </div>
</div>
  )
}

export default CourseDetail