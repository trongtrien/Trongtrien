import React, {useState} from 'react'
import Practice from './'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'
import Router from 'next/router'

function Scoresheet({
    totalQuestions,
    score,
    progress,
    updateProgress,
    dntitle,
    answerList,
    idParam,
    titleParam,
    // chinh la link
    link
}) {
    const [nextLesson, setNextLesson] = useState(false) //Hook to check if Exit button was clicked
    const [prevLesson, setPrevLesson] = useState(false) //Hook to check if Exit button was clicked
    const [restart, setRestart] = useState(false) //Hook to check if Restart button was clicked
    const total = totalQuestions;
    const inCorrect = total  - score/5;

    // set disabledClick
    const cookie = new Cookies()
    const token = cookie.get('TOKEN')
    const [disabledClick, setDisabledClick] = useState(false)
    
    const id = idParam
    console.log(id)
    const title = titleParam
    console.log(title)


    const disableClick = (Number(id)>30?(Number(id)-30)*2:Number(id)*2) <= Number(progress)

    const chapter = link
    console.log(chapter)
    if(chapter==="Practice-listen"||chapter==="Practice-read"){
        let n1 = title.split("-")
        let n2 = n1.map(item => (Number(item)))
        if(nextLesson === true){
            return Router.push(`${n2[0]+20}-${n2[1]+20}(${Number(id)+1})`)
        }
        if(prevLesson === true){
            return Router.push(`${n2[0]-20}-${n2[1]-20}(${Number(id)-1})`)
        }
    }

    if(nextLesson === true){
        return Router.push(`Lesson=${id+1}-1`)
    }
    if(prevLesson === true){
        return Router.push(`Lesson=${id-1}-1`)
    }
    //Restart was clicked so load the Quiz component (pass the username along)
    if(restart === true){
        return (
        <div>
            <Practice updateProgress={updateProgress} progress={progress} idParam={idParam} titleParam={titleParam} link={link}/>
         </div> 
        )
    }
    return (
        <div>
            <div className="container-exam">
                <div className="scoresheet rounded-3 p-3">
                    <h1 className='pt-4'>Bạn đã hoàn thành bài kiểm tra</h1><br />
                    <h3>Số câu trả lời sai {inCorrect}</h3>
                    <h4>{dntitle}</h4>
                    <div className='d-flex p-2'>
                        <button className="button btn-exam me-auto" onClick={() => setPrevLesson(true)}>Bài cũ</button>
                        <button className="button btn-exam me-auto" onClick={() => setRestart(true)}>Làm lại</button>    
                        <button className="button btn-exam" onClick={() => setNextLesson(true)}>Bài mới</button>
                    </div>               
                </div> 
            </div>
            <div>
                <div className="scoresheet rounded-3 p-3"> 
                       <li>
                           {inCorrect<=(total/5)&&<div className='text-left pb-2'>
                           <h5 className='m-0 pb-1'>Bạn đã hoàn thành xuất xác bài kiểm tra</h5>
                                            ➤ Xem kết quả bên dưới xem mình có sai ở đâu không nhé</div>}
                           {(inCorrect>(total/5)&&inCorrect<(total/2))&&<div className='text-left pb-2'>
                           <h5 className='m-0 pb-1'>Bạn làm bài khá tốt, cố gắng chút nữa nha</h5>
                                            ➤ Xem kết quả bên dưới xem mình sai ở đâu, ghi nhớ và ôn tập lại ạ!</div>}
                           {inCorrect >=total/2&&<div className='text-left pb-2'>
                           <h5 className='m-0 pb-1'>Bạn đã hoàn thành bài kiểm tra tuy nhiên kết quả chưa được ưng ý lắm cố gắng thêm nhiều nhé</h5>
                                            ➤ Xem kết quả bên dưới xem mình sai ở đâu, ghi nhớ và ôn tập lại ạ!</div>}
                       </li>
                       <table className='table table-lesson bordered'>
                            <tbody>
                                <tr>
                                    <td className='text-dark fs-3'>{answerList}</td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
            {(inCorrect<(total/2))&&!disableClick&&token?<div>
                <p>Bạn đủ điểm để xác nhận qua bài nhấn nút xác nhận bên dưới để bọn mình cập nhật tiến trình học cho bạn nhé</p>
                <div>
                <button className='btn btn-main-y fs-5 ps-3 pe-3'
                        disabled={disabledClick||disableClick}
                        onClick={() => {
                            setDisabledClick(true)
                            updateProgress()
                            setTimeout(() => Swal.fire({
                                title: 'Bạn đã hoàn thành bài học',
                                text: 'Chúc mừng bạn đã hoàn thành bài học, hãy nghỉ ngơi thư giãn đầu óc để lấy tinh thần cho các bài học sau!',
                                icon: 'success'
                            }).then(() => Router.reload()), 200)
                        }}
                >Xác nhận</button>
                </div>
            </div>:<div>{disableClick&&<p>Bạn đang ôn lại bài đúng không? Đúng rồi phải thường xuyên ôn luyện thì mới nhớ bài lâu ạ !!!</p>}</div>}
        </div>
    )
}

export default Scoresheet