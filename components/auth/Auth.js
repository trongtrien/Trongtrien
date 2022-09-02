/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useState} from 'react';
import Cookies from "universal-cookie";
import Login from './Login';
import Register from './Register';
import AuthDetail from './AuthDetail';

const Auth = () => {
    const [token, settoken] = useState(null);
    const cookies = new Cookies();
    const [login, setLogin] = useState(true);
    const [showForm, setshowForm] = useState(false);

    useEffect(() => {
      settoken(cookies.get('TOKEN'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // loginStatus
    function loginStatus() {
        setLogin(!login);
      }
    // showForm Login & Register
      function showFormHandle() {
        setshowForm(!showForm);
      }

  return (
            <div className="ms-auto pe-2">
              <div>{!token?<>
                <p className={`text-primary btn ms-auto m-0 fs-6 pt-2`} onClick={showFormHandle}>
                <i className="fa fa-sign-in" aria-hidden="true"></i> Login</p>
                {showForm&&<div className="form-login bg-light bg-opacity-90 pt-4 d-fixed">
                    {login?<Login />:<Register />}
                    <div className="container justify-content-center mb-5">
                      <div className='row d-flex justify-content-center'>
                        <div className='d-flex flex-column col-md-6'>
                          <div className="d-flex align-middle">
                            {login?<>
                              <p>Bạn chưa có tài khoản?</p>
                              <p className="text-primary btn ms-3 p-0" onClick={loginStatus}>Đăng ký</p>
                              <p className="text-danger btn ms-auto p-0" onClick={() => {
                                showFormHandle()
                                setLogin(true)
                              }}>Close</p>
                            </>:<>
                              <p>Bạn đã có tài khoản?</p>
                              <p className="text-primary btn ms-3 p-0" onClick={loginStatus}>Đăng nhập</p>
                              <p className="text-danger btn ms-auto p-0 pe-2" onClick={() => {
                                showFormHandle()
                                setLogin(true)
                              }}>Close</p>
                            </>}
                          </div>
                        </div>
                      </div>
                    </div>
                </div>}
                </>:<AuthDetail />}
              </div>
            </div>
  )
}

export default Auth