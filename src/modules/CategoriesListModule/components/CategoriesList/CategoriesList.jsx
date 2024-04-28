// @ts-nocheck
import Header from "../../../SharedModule/components/Header/Header";
// @ts-ignore
import categoriesImg from "../../../../assets/image/header.png";
import { useEffect, useState } from "react";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../../ContextApi/ContextApi";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import Button from "react-bootstrap/Button";
export default function CategoriesList() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [categorisList, setCategorisList] = useState([]);
  const [currentName, setCurrentName] = useState("");

  const [show, setShow] = useState(false);
  const [catId, setCatId] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = (id) => {
    setCatId(id);
    setDeleteShow(true);
  };

  const [updateShow, setUpdateShow] = useState(false);
  const handleUpdateClose = () => setUpdateShow(false);
  const handleUpdateShow = (id) => {
    setCatId(id);
    setUpdateShow(true);
  };

  // Get the list of categories
  const getCategorisList = async () => {
    try {
      let response = await axios.get(
        // "https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        `${baseUrl}/Category/?pageSize=10&pageNumber=1`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCategorisList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //  Add the new Category
  const onSubmit = async (data) => {
    try {
      let response = await axios.post(`${baseUrl}/Category`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      handleClose();
      getCategorisList();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategorisList();
  }, []);

  //  Update Category
  const onSubmitUpdate = async (data) => {
    try {
      let response = await axios.put(`${baseUrl}/Category/${catId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      handleUpdateClose();
      getCategorisList();
      console.log(response);
    } catch (error) {
      console.log(error || "Something went wrong");
    }
  };

  // Delete the specified category
  const onDeleteSubmit = async () => {
    try {
      let response = await axios.delete(
        // "https://upskilling-egypt.com:3006/api/v1/Category/id",
        `${baseUrl}/Category/${catId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      handleDeleteClose();
      getCategorisList();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header
        title={`Categories Item`}
        describeion={`You can now add your items that any user can order it from the Application and you can edit`}
        imgUrl={categoriesImg}
      />

      {/* for Add New Category */}
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <h3>Add Category</h3>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category Name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
              </div>
              {errors.name && (
                <p className="alert alert-danger">{errors.name.message}</p>
              )}
              <button
                className="btn w-100"
                style={{
                  backgroundColor: "#009247",
                  color: "#fff",
                  fontWeight: "500",
                }}
              >
                Save
              </button>
            </form>
          </Modal.Body>
        </Modal>

        {/*  for update Category */}

        <Modal show={updateShow} onHide={handleUpdateClose}>
          <Modal.Header closeButton>
            <Modal.Title> Update Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmitUpdate)}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category Name"
                  onChange={(e) => setCurrentName(e.target.value)}
                  value={currentName.value}
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              {errors.name && (
                <p className="alert alert-danger">{errors.name.message}</p>
              )}
              <button className="btn btn-warning w-100 fw-bold ">Update</button>
            </form>
          </Modal.Body>
        </Modal>
      </>
      {/* For Delete Category */}
      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <h3>Delete Category</h3>
        </Modal.Header>
        <Modal.Body>
          <DeleteData deleteItem={"category"} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-danger fw-bold" onClick={onDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* display  */}
      <div className="container-fluid p-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h4>Categories Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div className="col-md-6 d-flex justify-content-end p-0 ">
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
          </div>
        </div>

        <div className="table-container text-center mx-4">
          {categorisList.length > 0 ? (
            <table className="table text-center">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Creation Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categorisList.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.creationDate}</td>
                    <td>
                      <i
                        onClick={() => {
                          handleUpdateShow(item.id);
                          setCurrentName(item.name);
                        }}
                        className="fa fa-edit text-warning mx-2"
                        aria-hidden="true"
                      ></i>

                     
                        <i
                          onClick={() => handleDeleteShow(item.id)}
                          className="fa fa-trash text-danger mx-2"
                          aria-hidden="true"
                        ></i>
                    
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </>
  );
}
