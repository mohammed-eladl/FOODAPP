import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import Navbar from "../Navbar/Navbar";

export default function MasterLayout({ loginData }) {
  return (
    <>
   
        <div className="d-flex">
        
            <div>
              <SideBar />
            </div>
   

      
            <div className="w-100">
              <Navbar loginData={loginData} />
         
              <Outlet />
            </div>
     
        </div>
 
    </>
  );
}
