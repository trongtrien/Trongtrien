/* eslint-disable @next/next/no-img-element */
import React from 'react'
import DefaultLayout from '../../components/DefaultLayout'
import Axios from '../../components/apiRequest/Axios'
import { EpsCard } from '../../utils/Card'
import Link from 'next/link'

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
                        <p className='mt-2 mb-2 text-dl' style={{fontSize: "30px"}}>***** 💼 💼 💼 *****</p>
                        <em>
                            <strong>
                            Hù bạn chút thôi chông gai nào nếu cố gắng đều sẽ vượt qua ...! 
                            </strong>
                        </em>
                    </h3>
                <div className='col-9 m-auto'>
                    <p className='text-dl pt-0'>
                        Khi các bạn đọc đến những dòng này thì mình tin là các bạn đã có những mục tiêu
                        cho bản thân, và có những kế hoạch cụ thể cho việc học tiếng Hàn rồi phải không ạ.
                        Còn với mình cũng sẽ cố gắng thật nhiều để mang đến cho các bạn những kiến thức bài giảng với hết khả năng của mình.
                        Và cốt lõi nhất là kiến thức nên mình cố gắng xây dựng giao diện đơn gian nhất có thể (thật ra là một phần do còn gà về lập trình ạ).
                        Trình bày sao cho các bạn dễ đọc, dễ hiểu nhất, với tất cả tâm huyết mong muốn để mang đến cho các bạn có những khóa học chất lượng,
                        đầy đủ kiến thức, cũng như thông tin về chương trình này. Bạn có thể tìm hiểu kỹ hơn trong 
                        <Linkbài viết này ạ.
                        Và với tất cả những điều đó rất mong là các bạn chăm học để đạt kết quả như mong muốn.
                        Sẽ chẳng thể một lần mà hoàn thiện được ngay nên trong quá trình học có chỗ nào lỗi cả về giao diện cả về nội dung thì các bạn hãy phản hồi về cho mình nhé.
                        Còn về việc học online sao cho hiệu quả thì trên internet cũng có hàng trăm nghìn bài viết chia sẻ về điều đó và trong một bài viết
                        mình cũng có nói qua về điều đó, và bản thân cũng là một người học tập rất nhiều thứ từ internet
                        ví như chuyện viết nên trang web này cũng hoàn toàn là học trên mạng cả nên các bạn các quyết tâm nha 💪💪💪💪💪</p>
                </div>
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