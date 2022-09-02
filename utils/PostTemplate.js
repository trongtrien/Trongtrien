/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'
import Adsense from '../components/ads/DisplayAds'
import Pagination from './Pagination'
import RecentPost from './RecentPost'
import Tag from './Tag'
import useMediaQuery from './isMobile'

const PostTemplate = ({
    post, 
    recentpost, 
    title, 
    parentPage,
    disabled,
    page,
    imgURL
}) => {
    const isMobile = useMediaQuery('911')
  return (
    <div className='container p-0 pt-3'>
        <h2 className='m-0 text-dl ps-3 text-logo-b'>{title}</h2>
        <div className='row text-dl ps-3 pe-3 m-0'>
            <div className='col-lg-8 ps-0 pe-0 '>
                {!isMobile?<div className='row pb-5 pt-3'>
                    <img src={`/media/img/${imgURL}/banner.jpg`} alt='' />
                </div>:<hr />}
                {post.map((post, index) =>
                <div className='row border-bottom border-warning-50 pb-5 pt-3' key={index}>
                    <div className='col-md-4 col-xl-3 pb-3 pt-1'>
                        <img className='rounded' style={{width: "100%"}} src={`/media/img/${imgURL}/s${post.imgURL}`} alt='' />
                    </div>
                    <div className='col-md-8 col-xl-9'>
                        <h4 className='p-0'>
                            <Link href={`${parentPage}/${post.page}`}><a className='text-main-b-dl'>{post.title}</a></Link>
                        </h4>
                        <div className='d-flex pt-1 pb-2'>
                            <span className='me-2 text-secondary'><i className="fa fa-calendar" aria-hidden="true"></i></span>
                            <span className='me-2 text-secondary'>{post.createAt}</span>|
                            <span className='me-2 ms-2 text-secondary'>Viết bởi - Admin</span>|
                            <span className='me-2 ms-2 text-secondary'>{post.pageview} <i className="fa fa-eye text-logo-b" aria-hidden="true"></i></span>
                        </div>
                        <p dangerouslySetInnerHTML={{__html: post.description}} />
                        <button className='rounded-pill btn-main-y p-1 ps-3 pe-3 btn'>
                            <Link href={`${parentPage}/${post.page}`}><a className='text-light'>Xem chi tiết ...</a>
                            </Link>
                        </button>
                    </div>
                </div>)}
                <div className='m-0 p-0 pt-5'>
                    <Pagination page={page} disabled={disabled} parentPage={parentPage}/>  
                </div>
                <div className='m-0 p-0 pt-2 pb-2'>
                    <Adsense slot="8882564828" />
                </div>
            </div>
            <div className='col-lg-4 ps-4 mt-3'>
                <Tag/>
                <div className="rounded border border-warning mt-3 mb-3 ps-3 pe-3 pb-3">
                            <h4 className="title pt-3 pb-2 text-main-b-dl">Bài viết mới nhất</h4>
                            {recentpost&&recentpost.map(item =>
                                <div className="border-warning pb-2 mb-2" key={item.id}>
                                    <RecentPost link={`${parentPage}/${item.page}`} date={item.createAt} title={item.title} view={item.pageview}/>
                                </div>
                            )}
                            <button className='rounded-pill btn-main-y p-1 ps-3 pe-3 btn'>
                                <Link href={parentPage}><a className='text-light'>Xem tất cả</a>
                                </Link>
                            </button>
                        </div>
                <div className='rounded border border-warning mt-3 mb-3'>
                    <Adsense slot='8882564828'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostTemplate