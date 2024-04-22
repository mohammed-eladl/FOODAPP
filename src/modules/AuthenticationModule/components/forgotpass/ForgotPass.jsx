import axios from "axios";
// @ts-ignore
import logo from "../../../../assets/image/logo-form.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Forgotpass() {
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data
      );
      let result = response.data.token;
      console.log(result);
      toast.success("Your request is being processed, please check your email");
      navigate("/resetpass");
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
                <h3>Forgot Your Password?</h3>
                <p className="text-muted">
                  No worries! Please enter your email and we will send a
                  password reset link
                </p>
                {/* E-mail */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-login1">
                      <i className="fa fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your E-mail"
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
