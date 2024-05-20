// @ts-ignore
import logo4o4 from "../../../../assets/image/not-found-bg.png";
// @ts-ignore
import logo from "../../../../assets/image/logo.png";

export default function NotFound() {
  return (
    <>
      <div className="logo">
        <img src={logo} alt="logo" className="px-5 py-4" />
      </div>


    

      <div className="vw-100 container-fluid">
        <div className="row align-items-center">
          <div className="col-md-5 ps-5">
            <h1>Oops.</h1>
            <h2 className="text-success">Page not found</h2>
            <h2>...</h2>
            <p>This Page doesn’t exist or was removed!</p>
            <p>We suggest you back to home.</p>
            <a className="btn btn-success px-2 py-3 w-50" href="/dashboard">
              <div>
                <i className="fa fa-arrow-left "></i>
                <span className="bg-transparent fw-bold ">
                  Back To Home
                </span>
              </div>
            </a>
          </div>

          <div className="col-md-7">
            <img style={{ width: "100%" }} className=" " src={logo4o4} />
          </div>
        </div>
      </div>
    </>
  );
}
