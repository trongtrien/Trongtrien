/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { AboutCard } from '../../utils/Card'

const About = () => {
  return (<>
    <section className='bg-dl'>
        <div className="container mt80">
            <div className="row pt-5 pb-5">
        		<div className="col-xl-6 pt-3 pb-3">
        			<div className="about_thumb">
        				<img style={{width: "100%"}} className="rounded-3" src="/media/img/educate.jpg" alt="" />
        			</div>
        		</div>
        		<div className="col-xl-6 pt-3 pb-3 text-dl">
        			<div className="about_content">
        				<h3>Tâm sự chút nhé <em>...!!!</em></h3>
        				<p className='text-dl'>Với xuất phát điểm là một người mày mò tự học và tìm kiếm thông tin về chương trình eps, và đã thành công.
                  Tuy nhiên phải tìm kiếm cóp nhặt mỗi nơi một chút rất vất vả, đôi lúc phân vân không biết đâu là trọng tâm, cũng 
                  không có người đi trước để chỉ dẫn những thủ tục giấy tờ.
                  </p>
                  <p className='text-dl'>
                    Chính vì lẽ đó mình đã lên ý tưởng làm website này để chia sẻ lại những kiến thức cũng như kinh nghiệm
                    có được khi theo đuổi chương trình này. Cũng thấy khá nhiều trang web về tiếng Hàn với nội dung phong phú
                    và những tác giả đó có kiến thức rất rộng. Nhưng như tiếu đề của trang web là dành riêng cho chương trình Eps
                    nên kiến thức sẽ tập trung hơn, cũng như mọi thông tin liên quan về chương trình này mình cũng cố gắng thu thập tìm tòi
                    chia sẻ lại cho các bạn ...
                  </p>
        			</div>
        		</div>
        	</div>
        </div>
        <div className="container pb-5">
        <h2 className='text-secondary fw-bold'>Bạn có gì ở đây</h2>
        	<div className="row mb-5 about">
                <AboutCard
                     title="Bài giảng tâm huyết"
                     imgUrl="/media/img/course.png"
                     link="/Course"
                />
                <AboutCard
                     title="Tài liệu đầy đủ"
                     imgUrl="/media/img/books.png"
                     link="/Download"
                />
                <AboutCard
                     title="Chia sẻ tận tình"
                     imgUrl="/media/img/signpost.png"
                     link="/Blog"
                />
                <AboutCard
                     title="Ôn tập & thi thử"
                     imgUrl="/media/img/learning.png"
                     link="/Study"
                />
            </div>
        </div>
    </section>
  </>)
}

export default About