import Link from 'next/link'
import React from 'react'
import DefaultLayout from '../components/DefaultLayout.js'

const Privacy = () => {
  return (
  <DefaultLayout>
        <div className='bg-dl'>
      <div className='container pt-5 pb-5 text-dl'>
      <div style={{maxWidth: "900px", margin: "auto"}}>
        <h3 className='mt-3'>Điều khoản sử dụng và bảo mật</h3>
        <p>Để việc sử dụng trang web được thuận tiện và đảm bảo thông tin cho người dùng chúng tôi có một số chính
        sách được liệt kê dưới đây</p>
        <h4>1. Sử dụng nội dung</h4>
        <p>Chúng tôi viết nên Website này với mục đích chia sẻ kiến thức hoàn toàn miễn phí dựa trên kiến thức, kinh nghiệm, tài chính cá nhân không qua bất kỳ tổ chức nào. 
          Nếu có những yêu cầu về thanh toán lấy danh nghĩa chúng tôi xin vui lòng không thực hiện
          và thông báo kịp thời cho chúng tôi để chúng tôi có thể xử lý.
          Nếu có sự ủng hộ cá nhân với tác giả vui lòng chỉ liên hệ qua những thông tin được cung cấp công khai trên website này.
        </p>
        <p>
        Chúng tôi cũng không đặt bất cứ giới hạn (không gian, thời gian, địa lý, cơ sở hạ tầng) nào về những dịch vụ được triển khai trên website của mình,
        đồng thời cũng không chịu trách nhiệm về việc dịch vụ bị gián đoạn ngoài ý muốn.
        </p>
        <p>
          Khi sử dụng trang web nếu có bất cứ thắc mắc gì có thể liên hệ cho chúng tôi, không được sử dụng từ ngữ thô tục, không có tính xây dựng. Chúng tôi sẽ không đáp
          ứng những yêu cầu vượt ra khỏi khả năng và vi phạm pháp luật.
        </p>
        <p>
          Những thông tin và kiến thức chúng tôi thể hiện trên trang web này không phải do chúng tôi trực tiếp nghiên cứu, biên soạn ra. Qua qúa trình học tập, trải 
          nghiệm đã tích lũy và chia sẻ lại cho các bạn. Tuy nhiên ngoài mục <Link href='/Epsinfo'><a>THÔNG TIN EPS</a></Link>, khi muốn dẫn lại nội dung từ website này bạn phải 
          thông báo cho chúng tôi, khi chúng tôi xác định bạn sử dụng với mục đích phi thương mại thì các bạn có thể sử dụng kèm theo một số điều kiện tại thời điểm đó.
          Và bạn hoàn toàn phải chịu trách nhiệm kiểm duyệt nội dung đăng tải lại
        </p>
        <h4>2. Trách nhiệm</h4>
        <i>❈ Về chúng tôi</i>
        <p>
          Chúng tôi sẽ chịu hoàn toàn trách nhiệm khi có những thông tin được cung cấp sai lệch, phát ngôn lời nói gây kích động, phản cảm, không đúng với thuần phong
          mỹ tục, pháp luật Việt Nam và Hàn Quốc.
        </p>
        <i>❈ Về phía người dùng</i>
        <p>
          Chúng tôi không phải đội ngũ lập trình chuyên nghiệp nên nhiều vấn đề bảo mật còn hạn chế rất mong các bạn có chuyên môn nương tay, không mày mò hack phá website
          để mọi người có một nơi để học tập hiệu quả.
        </p>
        <p>
          Chúng tôi luôn lắng nghe mọi ý kiến đóng góp để hoàn thiện nội dung tốt hơn, nhưng không đồng nghĩa người dùng tự ý bóc phốt, bêu riếu khi chưa có sự phản hồi về cho chúng tôi.
        </p>
        <h4>2. Bảo mật</h4>
        <p>
          Chúng tôi không sử dụng những thông tin khi người dùng gửi cho chúng tôi ngoài mục đích cải thiện dịch vụ và liên hệ giải đáp thắc mắc. Tuy nhiên để đảm bảo an toàn người dùng
          không được điền những thông tin nhạy cảm hay mật khẩu khi có nghi ngờ. Khi điền thông tin liên hệ hay đăng nhập vào hệ thông (nếu có) phải kiểm tra đường dẫn cho đúng,
          mọi đường dẫn trên trang web này phải được bắt đầu bằng (vie-ko.com) hoặc (eps.vie-ko.com) để tránh rò rỉ thông tin ngoài ý muốn.
        </p>
        <h4 className='text-end'><i>Chân thành cảm ơn!</i></h4>
      </div>
    </div>
    </div>
  </DefaultLayout>
  )
}

export default Privacy