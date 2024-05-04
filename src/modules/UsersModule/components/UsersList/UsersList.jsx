import Header from "../../../SharedModule/components/Header/Header";
// @ts-ignore
import recipesImg from "../../../../assets/image/header.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Modal from "react-bootstrap/Modal";
import { baseUrl } from "../../../ContextApi/ContextApi";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// @ts-ignore
import noData from "../../../../assets/image/no-data.png";
export default function UsersList() {
 

  // ***********pagination***************
  const [arryOfPages, setArryOfPages] = useState([]);
  
  const [usersList, setUsersList] = useState([]);
  const [userId, setUserId] = useState();


  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = (id) => {
    setUserId(id);
    setDeleteShow(true);
  };

 

  // ***********filtration****************
  const [searchByName, setSearchByName] = useState("");
  const [searchByEmail, setSearchByEmail] = useState("");
  const [SearchCountry, setSearchCountry] = useState("");
  //****************get all user************************
  const getUsersList = async (pageNo, userName, email, country) => {
    try {
      let response = await axios.get(
        // "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        `${baseUrl}/Users/`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            pageSize: 25,
            pageNumber: pageNo,
            userName: userName,
            email: email,
            country: country,
          },
        }
      );
      setArryOfPages(
        Array(response?.data?.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setUsersList(response?.data?.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  // users Value
  const getSearchNameValue = (eo) => {
    setSearchByName(eo.target.value);
    getUsersList(1, eo.target.value, searchByEmail, SearchCountry);
  };
  const getSearchEmailValue = (eo) => {
    setSearchByEmail(eo.target.value);
    getUsersList(1, searchByName, eo.target.value, SearchCountry);
  };

  const getSearchCountryValue = (input) => {
    setSearchCountry(input.target.value);
    getUsersList(1, searchByName, searchByEmail, input.target.value);
  };

  //****************delete user ***************************
  const onDeleteUser = async () => {
    try {
      let response = await axios.delete(
        // "https://upskilling-egypt.com:3006/api/v1/Category/id",
        `${baseUrl}/Users/${userId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      handleDeleteClose();
      getUsersList();
      toast.success(response?.data?.message || "user deleted successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      getUsersList();
    }, 500);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <>
      <Header
        title={`User List`}
        describeion={`This is a welcoming screen for the entry of the application , you
            can now see the options`}
        imgUrl={recipesImg}
      />

      {/* For Delete Users */}
      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <h3>Delete this User ?</h3>
        </Modal.Header>
        <Modal.Body>
          <DeleteData deleteItem={"User"} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-danger fw-bold" onClick={onDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* display  */}
      <div className="container-fluid p-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h4>Users Table Details</h4>
            <p>You can check all details</p>
          </div>
          {/* <div className="col-md-6 d-flex justify-content-end p-0 ">
            <button
              onClick={() => {
                handleShow();
              }}
              style={{
                backgroundColor: "#009247",
                color: "#fff",
                fontWeight: "500",
              }}
              className="btn"
            >
              Add New Category
            </button>
          </div> */}
        </div>

        <div className="filtration-group my-3">
          <div className="row">
            <div className="col-md-6">
              {/* search name input */}
              <InputGroup>
                <InputGroup.Text>
                  <i className="fa-regular fa-user"></i>
                </InputGroup.Text>
                <Form.Control
                  onChange={getSearchNameValue}
                  placeholder="Search by name ..."
                  type="text"
                />
              </InputGroup>
            </div>
            <div className="col-md-3">
                {/* filter by email */}
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fa fa-envelope"></i>
                  </InputGroup.Text>
                  <Form.Control
                    onChange={getSearchEmailValue}
                    placeholder="Search by email ..."
                    type="email"
                  />
                </InputGroup>
              </div>
              <div className="col-md-3">
                {/* filter by Cuntery */}
                <InputGroup>
                  <InputGroup.Text>
                    <i className="fa fa-flag"></i>
                  </InputGroup.Text>
                  <Form.Control
                    onChange={getSearchCountryValue}
                    placeholder="Search by Country ..."
                    type="text"
                  />
                </InputGroup>
              </div>
          </div>
        </div>

        <div className="table-container text-center mx-4">
          {usersList.length > 0 ? (
            <>
              <table className="table text-center">
                <thead className="table">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {usersList.map((user, index) => (
                    <tr key={user?.id} className="table-light">
                      <th scope="row">{index + 1}</th>
                      <td>{user?.userName}</td>

                      <td>
                        <div className="image-container">
                          {user?.imagePath ? (
                            <img
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                            }}
                              src={
                                `https://upskilling-egypt.com/` +
                                user?.imagePath
                              }
                            />
                          ) : (
                            <img  style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                            }} src={noData} />
                          )}
                        </div>
                      </td>

                      <td>{user?.phoneNumber}</td>
                      <td>{user?.email}</td>
                      <td>
                        <i
                          onClick={() => handleDeleteShow(user.id)}
                          className="fa fa-trash  text-danger"
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

         
               <nav aria-label="Page navigation example ">
                 <ul className="pagination">
                   <li className="page-item ">
                     <a className="page-link" href="#" aria-label="Previous">
                       <span aria-hidden="true">«</span>
                     </a>
                   </li>
                   {arryOfPages.map((pageNum) => (
                     <li
                       key={pageNum}
                       className="page-item"
                       onClick={() => {
                         getUsersList(
                           pageNum,
                           searchByName,
                           searchByEmail,
                           SearchCountry
                         );
                       }}
                     >
                       <a className="page-link">{pageNum}</a>
                     </li>
                   ))}
              
                   <li className="page-item">
                     <a className="page-link" aria-label="Next">
                       <span aria-hidden="true">»</span>
                     </a>
                   </li>
                 </ul>
               </nav>
             </>
         
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </>
  );
}
