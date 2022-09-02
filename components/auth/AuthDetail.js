/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link';
import Router from 'next/router';
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Axios from '../../components/apiRequest/Axios'

const AuthDetail = () => {
    const cookies = new Cookies();
    const token = cookies.get('TOKEN')
    const [decoded, setDecoded] = React.useState([])
    const [myCourse, setmyCourse] = React.useState([])
    const [findUserId, setfindUserId] = React.useState([])
    React.useEffect(() => {
        if(token){
        setDecoded(jwt_decode(token))
      }
      },[token])// eslint-disable-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        if(decoded) {
            Axios({method: "GET", url:"/progress"}).then(rep => setfindUserId(rep.data.filter(d => d.userId == decoded.userId)))
            Axios({method: "GET", url:"/courseviews"}).then(rep => setmyCourse(rep.data))
        }
    },[decoded])

    const [authDetail, setAuthDetail] = React.useState([])
    React.useEffect(() => {
        if(myCourse.length&&findUserId.length) {
            setAuthDetail(findUserId.map((item) => {
                const x = myCourse.find(d => d.id == item.course_id)
                return x
              }))
        }
    },[myCourse,findUserId])
  return (
    <>
        <div className="dropdown ms-lg-0 mt-1">
            <button  className="btn avatar avatar-sm p-0"
                href="#"
                id="profileDropdown"
                role="button"
                data-bs-auto-close="outside"
                data-bs-display="static"
                data-bs-toggle="dropdown" aria-expanded="false">
                <img width={36} className="avatar-img rounded-circle mt-0" src={`/media/img/avatars/${decoded?decoded.sex:"user"}.png`} alt="avatar" />
            </button>
            <ul className="dropdown-menu dropdown-menu-custom dropdown-menu-end shadow pt-3 mt-2" aria-labelledby="profileDropdown">
                <li>
                    <div className="d-flex align-items-center px-2">
                        <div className="avatar me-3">
                            <img width={50} className="avatar-img rounded-circle shadow" src={`/media/img/avatars/${decoded?decoded.sex:"user"}.png`} alt="avatar" />
                        </div>
                        <h5>
                            {decoded&&decoded.name}
                        </h5>
                    </div>
                    <hr className="dropdown-divider" />
                </li>
                <li><span className='px-2 text-secondary'>Hạng thành viên: </span><span>{decoded&&decoded.role}</span></li>
                <li><Link href="/Course"><a className='px-2 btn text-secondary'>Ghi danh khóa học</a></Link></li>
                {/* Khóa học của tôi */}
                <li>
                    <div className="dropdown">
                        <button className="btn dropdown-toggle nav-link text-secondary p-0 ps-2" id="dropdownMyCourse" data-bs-toggle="dropdown" aria-expanded="false">
                            Khóa học của tôi
                        </button>
                        <ul className="dropdown-menu m-0 p-0 pt-2" style={{minWidth: "17.9rem"}} aria-labelledby="dropdownMyCourse">
                            {authDetail.length>0?(authDetail.map((d,i) => 
                            <li key={i} className="ps-2 pe-2 pb-2">
                                <Link href={d.link}><a className="btn border btn-main-y" style={{width: "100%"}}>{d.title}</a></Link>
                            </li>)):(<>
                                <li className="ps-2 pe-2 pb-2"><a className="btn border btn-main-y" style={{width: "100%"}}>Chưa có khóa học nào</a></li>
                                <li className="ps-2 pe-2 pb-2">
                                    <Link href="/Course">
                                        <a className="btn border btn-main-y" style={{width: "100%"}}>Đăng ký ngay <i className="fa fa-angle-double-right" aria-hidden="true"></i></a>
                                    </Link>
                                </li>
                            </>)}
                        </ul>
                    </div>
                </li>
                {/*  */}
                <li><hr className="dropdown-divider" /></li>
                <li>
                    <div className="modeswitch-wrap d-flex" id="darkModeSwitch">
                        <button className='btn border ms-2'
                                onClick={() => {
                                    cookies.remove("TOKEN", {path: "/"})
                                    Router.reload()
                                }}
                                >Logout &nbsp;&nbsp;
                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                        </button>
                    </div>
                </li> 
            </ul>
        </div>
    </>
  )
}

export default AuthDetail