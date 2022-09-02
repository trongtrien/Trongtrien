import React from 'react'
const ScoreSheet = ({
    score,
    questions
}) => {
  const Incorect = score/5
  const quesNumber = questions.length
  return (
    <div className='container'>
      <div>
        <table className="table border-0 mt-3">
          <tbody className='border-0'>
              <tr className='text-center align-middle border-0'>
                  <th colSpan={3} className="fs-4 text-info pb-2 border-0"><h1 className="font-semibold">Your Resuit - Kết quả</h1></th>
              </tr>
              <tr className='align-middle border-0 d-flex justify-content-center mt-2'>
                  <td className='border-0 fs-6'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td className='fs-6 text-dl border border-warning rounded ps-4 pe-4'>
                    <ul className='list-unstyled'>
                      <li style={{textAlign: "left", fontSize: "1.5rem"}}><span>Bạn đúng: {Incorect} / {quesNumber}</span></li>
                    </ul>
                  </td>
                  <td className='border-0 fs-6'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
              </tr>
              <tr className='text-center align-middle border-0 p-0'>
                  <td colSpan={3} className='border-0 fs-6 text-dl'><h5>
                    { Incorect > quesNumber/2 ?("Bạn làm bài chưa tốt đâu nhé cần cố gắng nhiều nha!. Ôn lại bài, học thêm từ mới rồi quay lại làm thử nha. Cố lên"):
                    ( quesNumber/2 >= Incorect&&Incorect >= quesNumber/4 ? "Bạn làm bài tạm ổn rồi ạ!. Ôn bài thêm, học thêm từ mới rồi quay lại làm thử  nữa nha. Cố lên!":
                    "Bạn làm bài tốt lắm. Chuyển sang làm đề để nâng cao kiến thức bạn nhé!!!")}</h5>
                  </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ScoreSheet