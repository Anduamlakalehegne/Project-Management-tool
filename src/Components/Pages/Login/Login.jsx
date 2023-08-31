import styles from "./login.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useForm } from 'react-hook-form';

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setdata] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    login();
  };

  const navigate = useNavigate();

  const login = async () => {

    if (!username || !password) {
      Swal.fire({
        icon: 'error',
        title: "Please Fill All Information",
        confirmButtonColor: 'red',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok!',
        showCloseButton: true,
        showClass: {
          popup: 'animate__animated animate__shakeX'
        },
      })
    }
    else {
      const repo = axios.post("http://localhost:3006/api/employee/login", {
        username,
        password,
      })
        .then((response) => {

          if (response.data.error) {
            Swal.fire({
              icon: "error",
              text: response.data.error,
              showCancelButton: true,
              confirmButtonColor: '#00cc44',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok!',
              showCloseButton: true,
              showClass: {
                popup: 'animate__animated animate__shakeX'
              },
            })
          }
          else {
            const MySwal = withReactContent(Swal);
            MySwal.fire({
              html: (
                <span>
                  <p> <span style={{ fontSize: '19px', marginRight: '5px' }}> Successfully Loged</span> </p>
                </span>
              ),
              icon: 'success',
              denyButtonText: "Close",
              allowOutsideClick: false,
              showCloseButton: true,
            })
            window.location.href = "/dashboard";
            localStorage.setItem("user2", JSON.stringify(response, data["user"]));
          }
        })
    }
  }

  return (
    <>
      {/*-------------- Login page Form ---------------*/}

      <div className={styles.body}>

        <div className={styles.signin}>
          <div className={styles.right_login}>
            <form className={styles.signup_right} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.signForm}>
                <p style={{ fontSize: '32px', textAlign: 'center', padding: '30px', marginBottom: '10px' }}>LOGIN</p>
                <label>User Name</label>
                <input
                  type='text'
                  name='username'
                  value={username}
                  {...register("username", { required: true })}
                  placeholder='Enter Username'
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
                {username <= 0 && errors.username?.type === "required" && <span><p style={{ color: 'red' }}>Please enter Username</p></span>}

                <label>Password</label>
                <input
                  type='text'
                  name='password'
                  value={password}
                  {...register("password", { required: true })}
                  placeholder='Enter password'
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                {password <= 0 && errors.password?.type === "required" && <span><p style={{ color: 'red' }}>Please enter password</p></span>}
                <p>Forget Password?</p>
                <button type="submit">Sign In</button>
              </div>
            </form>
          </div>
        </div >

      </div>

    </>
  );
}

export default Login;
