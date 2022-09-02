/* eslint-disable @next/next/no-img-element */
import React from "react";
import SEO from "../../components/seo";
import Axios from '../../components/apiRequest/Axios'
import DefaultLayout from "../../components/DefaultLayout";
import PostDetail from "../../utils/PostDetail";

export async function getServerSideProps({ params }) {
   try {
    const resp = await Axios({method: "GET", url: `/epsinfo/${params.id}`})
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
export default function Details({ post, recentpost }) {
        React.useEffect(()=>{
          if(post) {
              Axios({
              method:'PUT',
              url: `epsinfo/view/${post.id}`
          })
      }
      },[post]);
  return (
    <DefaultLayout>
          <SEO title={post.title}
          description={post.description}
          imgUrl='thumbnail.png' />
      <PostDetail 
        post={post}
        parentPage="Epsinfo"
        shareUrl={`/Epsinfo/${post.page}`}
        recentpost={recentpost}
        imgLink="eps"
        />
    </DefaultLayout>
  );
}
