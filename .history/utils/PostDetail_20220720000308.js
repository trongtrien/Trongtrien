/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Router from "next/router";
import Adsense from '../components/ads/DisplayAds'
import RecentPost from './RecentPost'
import Tag from './Tag'
import ShareSocial from './share/ShareSocial'
import Fbcomment from '../utils/Fbcomment'


const PostDetail = ({
    post, 
    recentpost,
    parentPage,
    shareUrl,
    imgLink
}) => {
        const [showShare, setShowShare] = React.useState(false);
  return (
    <div className='container p-0 pt-3'>
              <div className='d-flex'>
        <button className='btn' onClick={() => Router.back()}>
            <img width={80} src='/media/img/goback2.png' alt=''/>
        </button>
      </div>
        <div className='row text-dl ps-3 pe-3'>
            <div className='col-lg-8 ps-2 pe-2 pb-2'>
                <div className='row pb-5 pt-3'>
                    <div className='mb-4'>
                        <img className="mt-1 p-0 rounded-3"
                            width="100%"
                            src={`/media/img/${imgLink}/${post.imgURL}`}
                            alt={post.title}
                        />
                        <div className='d-flex mt-3 text-dl'>
                            <span className='me-auto'><i className="fa fa-calendar" aria-hidden="true"></i> {post.createAt} by Admin</span>
                            <span className='m-0 p-0 me-3'
                                    onClick={() => setShowShare(!showShare)}
                                    style={{cursor: 'pointer'}}
                            >
                                Share <i className="fa fa-share-alt text-logo-b" aria-hidden="true"></i>
                            </span>
                            <span>{post.pageview} <i className="fa fa-eye text-logo-b" aria-hidden="true"></i></span>
                        </div>
                    </div>
                    {showShare&&<div className='mb-4 mt-2 bg-secondary bg-opacity-25 rounded pt-3 pb-3 text-center'>
                        <ShareSocial shareUrl={shareUrl} title={post.title}/>
                        </div>}
                    <div className='content__post'>
                        <h3 className='text-main-b-dl pb-2'><strong><span>{post.title}</span></strong></h3>
                        <div className='text-dl' dangerouslySetInnerHTML={{__html:post.content.replace("online", "Ofline")}}/>
                        {post.sourse !== ""&&
                        <p className='text-dl' style={{textAlign: 'right'}}>
                            Nguồn:&nbsp;
                        <Link href={post.sourse}><a>{post.sourse}</a></Link>
                        </p>}
                    </div>
                </div>
                <div className='m-0 p-0 pt-2 pb-2'>
                    <Adsense slot="8882564828" />
                </div>
                <Fbcomment url={`${shareUrl}`}/>
            </div>
            <div className='col-lg-4 ps-4 mt-3'>
                <Tag/>
                <div className="rounded border border-warning mt-3 mb-3 ps-3 pe-3">
                            <h4 className="title pt-3 pb-2 text-main-b-dl">Bài viết mới nhất</h4>
                            {recentpost&&recentpost.map(item =>
                                <div className="border-warning pb-2 mb-2" key={item.id}>
                                    <RecentPost link={`/${parentPage}/${item.page}`} date={item.createAt} title={item.title} view={item.pageview}/>
                                </div>
                            )}
                        </div>
                <div className='rounded border border-warning mt-3 mb-3'>
                    <Adsense slot='8882564828'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostDetail