import React from 'react'

const ExamCard = ({selectedOptions,time}) => {
  return (
    <div className='col-lg-3 wrap-exam-body-right p-1 pb-3'>
    <div className='row m-0 ps-1 pe-1'>
        <table className="table border-1 table-bordered border-info mt-1 bg-light">
            <thead>
                <tr>
                    <td colSpan={4} className='p-0 area_time border-info'>
                        <img src='/media/img/area_time.jpg' alt=''/>
                        <h4 className='mt-2'>{time.mm}: {time.ss}</h4>
                    </td>
                </tr>
            </thead>
            <tbody className='border-1'>
                <tr className='text-center align-middle border-info'>
                    <th colSpan={2} className="fs-4 text-info pb-3">Đọc</th>
                    <th colSpan={2} className="fs-4 text-info pb-3">Nghe</th>
                </tr>
                    {Array.from(Array(20).keys()).map(item =>
                    <tr className='text-center align-middle border-info text-dark' key={item}>
                        <th className='fs-5'>{item+1}</th>
                        <td className='border-info fs-6'>{item<selectedOptions.length&&'⚫️'}</td>
                        <th className='fs-5'>{21+item}</th>
                        <td className='border-info fs-6'>{4+item<selectedOptions.length&&'⚫️'}</td>
                    </tr>)}
            </tbody>
        </table>
    </div>
</div>
  )
}

export default ExamCard