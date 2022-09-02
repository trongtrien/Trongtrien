/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/role-supports-aria-props */
import React from 'react'
import Link from 'next/link';
import MenuTwoTone from '@mui/icons-material/MenuTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import ThemeSwitcher from './Switcher';
import menu_data from './header.data'
import styles from "./header.module.css";
import Auth from '../auth/Auth';
import useMediaQuery from '../../utils/isMobile';


const Header = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const isMobile = useMediaQuery("991")
  function ShowHide() {
    setShowMenu(!showMenu);
  }
  return (
    <header className="navbar-light navbar-sticky header-static border-bottom  border-warning nav-bg-dl">
      <nav className={`navbar navbar-expand-lg navbar-light nav-bg-dl p-0 ${styles.navbar}`}>
        <div className="container-fluid">
          {/* logo */}
          <div className='pt-1 pb-1'>
            <Link className="navbar-brand" href="/" passHref>
              <a><img width={80} src='/media/img/logowithtext.png' alt='logo' /></a>
            </Link>
          </div>
          {/* menu */}
          <div className={`collapse navbar-collapse ${styles.navbar__menu}`} id="navbarSupportedContent">
            <ul className="navbar-nav mb-lg-0">
              {/* Home */}
              <li className="nav-item">
                <Link href={menu_data.home.path}><a className="nav-link active text-main-b-dl fw500" aria-current="page">{menu_data.home.label}</a></Link>
              </li>
              {/* Dropdown HỌC TẬP */}
              <li className="nav-item dropdown">
                <Link href={menu_data.study.main.path}>
                <a className="nav-link dropdown-toggle text-main-b-dl fw500" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {menu_data.study.main.label}
                </a>
                </Link>
                <ul className="dropdown-menu mt-1 p-0" aria-labelledby="navbarDropdown">
                  {menu_data.study.sub.map((item, index) =>
                  <li key={index}><Link href={item.path}><a className="dropdown-item" >{item.label}</a></Link></li>)}
                </ul>
              </li>
              {/* THÔNG TIN EPS */}
              <li className="nav-item dropdown">
                <Link href={menu_data.epsinfo.main.path}>
                  <a className="nav-link dropdown-toggle text-main-b-dl fw500" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {menu_data.epsinfo.main.label}
                  </a>
                </Link>
                <ul className="dropdown-menu mt-1 p-0" aria-labelledby="navbarDropdown">
                  {menu_data.epsinfo.sub.map((item, index) =>
                  <li key={index}><Link href={item.path}><a className="dropdown-item" >{item.label}</a></Link></li>)}
                </ul>
              </li>
              <li className="nav-item">
                <Link href={menu_data.blog.path}><a className="nav-link text-main-b-dl fw500">{menu_data.blog.label}</a></Link>
              </li>
              <li className="nav-item">
                <Link href={menu_data.donate.path}><a className="nav-link fw500 text-danger">{menu_data.donate.label}</a></Link>
              </li>
              <li className="nav-item">
                <Link href={menu_data.contact.path}><a className="nav-link text-main-b-dl fw500">{menu_data.contact.label}</a></Link>
              </li>
              <div style={{paddingBottom: "13px"}} className={`${!isMobile&&"ms-4"}`}><ThemeSwitcher /></div>
            </ul>
          </div>

          {/* usersetting and ThemeSwitcher */}
          <div style={{height: "45px"}} className={`d-flex pe-2 p-0 pb-1 align-middle ${styles.navbar__user}`}>
            <div suppressHydrationWarning={true}>
              <Auth />
            </div>
            <div className="navbar-toggler btn border-0 p-1 pe-2 m-0" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              {!showMenu?
                  <span className='text-main-b-dl' onClick={ShowHide}><MenuTwoTone style={{fontSize: "35px"}}/></span>:
                  <span className='text-main-b-dl' onClick={ShowHide}><CloseIcon style={{fontSize: "35px", color: "#ff8c00"}}/></span>}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header