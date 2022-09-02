import React from 'react'
import Link from 'next/link'

const QuizTamplate = ({
    data,
    note,
    link,
    linkend,
    SeemoreLink,
    imgUrl,
    imgWidth,
    linkLabel
}) => {
  return (
    <div className='row'>
        <ul className='list-unstyled m-0'>
            {data.map(d =>
                <li className='p-1' key={d.title}>
                    <span className='btn bg-primary bg-opacity-25 rounded' style={{width: "100%", textAlign: "left"}}>
                        <b>{d.id}. </b>{d.title}. ({note}) <Link href={`${link}${d.id}${linkend}`}>
                                                                <a className='ps-5' style={{display: "flex", float: "right"}}>{linkLabel}
                                                                <img className='ms-2' width={imgWidth} src={`/media/img/${imgUrl}`} alt='' />
                                                                </a>
                                                            </Link>
                    </span>
                </li>
            )}
            <Link href={`${SeemoreLink}`} passHref><button className='p-1 btn fs-4 fst-italic'>See more ...</button></Link>
        </ul>
    </div>
  )
}

export default QuizTamplate