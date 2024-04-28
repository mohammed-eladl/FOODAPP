import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// @ts-ignore
import togger from "../../../../assets/image/3.png";
import { useState } from "react";
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

  return (
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
          <MenuItem>Change Password</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </Sidebar>

      {/* <button onClick={logout} className="btn btn-danger">
        Logout
      </button> */}
    </div>
  );
}
