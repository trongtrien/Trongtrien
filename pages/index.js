/* eslint-disable @next/next/no-img-element */
import React from "react";
import Axios from '../components/apiRequest/Axios'
import SEO from "../components/seo";
import DefaultLayout from "../components/DefaultLayout";
import Banner from "../components/home/Banner";
import About from '../components/home/About'
import Eps from '../components/home/Eps'

export async function getServerSideProps () {
  try {
    const r = await Axios({method: "GET", url: "/courseviews"})
    const data = await r.data;
    if(!data) return {props: { 
      err: true
    }}
    return {
     props: { 
      data: await r.data.filter(d => d.id<18).sort((a,b) => a.id - b.id).slice(0,4)
    }
    }
  } catch (error) {
    return {props: { 
      err: true
    }}
  }

}

export default function Home({data}) {
  return (
    <DefaultLayout>
      <SEO title="Vieko-Eps • Tiếng Hàn xklđ"
              description='Vieko-Nỗ lực là tương lai - Thành công chỉ đến khi ta cùng nhau cố gắng! 화이팅'
              imgUrl='thumbnail.png' />
      <Banner />
      <About />
      <Eps data={data} err="Error"/>
    </DefaultLayout>
  );
}
