import React, { useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
const SendResuit = ({
    score,
    name,
    examId,
    setShowScore,
    email
}) => {
  console.log(email)
  const [show, setShow] = React.useState(false)
  const form = useRef()
  const sendEmail = (e) => {
    e.preventDefault();
    // serviceID: string, templateID: string, form: string | HTMLFormElement, publicKey
    if(email!=undefined) emailjs.sendForm('service_y9ia8nd', 'template_dsnh7ls', form.current, 'drEmL9JG_FYfIX-VM')
  };

  return (
     <>
                <form className="d-flex flex-column" id="myForm" ref={form} onSubmit={sendEmail}>
                    <label>
                        <input hidden name="name" type="text" className="form-control" value={name}  readOnly />
                    </label>
                    <label>
                        <input hidden name="score" type="text" className="form-control" value={score}  readOnly />
                    </label>
                    <label>
                        <input hidden name="examId" type="text" className="form-control" value={examId} readOnly />
                    </label>
                    <label>
                        <input hidden name="email" type="email" className="form-control" value={email} readOnly />
                    </label>
                    {!show&&
                    <>
                    <h5 className='text-center pt-3 pb-2 text-dl'>Chúc mừng bạn đã hoàn thành bài thi nhấn nút bên dưới để</h5>
                    <h5 className='text-center text-dl pb-2'>Click to show result</h5>
                    <div className='text-center'>
                      <button className='btn btn-exam fs-4 p-2 ms-auto' type='submit' onClick={()=> {
                      setTimeout(() => {
                        setShowScore(true)
                        setShow(true)
                      },1000)
                      }}>Xem kết quả</button>
                    </div>
                    </>}
                </form>
     </>
  );
}

export default SendResuit