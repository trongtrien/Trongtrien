/* eslint-disable @next/next/no-img-element */
import React from 'react';
import DisplayAds from '../components/ads/DisplayAds';


export default function ModalPopup({url, id, title, slot}) {

  return (
    <>
{/* <!-- Modal --> */}
<div className="modal fade show" style={{display: 'block'}} id={id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" role="dialog">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">{title.toUpperCase()}</h5>
        <span className="btn-close btn bg-tranparent" data-bs-dismiss="modal" aria-label="Close"></span>
      </div>
      <div className="modal-body">
        <DisplayAds slot={slot}/>
        <div className='me-auto'>
                      <p>Mời bạn tải về tại đây nhé ! - Click below to download</p>
                      <a href={url} style={{textDecorationLine: 'none'}} target="_blank" download rel="noreferrer">
                        <img style={{width: "35px"}} src='/media/img/mui_ten_r.png' alt='' />
                        Download now
                      </a>
                    </div>
      </div>
    </div>
  </div>
</div>
    </>
  );
}