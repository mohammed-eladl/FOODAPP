import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
export default function MasterLayout({loginData}) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div>
              <SideBar />
            </div>
          </div>

          <div className="col-md-9">
            <div>
              <Navbar loginData={loginData}/>
              <Header />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
