import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import PaypalButton from '../components/PaypalBtn'
import useMediaQuery from '../utils/isMobile'

const Donate = () => {
  const [labelAcb, setlabelAcb] = React.useState('Copy')
  const [labelMb, setlabelMb] = React.useState('Copy')
  const payMessage = 'Gui chut yeu thuong'
  const isMobile = useMediaQuery("991")


  const unsecuredCopyToClipboard = (text) => {
     const textArea = document.createElement("textarea"); 
     textArea.value=text; 
     document.body.appendChild(textArea); 
     textArea.select(); 
     try{
        document.execCommand('copy')
    }catch(err){
    }
    document.body.removeChild(textArea)
}

const copyToClipboard = (id) => {
    var copyText = document.getElementById(id);
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
  if (window.isSecureContext && navigator.clipboard) {
    navigator.clipboard.writeText(copyText.value);
  } else {
    unsecuredCopyToClipboard(copyText.value);
  }

  if(id=="acb"){
    setlabelAcb("Copied")
    setTimeout(() => setlabelAcb("Copy"),5000)
    } else if(id=="MBBank") {
    setlabelMb("Copied")
    setTimeout(() => setlabelMb("Copy"),5000)
    }
}
  return (
    <DefaultLayout>
        <div className='pt-5 pb-5 bg-secondary'>
            <div className="row d-flex justify-content-center m-auto text-light" style={{maxWidth: "991px"}}>
                <div className="col-md-8">
                    <h4 className='mb-0 pb-3'>Donate - Ủng hộ tác giả</h4>
                    <div className='bg-secondary bg-opacity-25 border border-warning rounded p-2'>
                        <p className='p-0 m-0 text-logo-y pt-2 pb-2'>Nếu bạn thấy kiến thức thực sự bổ ích thì có thể ủng hộ mình một chầu nước mía ha!!!. Mình rất sẵn lòng đón nhận ạ 😍😍😍</p>
                        <b><i>Bạn có thể ủng hộ mình bằng các hình thức sau:</i></b>
                        <div className='p-2'>
                            <h5 className='text-info'><i className="fa fa-hand-o-right" aria-hidden="true"></i> Mua hàng ủng hộ</h5>
                            <div className='text-center p-5'>
                                <img style={{ transform: "rotate(-90deg)"}} width={50} height={50} className='rounded me-5' src='/media/img/arrow.gif' />
                                <img width={100} className='rounded' src='/media/img/shop.jpg' />
                            </div>
                            <h5 className='text-info'><i className="fa fa-hand-o-right" aria-hidden="true"></i> Chuyển khản ngân hàng</h5>
                            <div>
                                <div className='border p-0 ps-1 pt-1 pb-1 rounded'>
                                    <h6>Ngân hàng: ACB - chi nhánh Hà nam</h6>
                                    <h6>Chủ tài khoản: NGUYỄN TRỌNG TRIỂN</h6>
                                    <h6>Số tài khoản: </h6>
                                    <div className='mb-2'>
                                        <input style={{width: "65%", fontSize: `${isMobile?"0.9rem":"1.2rem"}`}} className='btn btn-main-y text-light bg-dark bg-opacity-50' type="text" value="252730579" id="acb" readOnly/>
                                        <button className='btn text-info ' onClick={() => copyToClipboard("acb")}>
                                            <i className="fa fa-hand-o-left" aria-hidden="true"></i> {labelAcb}</button>
                                    </div>
                                    <h6 className='mt-3 p-3'>Nội dung chuyển: {payMessage}</h6>
                                </div>
                                <hr />
                                <div className='border p-0 ps-1 pt-1 pb-1 rounded'>
                                    <h6>Ngân hàng: ViettelPay(MBBank)</h6>
                                    <h6>Chủ tài khoản: NGUYỄN TRỌNG TRIỂN</h6>
                                    <h6>Số tài khoản:</h6>
                                    <div className='mb-2'>
                                    <input style={{width: "65%", fontSize: `${isMobile?"0.9rem":"1.2rem"}`}} className='btn btn-main-y text-light bg-dark bg-opacity-50' type="text" value="9704229206016298107" id="MBBank" readOnly/>
                                        <button className='btn text-info' onClick={() => copyToClipboard("MBBank")}>
                                            <i className="fa fa-hand-o-left" aria-hidden="true"></i> {labelMb}</button>
                                    </div>
                                    <div>
                                        <h6 className='text-logo-y'>Hoặc quét mã QR</h6>
                                        <div className='text-center'>
                                            <img style={{width: "200px"}} src='/media/img/social/viettel.jpg' alt='viettelpay' />
                                        </div>
                                    </div>
                                    <h6 className='mt-3 p-3'>Nội dung chuyển: {payMessage}</h6>
                                </div>
                                <hr />
                            </div>
                            <h5 className='text-info'><i className="fa fa-hand-o-right" aria-hidden="true"></i> Paypal</h5>
                            <div>
                                <PaypalButton />
                            </div>
                            <hr />
                            <h5 className='text-info'><i className="fa fa-hand-o-right" aria-hidden="true"></i> Zalo pay</h5>
                            <div className='border p-3 rounded'>
                                <div className='text-center'><img style={{width: "200px"}} src='/media/img/social/zalo.jpg' alt='zalopay' /></div>
                                    <h6 className='mt-3'>Nội dung chuyển: {payMessage}</h6>
                                </div>
                        </div>

                    </div>
                </div>
            </div>
      </div>
    </DefaultLayout>
  )
}

export default Donate