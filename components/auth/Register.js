import React, { useState } from "react";
import Axios from "../../components/apiRequest/Axios";

export default function Register() {
  // initial state
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [sex, setsex] = useState("male");
  const [password, setPassword] = useState("");
  const [password_repeat, setPassword_repeat] = useState("");
  const [register, setRegister] = useState(false);
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // set configurations
    const configuration = {
      method: "post",
      url: "/sign-up",
      data: {
        name,
        username,
        email,
        sex,
        password,
        password_repeat
      },
    };

    // make the API call
    Axios(configuration)
      .then((result) => {
        setRegister(true);
        setMessage(result.data.msg);
      })
      .catch(function (error) {
        if (error.response) {
          setMessage(error.response.data.msg);
        }
      });
  };

  return (
    <>
      <div className="container justify-content-center">
        <div className="row d-flex justify-content-center">
          <form className="d-flex flex-column col-md-6" onSubmit={(e) => handleSubmit(e)}>
            <h2>Register</h2>

            {/* Name */}
            <label htmlFor="name" className="mt-3">
              Name:
              <input
                name="name"
                id="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                required
                />
            </label>

            {/* Giới tính */}
            <label htmlFor="sex" className="mt-3">
              Giới tính:
              <select
                name="sex"
                id="sex"
                type="text"
                className="form-control"
                value={sex}
                onChange={(e) => setsex(e.target.value)}
              >
                <option>male</option>
                <option>female</option>
              </select>
            </label>


            {/* username */}
            <label htmlFor="username" className="mt-3">
              Username:
              <input
                name="username"
                id="username"
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Không bao gồm ký tự đặc biết và dấu cách"
                required
                />
            </label>

            {/* email */}
            <label htmlFor="email" className="mt-3">
              Email:
              <input
                name="email"
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
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
                placeholder="Password"
                required
                />
            </label>
            <label htmlFor="password_repeat" className="mt-3">
              Password Confirm:
              <input
                name="password_repeat"
                id="password_repeat"
                type="password"
                className="form-control"
                value={password_repeat}
                onChange={(e) => setPassword_repeat(e.target.value)}
                placeholder="Nhập lại Password"
                required
                />
            </label>

            {/* submit button */}
            <button className="mt-3 btn bg-success text-light"
                type="submit"
              >
                Register
              </button>

            {/* display success message */}
            {register ? (
              <p className="text-success mt-2">{message}</p>
            ) : (
              <p className="text-danger mt-2">{message}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}