/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from 'react'
import Link from 'next/link';
import MenuTwoTone from '@mui/icons-material/MenuTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import Auth from '../auth/Auth';
import useMediaQuery from '../../utils/isMobile'
import Breadcrumbs from './Breadcrumbs'

const CourseHeader = ({
  chapterLabel,
  lesonLabel,
  link,
  setShowMenu,
  showMenu
}) => {
  const isMobile = useMediaQuery('1200')

  return (
    <header className="border-bottom  border-warning nav-bg-dl">
      <nav style={{display: 'block'}} className={`navbar nav-bg-dl p-0`}>
        <div className="d-flex">
          {/* logo */}
          <div className='pt-1 pb-1 ps-3'>
            <Link className="navbar-brand" href="/" passHref>
              <a><img width={35} src='/media/img/logo.png' alt='logo' /></a>
            </Link>
          </div>
          <div className='mt-2 ms-3 p-1'><Breadcrumbs chapterLabel={chapterLabel} lesonLabel={lesonLabel} link={link}/></div>
          {/* usersetting and ThemeSwitcher */}
          <div style={{height: "45px"}} className={`pe-2 p-0 pb-1 ms-auto`}>
            <div>
                         {/* button showhide menu */}
               {isMobile&&<div className='menu-btn'>{!showMenu?
                              <button className='btn border-0' onClick={() => setShowMenu(!showMenu)}><MenuTwoTone style={{fontSize: "35px", color: "#517ca4"}}/></button>:
                              <button className='btn border-0' onClick={() => setShowMenu(!showMenu)}><CloseIcon style={{fontSize: "35px", color: "#ff8c00"}}/></button>}
                          </div>}
                          <div className={`${isMobile?"me-5":""}`}><Auth /></div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default CourseHeader