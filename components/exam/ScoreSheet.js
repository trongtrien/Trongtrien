import React from 'react'
import SendResuit from './sendResult'

const ScoreSheet = ({
    score,
    questions,
    examId,
    name,
    email
}) => {
  const [showScore, setShowScore] = React.useState(false)
  const Incorect = questions.length-score/5
  const quesNumber = questions.length
  return (
    <div className='container'>
        <SendResuit
        score={score}
        examId={examId}
        name={name}
        setShowScore={setShowScore}
        email={email}/>
        {showScore&&<div>
          <table className="table border-0 mt-3">
            <tbody className='border-0'>
                <tr className='text-center align-middle border-0'>
                    <th colSpan={3} className="fs-4 text-info pb-2 border-0"><h1 className="font-semibold">Your Resuit - Kết quả</h1></th>
                </tr>
                <tr className='align-middle border-0 d-flex justify-content-center mt-2'>
                    <td className='border-0 fs-6'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td className='fs-6 text-dl border border-warning rounded ps-4 pe-4'>
                      <ul className='list-unstyled'>
                        <li style={{textAlign: "left", fontSize: "1.5rem"}}><span>Your Name: {name}</span></li>
                        <li style={{textAlign: "left", fontSize: "1.5rem"}}><span>Your score: {score}</span></li>
                        <li style={{textAlign: "left", fontSize: "1.5rem"}}><span>Incorect: {Incorect} / {quesNumber}</span></li>
                      </ul>
                    </td>
                    <td className='border-0 fs-6'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                </tr>
                <tr className='text-center align-middle border-0 p-0'>
                    <td colSpan={3} className='border-0 fs-6 text-dl'><h5>
                      { Incorect > quesNumber/2 ?("Bạn làm bài chưa tốt đâu nhé cần cố gắng nhiều nha!. Ôn lại bài, học thêm từ mới rồi quay lại làm thử nha. Cố lên"):
                      ( quesNumber/2 >= Incorect&&Incorect >= quesNumber/4 ? "Bạn làm bài tạm ổn rồi ạ!. Ôn bài thêm, học thêm từ mới rồi quay lại làm thử  nữa nha. Cố lên!":
                      "Bạn làm bài tốt lắm. Làm nhiều đề khác mà đạt kết quả như này là vững vàng vào phòng thi nha!!!")}</h5>
                    </td>
                </tr>
            </tbody>
        </table>
                    </div>}
    </div>
  )
}

export default ScoreSheet