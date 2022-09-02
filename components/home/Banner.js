/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
const Banner = () => {
  return (
    <div id="banner">
        <ul className="cb-slideshow">
            <li><span></span></li>
            <li><span></span></li>
            <li><span></span></li>
        </ul>
        <div className='mt-5 text-light banner'>
            <h1>WELCOME TO VIE-KO</h1>
            <img src='/media/img/wellcome.png' alt=''/>
            <div className='mt-5'><a href="/Study" className="link-box rounded-pill">Let's Go</a></div>
        </div>
    </div>
  )
}

export default Banner