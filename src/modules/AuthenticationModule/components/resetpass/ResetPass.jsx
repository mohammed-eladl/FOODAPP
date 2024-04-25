import axios from "axios";
// @ts-ignore
import logo from "../../../../assets/image/logo-form.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { baseUrl } from "../../../ContextApi/ContextApi";
export default function Resetpass() {
  const [passwordVisibilit, setPasswordVisibilit] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        // "https://upskilling-egypt.com:3006/api/v1/Users/Reset"
        `${baseUrl}/Users/Reset`,
        data
      );
      toast.success("Password updated successfully");
      navigate("/login");
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
                <img src={logo} alt="logo" className="w-25" />
              </div>
              <div className="form-content">
                <h3>Reset Password</h3>
                <p className="text-muted">
                  Please Enter Your Otp or Check Your Inbox
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
                      placeholder="E-mail"
                      {...register("email", {
                        required: "E-mail is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email is not valid",
                        },
                      })}
                    />
                  </div>

                  {errors.email && (
                    <p className="alert alert-danger">{errors.email.message}</p>
                  )}

                  {/* OTP */}

                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="OTP"
                      {...register("otp", {
                        required: "OTP is required",
                        pattern: {
                          value: /^[a-zA-Z0-9]{4}$/,
                          message: "OTP not valid",
                        },
                      })}
                    />
                  </div>
                  {errors.otp && (
                    <p className="alert alert-danger">{errors.otp.message}</p>
                  )}

                  {/* Password */}
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type={passwordVisibilit ? "text" : "password"}
                      className="form-control"
                      placeholder="New Password"
                      {...register("password", {
                        required: "New Password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                          message:
                            "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long",
                        },
                      })}
                    />
                    <span className="input-group-text border-0 p-3 eye" id="addon-wrapping">
                      <i id="showpass" className="fa fa-eye" onClick={() => { setPasswordVisibilit(!passwordVisibilit) }}></i>
                      </span>
                  </div>
                     
                  {errors.password && (
                    <p className="alert alert-danger">
                      {errors.password.message}
                    </p>
                  )}
                  {/* Confirem Password */}

                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type={confirmPasswordVisibility ? "text" : "password"}
                      className="form-control"
                      placeholder="Confirm New Password"
                      {...register("confirmPassword", {
                        required: "Confirm New Password is required",
                        validate: (value) =>
                          // @ts-ignore
                          value === password || `Doesn't match password`,
                      })}
                      
                    />
                     
                     <span className="input-group-text border-0 p-3 eye" id="addon-wrapping">
                      <i id="showpass" className="fa fa-eye" onClick={() => { setConfirmPasswordVisibility(!confirmPasswordVisibility) }}></i>
                      </span>
                  </div>
                 
                  {errors.confirmPassword && (
                    <p className="alert alert-danger">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  <button className="btn login-btn w-100">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
