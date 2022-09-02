/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Router from "next/router";
import Axios from '../../components/apiRequest/Axios'
import Adsense from '../../components/ads/DisplayAds'
import RecentPost from '../../utils/RecentPost';
import Tag from '../../utils/Tag';
import ShareSocial from '../../utils/share/ShareSocial';
import Fbcomment from '../../utils/Fbcomment'
import DefaultLayout from '../../components/DefaultLayout';


export async function getServerSideProps() {
    try {
     const resp = await Axios({method: "GET", url: '/epsinfo/lichthi-ngaythi'})
     const resp1 = await Axios({method: "GET", url: "/epsinfo"})
     return {
       props: {
         post: await resp.data,
         recentpost: await resp1.data.sort((a,b) => b.id - a.id).slice(0,4)
       }
     };
    } catch (error) {
     return {
       props: {
         err: "Error: Not connected. Please check your Internet connection and try"
       }
     }
    }
 }

 export default function NthiLthi ({
    post, 
    recentpost
}){
    console.log(recentpost)
    React.useEffect(()=>{
        if(post) {
            Axios({
            method:'PUT',
            url: `epsinfo/view/${post.id}`
        })
    }
    },[post]);
    const [showShare, setShowShare] = React.useState(false);
  return (
    <DefaultLayout>
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
                            src={`/media/img/eps-bg.jpg`}
                            alt="lich thi"
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
                        <ShareSocial shareUrl={`/Epsinfo/${post.page}`} title={post.title}/>
                        </div>}
                    <div className='content__post'>
                        <h3 className='text-main-b-dl pb-2'><strong><span>{post.title}</span></strong></h3>
                        <iframe width="100%" height="630px" src="https://vie-ko.com/eps/ngaythi.html" title="eps-info" frameBorder="0" allow="clipboard-write; encrypted-media"></iframe>
                        <iframe width="100%" height="830px" src="https://vie-ko.com/eps/lichthi.html" title="eps-info" frameBorder="0" allow="clipboard-write; encrypted-media"></iframe>
                    </div>
                </div>
                <div className='m-0 p-0 pt-2 pb-2'>
                    <Adsense slot="8882564828" />
                </div>
                <Fbcomment url="/Epsinfo/lichthi-ngaythi"/>
            </div>
            <div className='col-lg-4 ps-4 mt-3'>
                <Tag/>
                <div className="rounded border border-warning mt-3 mb-3 ps-3 pe-3">
                            <h4 className="title pt-3 pb-2 text-main-b-dl">Bài viết mới nhất</h4>
                            {recentpost&&recentpost.map(item =>
                                <div className="border-warning pb-2 mb-2" key={item.id}>
                                    <RecentPost link={`/Epsinfo/${item.page}`} date={item.createAt} title={item.title} view={item.pageview}/>
                                </div>
                            )}
                        </div>
                <div className='rounded border border-warning mt-3 mb-3'>
                    <Adsense slot='8882564828'/>
                </div>
            </div>
        </div>
    </div>
    </DefaultLayout>
  )
}