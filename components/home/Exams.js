import React from 'react'
import Link from 'next/link'
const Exams = () => {
  return (
    <div className="row m-0 bg-secondary rounded">
            <div className="row container m-auto ">
              <div className="col-lg-5 col-xl-5 text-center pt-5 pb-5">
                <img src="/media/img/Bank.png" alt="" style={{maxWidth: "200px"}} />
                <Link href="epstopik" passHref>
                    <h3 style={{cursor: "pointer"}} className="fs-2 p-0 mt-5 text-light">See more <img width="30" src="/media/img/arrow.gif" alt="" style={{transform: "rotate(-90deg)"}} /></h3>
                </Link>
              </div>
              <div className="col-lg-7 col-xl-7 text-center pt-5 pb-5">
                <div className="row">
                    {Array.from(Array(4).keys()).map((key => 
                    <div className="col-3 m-0 p-1" key={key}>
                      <Link href={`epstopik/exam/${key+1}`}><a>
                        <button style={{minWidth: "80px"}} className="btn btn-exam fs-5 ps-4 pe-4">{key+1}</button>
                      </a></Link>
                    </div>))}
                </div>
              </div>
            </div>
          </div>
  )
}

export default Exams