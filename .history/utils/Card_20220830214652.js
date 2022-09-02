/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Axios from '../components/apiRequest/Axios'

const AboutCard = ({imgUrl, link, title}) => {
  return (
    <div className="col-sm-6 col-lg-3 text-center mt-5 ">
        <div className='bg-dl-img rounded-circle m-auto' style={{width: "180px", padding: "40px"}}>
            <img style={{width: "100%"}} src={imgUrl} alt='' />
        </div>
        <div className='mt-5'>
            <Link href={link}><a className='text-dl'><h4 className='text-center'>{title}</h4></a></Link>
        </div>
    </div>
  )
}

const EpsCard = ({data}) => {
    const [like,setLike] = React.useState(data.likes)
    const putLikes = (courseId) =>{
        Axios({
          method: 'PUT',
          url:`/courseviews/like/${courseId}`
        })
      }
    return (
            <div className='rounded p-0 bg-secondary bg-opacity-25 border' style={{border: "solid 1px rgba(0,0,0,0.1)"}}>
                <div className='ratio ratio-16x9 epscard-after'>
                    <img style={{width: "100%"}} src={`/media/img/${data.imgUrl}`} alt='' />
                    <Link href={data.link}><a className='epscard-after-btn'>Xem khóa học</a></Link>
                </div>
                <div className='d-flex p-2 pt-2' style={{alignItems: "center"}}>
                    <Link href={data.link} passHref>
                        <span className='btn fs-4 btn-main-y rounded'>{data.title}</span>
                    </Link>
                    <span className='btn ms-auto fs-5 text-dl'><i className='text-success'>99.000</i> vnđ</span>
                </div>
                <hr className='p-0 m-0'/>
                <div className='p-0 ps-2 pt-2 m-0'>
                    <p className='text-dl' dangerouslySetInnerHTML={{__html: data.description}}/>
                </div>
                <hr className='p-0 m-0'/>
                <div className='d-flex p-2 align-middle' style={{alignItems: "center"}}>
                    <span className='p-0 m-0 fs-4 text-logo-b'>
                        <img style={{width: "50px"}} src={`/media/img/avatars/${data.author}`} alt='avatar'/>
                        &nbsp;Admin
                    </span>
                    <span className='ms-auto align-middle'>
                        <i className="fa fa-user-o text-success" aria-hidden="true"></i>
                        <span className='text-secondary ps-1'>{data.pageview}</span>
                        <span className='text-secondary ps-1 btn'
                              onClick={()=> {
                                putLikes(data.id)
                                setLike(like + 1)
                              }}><i className="fa fa-heart text-danger ps-2" aria-hidden="true"></i> {like}</span>
                    </span>
                </div>
            </div>)
}
export {AboutCard, EpsCard}