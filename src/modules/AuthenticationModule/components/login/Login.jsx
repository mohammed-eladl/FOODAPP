import axios from "axios";
// @ts-ignore
import logo from "../../../../assets/image/logo-form.svg";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../../ContextApi/ContextApi";
export default function Login({ saveLoginData }) {
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        // "https://upskilling-egypt.com:3006/api/v1/Users/Login"
        `${baseUrl}/Users/Login`,
        data
      );
      localStorage.setItem("token", response.data.token);
      saveLoginData();
      // TODO: toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="auth-container">
        <div className="container-fluid vh-100 bg-overly">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-6 bg-white p-4 border border-3">
              <div className="text-center">
                <img src={logo} alt="logo" className="w-50" />
              </div>
              <div className="form-content">
                <h3>Login In</h3>
                <p className="text-muted">
                  Welcome Back! Please enter your details
                </p>
                {/* E-mail */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-login1">
                      <i className="fa fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Your E-mail"
                      {...register("email", {
                        required: "E-mail is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="alert alert-danger">{errors.email.message}</p>
                  )}
                  {/* Password */}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-login1">
                      <i className="fa fa-key"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                   
                  </div>

                  {errors.password && (
                    <p className="alert alert-danger">
                      {errors.password.message}
                    </p>
                  )}
                  <div className="links d-flex justify-content-between my-3">
                    <a>Register Now?</a>
                    <Link to={"/forgotPass"} className="frg-pass">
                      Forgot Password?
                    </Link>
                  </div>
                  <button className="btn login-btn w-100">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
