import React, { useState,useEffect } from "react"
import Axios from "../../components/apiRequest/Axios"
import Cookies from "universal-cookie"
const cookies = new Cookies();

export default function Login() {
  // initial state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [message, setMessage] = useState();
  const [disabled, setDisabled] = useState(false);


  const [countErr, setcountErr] = useState(0);
  const [err, setErr] = useState(false);

  const [seconds, setSeconds] = useState(null)
    // countDown
    useEffect(() => {
          if (seconds > 0) {
            setTimeout(() => setSeconds(prev => prev - 1), 1000)
            setMessage(`Bạn nhập sai mật khẩu nhiều lần nên tạm thời đã bị khóa đăng nhập,
          bạn đợi sau ${seconds} sau hệ thống sẽ trả lại quyền đăng nhập cho bạn`)
          } else if(seconds===0){
            setMessage("")
            localStorage.setItem('items', JSON.stringify(0))
            setcountErr(0)
            setItems([])
          }
        },[seconds])
        
        // get localStorage var
    const [items, setItems] = useState([]);
    useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
      if (items) {
       setItems(items);
      }
     },[items])

    //  
    useEffect(() => {
        if (items>=4||countErr>4) {
          setDisabled(true);
          setSeconds(30)
        } else {
          setDisabled(false);
        }
       },[items,countErr])

  function ChangeHandle() {
      if(err){
        setcountErr(prev => prev + 1)
        setTimeout(() => {
          localStorage.setItem('items', JSON.stringify(countErr))
          setErr(false)
        }, 100)
      }
  }
  

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // set configurations
    const configuration = {
      method: "post",
      url: "/login",
      data: {
        username,
        password,
      },
    };

    // make the API call
    Axios(configuration)
      .then((result) => {
        // set the cookie
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });
        // redirect user to the auth page
        setMessage(result.data.msg)
        setLogin(true);
        setTimeout(() => window.location.reload(), 1000)
      })
      .catch((error) => {
        if(error) {
          setMessage(error.response.data.msg)
          setErr(error.response.data.countErr)
        }
      });
      ChangeHandle()
  };

  return (
    <>
    <div className="container justify-content-center">
      <div className="row d-flex justify-content-center">
        <form className="d-flex flex-column col-md-6" onSubmit={(e) => handleSubmit(e)}>
              <h2>Login</h2>
              {/* username */}
              <label htmlFor="Username" className="mt-3">
                    Username:
                    <input
                      name="username"
                      id="Username"
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      />
                  </label>
              {/* password */}
              <label htmlFor="password" className="mt-3">
                    Password:
                    <input
                      name="password"
                      id="password"
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      />
                  </label>
              {/* submit button */}
          <button className="mt-3 btn bg-success text-light"
            type="submit"
            disabled={disabled}
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </button>

          {/* display success message */}
          {login ? (
            <p className="text-success mt-2">{message}</p>
          ) : (
            <p className="text-danger mt-2">{message}</p>
          )}
        </form>
    </div></div></>
  );
}
