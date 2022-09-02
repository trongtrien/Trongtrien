/* eslint-disable @next/next/no-img-element */
import React from 'react'
import DefaultLayout from '../../components/DefaultLayout'
import Axios from '../../components/apiRequest/Axios'
import { EpsCard } from '../../utils/Card'

export async function getServerSideProps () {
    const r = await Axios({method: "GET", url: "/courseviews"})
    return {
        props: {
            list: await r.data.filter(d => d.id<18)
        }
    }
}

const Course = ({list}) => {
  return (
    <DefaultLayout>
        <div className='container'>
            <div className='bg-success rounded bg-opacity-10 p-2 mt-2'>
                <h2 className='text-dl mt-4 mb-4 text-center'>Con đường chông gai từ đây bạn nhé ...!!!</h2>
                    <h3 className='text-center text-success mb-4'>
                        <p className='mt-5 mb-5 text-dl' style={{fontSize: "30px"}}>***** 💼 💼 💼 *****</p>
                        <em>
                            <strong>
                            Hù bạn chút thôi chông gai nào nếu cố gắng đều sẽ vượt qua ...! 
                            </strong>
                        </em>
                    </h3>
                
            </div>
            <div className='mt-2'>
                <h1 className='text-dl text-main-b-dl'>
                    &nbsp;<img height={40} src='/media/img/mui_ten_r.png' alt=''/>
                    &nbsp;Khóa học cho bạn</h1>
            </div>
            <div className='row'>
                {list.map((l,i) => <div key={i}
                                        className="col-md-6 col-lg-4 p-2">
                                        <EpsCard data={l}/>
                                    </div>
                                    )}
            </div>
            <div className='bg-success rounded bg-opacity-10 p-2 mt-2'>
                <h3 className='text-dl'>Con đường chông gai từ đây bạn nhé ...!!!</h3>
            </div>
        </div>
    </DefaultLayout>
  )
}

export default Course