import Link from 'next/link'
import React from 'react'

const RecentPost = ({title, link, date, view}) => {
  return (
        <div className='p-2'>
            <Link href={link} passHref><a><h6 className="mt-0 text-dl">{title}</h6></a></Link>
            <span className='me-2 text-secondary'><i className="fa fa-calendar" aria-hidden="true"></i></span>
            <span className='me-2 text-secondary'>{date}</span>|
            <span className='me-2 ms-2 text-secondary'>{view} <i className="fa fa-eye text-logo-b" aria-hidden="true"></i></span>
        </div>
  )
}

export default RecentPost