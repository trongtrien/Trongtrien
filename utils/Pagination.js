import React from 'react'
import Link from "next/link";
import Router from 'next/router';


const Pagination = ({disabled, page, parentPage}) => {
  return (
    <nav className='bg-dl p-0 m-0'>
        <ul className="pagination bg-dl">
            <li className={`page-item bg-dl ${(disabled >=6 || page<=1)&&'disabled'}`}>
                <button
                    className="page-link bg-dl text-dl"
                    onClick={() => Router.push(`${parentPage}/?page=${page - 1}`)}
                    disabled={(disabled >=6 || page<=1)}
                >
                    PREV
                </button>
            </li>
            <li className={`page-item ${page === 1&&'active'}`}>
                <Link href={`${parentPage}/?page=1`}><a className="page-link bg-dl text-dl" >1</a></Link>
            </li>
            <li className={`page-item ${disabled < 6&&'disabled'} ${page === 2&&'active'}`} aria-current="page">
                <Link href={`${parentPage}/?page=2`}><a className="page-link bg-dl text-dl">2</a></Link>
            </li>
            <li className={`page-item ${disabled < 6&&'disabled'}`}>
                <button
                    className="page-link bg-dl text-dl"
                    onClick={() => Router.push(`${parentPage}/?page=${page + 1}`)}
                    disabled={disabled < 6}
                >Next</button>
            </li>
        </ul>
  </nav>
  )
}

export default Pagination