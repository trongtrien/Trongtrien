import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import DefaultLayout from "../components/DefaultLayout";

const ContactUs = () => {
  const form = useRef();
  const [message, setMessage] = useState('')

  const sendEmail = (e) => {
    e.preventDefault();
    // serviceID: string, templateID: string, form: string | HTMLFormElement, publicKey
    emailjs.sendForm('service_y9ia8nd', 'template_3iz5qnm', form.current, 'drEmL9JG_FYfIX-VM')
      .then((result) => {
        setMessage('Cảm ơn bạn đã liện lạc. Chúng tôi sẽ phản hồi sơm nhất có thể');
      }, (error) => {
        setMessage(error.text);
      });
  };

  return (
     <DefaultLayout>
            <div className='bg-dl pt-5 pb-5'>
        <div className="row d-flex justify-content-center m-auto bg-dl text-dl" style={{maxWidth: "800px"}}>
              <div className="col-md-8">
                  <h4 className='mb-0 pb-1'>Contact</h4>
                  <h6 className='p-0 m-0'>{message&&message}</h6>
                <form className="d-flex flex-column" ref={form} onSubmit={sendEmail}>
                  <label htmlFor="name" className='mt-4'>
                    Name:
                    <input name="name" id="name" type="text" className="form-control" placeholder='Enter Your Name' required />
                  </label>
                  <label htmlFor="email" className='mt-4'>
                    Email:
                    <input name="email" id="email" type="email" className="form-control" placeholder='Email' required />
                  </label>
                  <label htmlFor="tieude" className='mt-4'>
                    Tiêu đề:
                    <input name="tieude" id="tieude" type="text" className="form-control" placeholder='Subject' required />
                  </label>
                  <label htmlFor="message" className='mt-4'>
                    Nội dung:
                    <textarea name="message" id="message" type="text" className="form-control" placeholder='Message' rows={3}></textarea>
                  </label>
                  <div className='d-flex'>
                      <button className="btn btn-primary mt-5 me-auto pe-3 ps-3" type='submit'>Submit</button>
                      <button className="btn btn-primary mt-5 pe-3 ps-3" type='reset'>Reset</button>
                  </div>
                </form>
              </div>
        </div>
      </div>
     </DefaultLayout>
  );
}

export default ContactUs