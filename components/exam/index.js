import React from 'react'
import Exam from './Exam'
import Cookies from 'universal-cookie'
import jwt_decode from "jwt-decode"

const Exams = ({
    questions,
    id,
    className,
    ExamCard
}) => {
  const cookie = new Cookies()
  const token = cookie.get("TOKEN")

  const [decoded, setdecoded] = React.useState([])
  React.useEffect(() => {
    let mounded = true
    if(token&&mounded){
      setdecoded(jwt_decode(token))
    }
    return ()=> (mounded = false)
  },[token])
  const [examStatus, setExamStatus] = React.useState(false)
  return (<>
    {examStatus?<Exam questions={questions} examId={id} className={className} ExamCard={ExamCard}/>:
        <div className='container'>
        <div className='row wrap-exam-body ps-3 mt-2 mb-2'>
          <h4 className='text-center'>응시자 정보 - Thông tin thí sinh</h4>
          <div><h4 className='text-center'>Kiểm tra thông tin hoặc xem hướng dẫn trước khi vào làm bài bạn nhé</h4></div>
          <h6 className='text-center'>{token?"":"Hệ thống kiểm tra thấy bạn không phải là thành viên của hệ thống nên những thông tin sẽ không được lưu và gửi phản hồi về bài làm của bạn"}</h6>
          <div className='row'>
            <hr />
            <div className='col-4 text-center'>
            <h5>Exam No/Số đề</h5>
            <h5 className='text-info' style={{fontSize: "5rem"}}>{id}</h5>
            </div>
            <div className='col-8'>
              <ul className='list-unstyled'>
                <li className='border border-secondary rounded-pill mt-2 p-1'>
                  <span className='rounded-pill fs-5 ps-3 pe-3 text-info fw-bold'>Name:</span>
                  <span>{token?decoded.name:"Khách vãng lai"}</span>
                </li>
                <li className='border border-secondary rounded-pill mt-2 p-1'>
                  <span className='rounded-pill fs-5 ps-3 pe-3 text-info fw-bold'>수험번호 Số báo danh:</span>
                  <span>{token?decoded.iat:"Khách vãng lai"}</span>
                </li>
              </ul>
            </div>
            <hr />
          </div>
          <div className='row'>
            <div className='d-flex mb-4'>
                <button type="button" className="btn btn-exam" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="Xem hướng dẫn - 안내">Xem hướng dẫn - 안내</button>
                <button className='btn ms-auto btn-exam' onClick={() => setExamStatus(true)}>Vào làm đề - 시작</button>
            </div>
          </div>
        </div>
  
  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-xl modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Hướng dẫn làm bài thi</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className='ratio ratio-16x9 p-0 border rounded'>
            <iframe
                src={`https://www.youtube.com/embed/dogcPvdvkCE?rel=0&amp;showinfo=0;start=19`}
                controls="0"
                title="YouTube video player"
                frameBorder="0"
                allow="fullscreen;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
      </div>}
  </>)
}

export default Exams