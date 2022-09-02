/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import { EpsCard } from '../../utils/Card'

export default function Eps ({ data, err })  {
  return (<div id='main'>
      <div className='bg-dl pb-5'>
    <div className="container pb-2">
      <div className='d-flex'>
          <h2 className='text-secondary fw-bold me-auto'>Khóa học cho bạn
          </h2>
          <Link href='/Course'><a className='fs-4 text-warning'>Xem tất cả <img width={30} src='/media/img/mui_ten_r.png' alt='' /></a></Link>
      </div>
        <div className="row">
            {data?data.map((item, index) =>
              <div key={index}
                className="col-md-6 col-lg-4 p-2">
                <EpsCard data={item}/>
              </div>
                ):<div><span className='p-3 text-warning fs-5'>! {err}</span><span className='text-secondary'>Not connected. Please check your Internet connection and try</span></div>}
        </div>
    </div>
    </div>
  </div>)
}