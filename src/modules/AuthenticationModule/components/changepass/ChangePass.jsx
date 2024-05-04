// @ts-ignore
import logo from "../../../../assets/image/logo.png";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../../ContextApi/ContextApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";
export default function ChangePass({logout}) {
  const [passwordVisibilit, setPasswordVisibilit] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      let response = await axios.put(
        // "https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword"
        `${baseUrl}/Users/ChangePassword`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      logout();
      toast.success("Password updated successfully", response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-12">
            <div className="text-center">
              <img src={logo} alt="logo" className="w-100" />
            </div>

            <div className="form-content">
              <h3>Change Your Password</h3>
              <p className="text-muted">Enter Your details below</p>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Old Password */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type={passwordVisibilit ? "text" : "password"}
                    className="form-control"
                    placeholder="old Password"
                    {...register("oldPassword", {
                      required: "Enter Your old Password ",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        message:
                          "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long",
                      },
                    })}
                  />
                  <span
                    className="input-group-text border-0 p-3 eye"
                    id="addon-wrapping"
                  >
                    <i
                      id="showpass"
                      className="fa fa-eye"
                      onClick={() => {
                        setPasswordVisibilit(!passwordVisibilit);
                      }}
                    ></i>
                  </span>
                </div>

                {errors.oldPassword && (
                  <p className="alert alert-danger">
                    {errors.oldPassword.message}
                  </p>
                )}

                {/*New Password */}
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type={passwordVisibilit ? "text" : "password"}
                    className="form-control"
                    placeholder="Enter New Password"
                    {...register("newPassword", {
                      required: "New Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        message:
                          "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long",
                      },
                    })}
                  />
                  <span
                    className="input-group-text border-0 p-3 eye"
                    id="addon-wrapping"
                  >
                    <i
                      id="showpass"
                      className="fa fa-eye"
                      onClick={() => {
                        setPasswordVisibilit(!passwordVisibilit);
                      }}
                    ></i>
                  </span>
                </div>

                {errors.newPassword && (
                  <p className="alert alert-danger">
                    {errors.newPassword.message}
                  </p>
                )}
                {/* Confirem New Password */}

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type={confirmPasswordVisibility ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm New Password"
                    {...register("confirmNewPassword", {
                      required: "Confirm New Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        message:
                          "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long",
                      },
                      validate: (value) =>
                        // @ts-ignore
                        value === newPassword || `Doesn't match password`,
                    })}
                  />

                  <span
                    className="input-group-text border-0 p-3 eye"
                    id="addon-wrapping"
                  >
                    <i
                      id="showpass"
                      className="fa fa-eye"
                      onClick={() => {
                        setConfirmPasswordVisibility(
                          !confirmPasswordVisibility
                        );
                      }}
                    ></i>
                  </span>
                </div>

                {errors.confirmNewPassword && (
                  <p className="alert alert-danger">
                    {errors.confirmNewPassword.message}
                  </p>
                )}
                <button
                  className="btn w-100"
                  style={{
                    backgroundColor: "#009247",
                    color: "#fff",
                    fontWeight: "500",
                  }}
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
