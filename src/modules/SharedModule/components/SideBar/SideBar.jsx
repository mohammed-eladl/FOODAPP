import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
// @ts-ignore
import togger from "../../../../assets/image/3.png";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ChangePass from "../../../AuthenticationModule/components/changepass/ChangePass";

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/*  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <ChangePass logout={logout}/>
        </Modal.Body>
      </Modal>

      <div className="sidebar-container">
        <Sidebar collapsed={isCollapsed}>
          <Menu>
            <MenuItem
              onClick={toggleCollapse}
              icon={<img className="" src={togger} alt="" />}
            ></MenuItem>
            <br />

            <MenuItem
              icon={<i className="fa fa-home" aria-hidden="true"></i>}
              component={<Link to="/dashboard" />}
            >
              Home
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-users" aria-hidden="true"></i>}
              component={<Link to="/dashboard/users" />}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<i className="fa fa-receipt" aria-hidden="true"></i>}
              component={<Link to="/dashboard/recipes" />}
            >
              Recipes
            </MenuItem>

            <MenuItem
              icon={<i className="fa fa-layer-group" aria-hidden="true"></i>}
              component={<Link to="/dashboard/categories" />}
            >
              Categories
            </MenuItem>
            <MenuItem
              onClick={handleShow}
              icon={<i className="fa fa-key" aria-hidden="true"></i>}
            >
              Change Password
            </MenuItem>
            <MenuItem
              onClick={logout}
              icon={
                <i className="fa fa-right-from-bracket" aria-hidden="true"></i>
              }
            >
              {" "}
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>

        {/* <button onClick={logout} className="btn btn-danger">
         Logout
       </button> */}
      </div>
    </>
  );
}
