import React from 'react'
import Link from 'next/link';
import DefaultLayout from '../../components/DefaultLayout';
import Axios from '../../components/apiRequest/Axios'


export async function getServerSideProps() {
  try {
   const resp = await Axios({method: "get", url: '/question'})
   const pracIds = await resp.data.map(d => d.prac_id)
   const quesMax = Math.max(...Object.values(pracIds))
   return {
     props: {
      questionBanks: await resp.data,
      list: [
        {
          link: '/epstopik/exam/read',
          title: 'Read - Đọc',
          exam: 4
        },
        {
          link: '/epstopik/exam',
          title: 'Full Read + Listen',
          exam: quesMax
        }
      ]
     }
   }
  } catch (error) {
    return {
      props: {
        err: ""
      }
    }
  }
}


const Exams = ({
  questionBanks,
  list
}) => {
  return (
<DefaultLayout>
<div className='container'>
      <div className='row border border-warning rounded pb-2 mb-2 mt-2'>
        <div>
          <h1 className='text-center text-logo-b'>Test of proficiency in Korean<br />Thi năng lực tiếng Hàn</h1>
        </div>
        <hr />
        <div>
          <h2 className='text-center text-logo-b'>Mời bạn chọn đề từ list - 선택하십시요</h2>
          {list.map(l => <>
            <h5 className='btn-main-y m-0 p-2' style={{
            position: "relative",
            bottom: "-5px",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px"
          }}>{l.title}</h5>
          <div className="row m-0 bg-secondary rounded">
            <div className="row container m-auto ">
              <div className="col-lg-6 col-xl-6 text-center pt-5 pb-5">
                <img src="/media/img/Bank.png" alt="" style={{maxWidth: "250px"}} />
                <h3 className="mt-5 text-light">List of Exams <img width="30" src="/media/img/arrow.gif" alt="" style={{transform: "rotate(-90deg)"}} /></h3>
              </div>
              <div className="col-lg-6 col-xl-6 text-center pt-5 pb-5">
                <div className="row">
                    {Array.from(Array(l.exam).keys()).map((key => 
                    <div className="col-3 m-0 p-1" key={key}>
                      <Link href={`${l.link}/${key+1}`}><a>
                        <button style={{minWidth: "80px"}} className="btn btn-exam fs-5 ps-4 pe-4">{key+1}</button>
                      </a></Link>
                    </div>))}
                </div>
              </div>
            </div>
          </div>
          </>)}
        </div>
      </div>
    </div>
</DefaultLayout>
  )
}

export default Exams